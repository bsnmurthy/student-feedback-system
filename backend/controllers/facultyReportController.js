const PDFDocument =
require("pdfkit");

const pool =
require("../config/db");

const path =
require("path");

const fs =
require("fs");


const downloadFacultyReport =
async(req,res)=>{

try{

const {
faculty_id
}
=
req.params;


// FACULTY DATA

const result =
await pool.query(

`
SELECT

f.faculty_name,
s.subject_name,
fb.ratings,

fb.academic_year,
fb.student_year,
fb.semester_no,
fb.section,
fb.branch

FROM feedback fb

JOIN faculty f
ON fb.faculty_id=f.id

JOIN subjects s
ON fb.subject_id=s.id

WHERE fb.faculty_id=$1
`,

[
faculty_id
]
);


if(
result.rows.length===0
){

return res
.status(404)
.json({

message:
"No Data Found"
});
}


// QUESTIONS

const questionData =
await pool.query(

`
SELECT
id,
question
FROM feedback_questions
`
);


const questionMap =
{};

questionData.rows.forEach(
(q)=>{

questionMap[
q.id
]
=
q.question;
}
);


// CALCULATE

const totals =
{};
const counts =
{};


result.rows.forEach(
(row)=>{

let ratings =
row.ratings;

if(
typeof ratings
=== "string"
){

ratings =
JSON.parse(
ratings
);
}


Object.entries(
ratings
)

.forEach(
([q,v])=>{

const score =
Number(v);

if(score>0){

if(
!totals[q]
){

totals[q]=0;
counts[q]=0;
}

totals[q]+=score;
counts[q]+=1;
}
});
}
);


const analysis =

Object.keys(
totals
)

.map(
(q,index)=>({

question_no:
`Q${index+1}`,

question:
questionMap[q]
||
`Question ${index+1}`,

score:
(
totals[q]
/
counts[q]
)
.toFixed(2)
}))
;

const overallAverage =

(
analysis.reduce(
(sum,item)=>

sum +
Number(
item.score
),

0
)

/

analysis.length

)
.toFixed(2);

const strong =

analysis.filter(
q=>
Number(q.score)>=4
);

const weak =

analysis.filter(
q=>
Number(q.score)<4
);


// PDF

const doc =
new PDFDocument({

margin:40,
size:"A4"
});


res.setHeader(
"Content-Type",
"application/pdf"
);

res.setHeader(
"Content-Disposition",
'attachment; filename="Faculty_Report.pdf"'
);

doc.pipe(res);


// LOGO

const logoPath =
path.join(
__dirname,
"../assets/logo.png"
);

if(
fs.existsSync(
logoPath
)
){

doc.image(
logoPath,
40,
30,
{
width:60
}
);
}


// HEADER

doc
.font("Helvetica-Bold")
.fontSize(16)
.text(

"BONAM VENKATA CHALAMAYYA ENGINEERING COLLEGE",

120,
35,

{
align:"center",
width:400
}
);


doc
.fontSize(10)
.text(

"Faculty Individual Feedback Analysis Report",

120,
90,

{
align:"center",
width:400
}
);


doc.moveTo(
40,
120
)
.lineTo(
560,
120
)
.stroke();


// TITLE

doc
.font("Helvetica-Bold")
.fontSize(15)
.text(

"Faculty Performance Report",

0,
140,

{
align:"center"
}
);


// DETAILS

// FACULTY DETAILS

// FACULTY DETAILS

doc
.fontSize(12)
.font("Helvetica-Bold")
.text(
"Faculty Name: ",
50,
170,
{
continued:true
}
)
.font("Helvetica")
.text(
result.rows[0]
.faculty_name
);


doc
.font("Helvetica-Bold")
.text(
"Subject: ",
50,
195,
{
continued:true
}
)
.font("Helvetica")
.text(
result.rows[0]
.subject_name
);


doc
.font("Helvetica-Bold")
.text(
"Academic Year: ",
50,
220,
{
continued:true
}
)
.font("Helvetica")
.text(
result.rows[0]
.academic_year
);


doc
.font("Helvetica-Bold")
.text(
"Branch: ",
250,
220,
{
continued:true
}
)
.font("Helvetica")
.text(
result.rows[0]
.branch
);

doc
.font("Helvetica-Bold")
.text(
"Year: ",
50,
245,
{
continued:true
}
)
.font("Helvetica")
.text(
`${result.rows[0]
.student_year} Year`
);


doc
.font("Helvetica-Bold")
.text(
"Semester: ",
250,
245,
{
continued:true
}
)
.font("Helvetica")
.text(
String(
result.rows[0]
.semester_no
)
);


doc
.font("Helvetica-Bold")
.text(
"Section: ",
430,
245,
{
continued:true
}
)
.font("Helvetica")
.text(
result.rows[0]
.section
);
// TABLE

let y = 290;



// TABLE HEADER

doc.rect(40,y,70,22).stroke();
doc.rect(110,y,290,22).stroke();
doc.rect(400,y,60,22).stroke();

// TABLE HEADER

doc
.font("Helvetica-Bold")
.fontSize(13)
.fillColor("#0B3D91")
.text(
"Question-wise Analysis",
40,
270
);

y = 290;


// HEADER BACKGROUND

doc
.rect(
40,
y,
60,
24
)
.fillAndStroke(
"#0B3D91",
"black"
);

doc
.rect(
100,
y,
360,
24
)
.fillAndStroke(
"#0B3D91",
"black"
);

doc
.rect(
460,
y,
80,
24
)
.fillAndStroke(
"#0B3D91",
"black"
);


// HEADER TEXT

doc
.fillColor("white")
.fontSize(10)
.font("Helvetica-Bold");

doc.text(
"Q.No",
55,
y+7
);

doc.text(
"Question",
250,
y+7,
{
align:"center",
width:80
}
);

doc.text(
"Score",
485,
y+7
);

y += 24;


// TABLE BODY

analysis.forEach(
(item,index)=>{

doc
.fillColor("black");

doc.rect(
40,
y,
60,
20
).stroke();

doc.rect(
100,
y,
360,
20
).stroke();

doc.rect(
460,
y,
80,
20
).stroke();


doc
.font("Helvetica")
.fontSize(9);

doc.text(
index+1,
65,
y+5
);

doc.text(
item.question,
110,
y+5,
{
width:340
}
);

doc.text(
item.score,
490,
y+5
);

y += 20;
});


// OVERALL ROW

doc
.rect(
40,
y,
420,
24
)
.fillAndStroke(
"#D9E2F3",
"black"
);

doc.rect(
460,
y,
80,
24
).stroke();


doc
.fillColor("black")
.font("Helvetica-Bold")
.fontSize(11)
.text(
"Overall Average Score",
180,
y+7
);

doc.text(
overallAverage,
490,
y+7
);

y += 35;
// STRONG AREAS

//
// SECOND PAGE
//

doc.addPage();


// HEADER

doc
.fontSize(16)
.font("Helvetica-Bold")
.text(
"Faculty Strength & Improvement Analysis",
{
align:"center"
}
);

doc.moveDown();


// STRONG AREAS

doc
.fontSize(13)
.font("Helvetica-Bold")
.text(
"Strong Areas"
);

doc.moveDown(0.5);


 y = 120;


// TABLE HEADER

doc.rect(
40,
y,
420,
22
).stroke();

doc.rect(
460,
y,
80,
22
).stroke();

doc
.fontSize(10)
.text(
"Question",
60,
y+6
);

doc.text(
"Score",
485,
y+6
);

y += 22;


// TABLE DATA

strong.forEach(
(item)=>{

doc.rect(
40,
y,
420,
20
).stroke();

doc.rect(
460,
y,
80,
20
).stroke();

doc
.fontSize(9)
.font("Helvetica")
.text(
item.question,
50,
y+5,
{
width:390
}
);

doc.text(
item.score,
488,
y+5
);

y += 20;
});



//
// WEAK AREAS
//

y += 40;

doc
.fontSize(13)
.font("Helvetica-Bold")
.text(
"Areas for Improvement",
40,
y
);

y += 25;


// TABLE HEADER

doc.rect(
40,
y,
420,
22
).stroke();

doc.rect(
460,
y,
80,
22
).stroke();

doc
.fontSize(10)
.text(
"Question",
60,
y+6
);

doc.text(
"Score",
485,
y+6
);

y += 22;


// TABLE DATA

weak.forEach(
(item)=>{

doc.rect(
40,
y,
420,
20
).stroke();

doc.rect(
460,
y,
80,
20
).stroke();

doc
.fontSize(9)
.font("Helvetica")
.text(
item.question,
50,
y+5,
{
width:390
}
);

doc.text(
item.score,
488,
y+5
);

y += 20;
});


// FOOTER

doc
.fontSize(10)
.text(
"Head of Department",
420,
740
);

doc.end();

}catch(error){

console.log(error);

res.status(500)
.json({

message:
"Server Error"
});
}
};


module.exports = {

downloadFacultyReport
};