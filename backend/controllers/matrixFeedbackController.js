const pool =
require("../config/db");


const submitMatrixFeedback =
async(req,res)=>{

try{

const {

student_id,
feedbacks,
academic_year,
semester_no,
student_year,
section,
branch

}
=
req.body;


// CHECK DUPLICATE

const alreadySubmitted =
await pool.query(

`
SELECT id
FROM feedback
WHERE
student_id=$1
AND academic_year=$2
AND semester_no=$3
LIMIT 1
`,

[
student_id,
academic_year,
semester_no
]
);


if(
alreadySubmitted.rows.length
> 0
){

return res
.status(400)
.json({

message:
"Feedback Already Submitted For This Semester"
});
}


// INSERT FEEDBACK

for(
const item
of feedbacks
){

await pool.query(

`
INSERT INTO feedback
(

student_id,
faculty_id,
subject_id,
ratings,
comments,
academic_year,
semester_no,
student_year,
section,
branch

)

VALUES
(
$1,$2,$3,$4,$5,
$6,$7,$8,$9,$10
)
`,

[
student_id,

item.faculty_id,

item.subject_id,

JSON.stringify(
item.ratings
),

item.comments
|| "",

academic_year,

semester_no,

student_year,

section,

branch
]
);
}


res.json({

message:
"Feedback Submitted Successfully"
});

}catch(error){

console.log(
"Matrix Feedback Error:",
error
);

res.status(500)
.json({

message:
"Server Error"
});
}
};

module.exports = {

submitMatrixFeedback
};