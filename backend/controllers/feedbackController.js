const pool =
require("../config/db");


// SUBMIT FEEDBACK

const submitFeedback =
async(req,res)=>{

try{

const {

student_id,
faculty_id,
subject_id,

q1,
q2,
q3,
q4,
q5,
q6,
q7,
q8,

comments

} = req.body;


// check duplicate

const existing =
await pool.query(

`SELECT * FROM feedback

WHERE student_id=$1
AND subject_id=$2`,

[
student_id,
subject_id
]
);

if(
existing.rows.length > 0
){

return res.status(400)
.json({

message:
"Feedback Already Submitted"
});
}


// insert feedback

await pool.query(

`INSERT INTO feedback
(
student_id,
faculty_id,
subject_id,

q1,
q2,
q3,
q4,
q5,
q6,
q7,
q8,

comments
)

VALUES
(
$1,$2,$3,
$4,$5,$6,$7,
$8,$9,$10,$11,
$12
)`,

[
student_id,
faculty_id,
subject_id,

q1,
q2,
q3,
q4,
q5,
q6,
q7,
q8,

comments
]
);

res.status(201)
.json({

message:
"Feedback Submitted Successfully"
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
submitFeedback
};