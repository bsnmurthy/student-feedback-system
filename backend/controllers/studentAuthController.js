const pool =
require("../config/db");


// REGISTER

const registerStudent =
async(req,res)=>{

try{

const {

student_name,
roll_no,
email,
mobile,
password,
academic_year,
student_year,
semester_no,
branch,
section

}
=
req.body;

// CHECK EXISTING

const existing =
await pool.query(

`
SELECT *
FROM students
WHERE roll_number=$1
`,

[
roll_no
]
);

if(
existing.rows.length > 0
){

return res.status(400).json({

message:
"Student already exists"
});
}


// INSERT

await pool.query(

`
INSERT INTO students(

roll_number,
student_name,
email,
mobile,
academic_year,
branch,
year,
semester,
student_year,
section,
password

)

VALUES(

$1,
$2,
$3,
$4,
$5,
$6,
$7,
$8,
$9,
$10,
$11

)
`,

[
roll_no,
student_name,
email,
mobile,
academic_year,
branch,
student_year,
semester_no,
student_year,
section,
password
]
);
res.status(201).json({

message:
"Registration Successful"
});

}catch(error){

console.log(
"Registration Error:",
error
);

res.status(500).json({

message:
error.message
});
}
};


// LOGIN

const loginStudent =
async(req,res)=>{

try{
console.log(
"Received Body:",
req.body
);
const {

roll_no,
password

}
=
req.body;

console.log(
"Login Input:",
roll_no,
password
);


const result =
await pool.query(

`
SELECT *
FROM students
WHERE roll_number = $1
`,

[
roll_no
]
);

console.log(
"DB Result:",
result.rows
);


if(
result.rows.length===0
){

return res.status(400).json({

message:
"Student not found"
});
}


const student =
result.rows[0];


if(
student.password !== password
){

return res.status(400).json({

message:
"Invalid Password"
});
}


res.status(200).json({

message:
"Login Successful",

student
});

}catch(error){

console.log(
"Login Error:",
error
);

res.status(500).json({

message:
"Login Failed"
});
}
};
module.exports = {

registerStudent,
loginStudent
};