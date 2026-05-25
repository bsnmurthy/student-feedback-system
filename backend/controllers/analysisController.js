const pool =
require("../config/db");


// FACULTY ANALYSIS

const getFacultyAnalysis =
async(req,res)=>{

try{

const {

academic_year,
semester_no,
student_year,
branch,
section

}
=
req.query;


const result =
await pool.query(

`
SELECT

f.id AS faculty_id,
f.faculty_name,
s.subject_name,
fb.ratings

FROM feedback fb

JOIN faculty f
ON fb.faculty_id=f.id

JOIN subjects s
ON fb.subject_id=s.id

WHERE

($1::text IS NULL
OR fb.academic_year=$1)

AND

($2::int IS NULL
OR fb.semester_no=$2)

AND

($3::int IS NULL
OR fb.student_year=$3)

AND

($4::text IS NULL
OR fb.branch=$4)

AND

($5::text IS NULL
OR fb.section=$5)
`,

[
academic_year || null,
semester_no || null,
student_year || null,
branch || null,
section || null
]
);


const facultyMap =
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


const values =

Object.values(
ratings
)

.map(Number)

.filter(
value=>

!isNaN(value)
&&
value>0
);


if(
values.length===0
)
return;


const avg =

values.reduce(
(a,b)=>a+b,
0
)

/
values.length;


const key =

`${row.faculty_name}
-
${row.subject_name}`;


if(
!facultyMap[key]
){

facultyMap[key]
=
{

faculty_id:
row.faculty_id,

faculty_name:
row.faculty_name,

subject_name:
row.subject_name,

total:0,

count:0
};
}


facultyMap[key]
.total += avg;

facultyMap[key]
.count += 1;

}
);


const facultyResponse =

Object.values(
facultyMap
)

.map(
(item)=>({

faculty_id:
item.faculty_id,
faculty_name:
item.faculty_name,

subject_name:
item.subject_name,

average_score:
(
item.total
/
item.count
)
.toFixed(2),

total_feedback:
item.count
}))
;


res.json(
facultyResponse
);

}catch(error){

console.log(error);

res.status(500)
.json({

message:
"Server Error"
});
}
};



// QUESTION ANALYSIS

const getQuestionAnalysis =
async(req,res)=>{

try{

const {

academic_year,
semester_no,
student_year,
branch,
section

}
=
req.query;


const result =
await pool.query(

`
SELECT ratings
FROM feedback

WHERE

($1::text IS NULL
OR academic_year=$1)

AND

($2::int IS NULL
OR semester_no=$2)

AND

($3::int IS NULL
OR student_year=$3)

AND

($4::text IS NULL
OR branch=$4)

AND

($5::text IS NULL
OR section=$5)
`,

[
academic_year || null,
semester_no || null,
student_year || null,
branch || null,
section || null
]
);


const questionTotals =
{};

const questionCounts =
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
([question,value])=>{

const score =
Number(value);

if(score>0){

if(
!questionTotals[
question
]
){

questionTotals[
question
]
=0;

questionCounts[
question
]
=0;
}


questionTotals[
question
]
+=score;

questionCounts[
question
]
+=1;
}
});
}
);


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


const questionResponse =

Object.keys(
questionTotals
)

.map(
(question)=>({

question:

questionMap[
question
]

||

`Q${question}`,

average_score:
(

questionTotals[
question
]

/

questionCounts[
question
]

)
.toFixed(2)
})
);

res.json(
questionResponse
);

}catch(error){

console.log(error);

res.status(500)
.json({

message:
"Server Error"
});
}
};

const getFacultyDetailReport =
async(req,res)=>{

try{

const {
faculty_id
}
=
req.params;


const result =
await pool.query(

`
SELECT

f.faculty_name,
s.subject_name,
fb.ratings

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


const questionTotals =
{};

const questionCounts =
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
([question,value])=>{

const score =
Number(value);

if(score>0){

if(
!questionTotals[
question
]
){

questionTotals[
question
]
=0;

questionCounts[
question
]
=0;
}


questionTotals[
question
]
+=score;

questionCounts[
question
]
+=1;
}
});
}
);


// QUESTION TEXT

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


const questionAnalysis =

Object.keys(
questionTotals
)

.map(
(question)=>({

question:

questionMap[
question
]

||

`Q${question}`,

average_score:
(

questionTotals[
question
]

/

questionCounts[
question
]

)
.toFixed(2)
})
);


res.json({

faculty_name:
result.rows[0]
.faculty_name,

subject_name:
result.rows[0]
.subject_name,

feedback_count:
result.rows.length,

questionAnalysis
});

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

getFacultyAnalysis,

getQuestionAnalysis,

getFacultyDetailReport
};