const pool =
require("../config/db");

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");



// =========================
// REGISTER STUDENT
// =========================

const registerStudent =
async(req,res)=>{

try{

const {

roll_number,
student_name,
email,
mobile,
branch,
student_year,
semester_no,
section,
academic_year,
password

}
=
req.body;


// CHECK EXISTING STUDENT

const existingStudent =
await pool.query(

`
SELECT *

FROM students

WHERE roll_number = $1
OR roll_no = $1
`,

[
roll_number
]
);


if(
existingStudent.rows.length
> 0
){

return res
.status(400)
.json({

message:
"Student already exists"
});
}


// HASH PASSWORD

const salt =
await bcrypt.genSalt(
10
);

const hashedPassword =
await bcrypt.hash(

password,
salt
);


// INSERT STUDENT

await pool.query(

`
INSERT INTO students(

roll_number,
roll_no,

student_name,

email,
mobile,

branch,

year,
student_year,

semester,
semester_no,

section,

academic_year,

password

)

VALUES(

$1,$2,$3,$4,
$5,$6,$7,$8,
$9,$10,$11,
$12,$13
)
`,

[
roll_number,
roll_number,

student_name,

email,
mobile,

branch,

student_year,
student_year,

semester_no,
semester_no,

section,

academic_year,

hashedPassword
]
);


res.json({

message:
"Student Registered Successfully"
});

}catch(error){

console.log(
"Registration Error:",
error
);

res.status(500)
.json({

message:
"Server Error"
});
}
};

// =========================
// LOGIN STUDENT
// =========================

const loginStudent =
async(req,res)=>{

try{

console.log(
"Incoming Login Body:",
req.body
);

const {

roll_number,
password

}
=
req.body;


// FIND STUDENT

const result =
await pool.query(

`
SELECT *

FROM students

WHERE roll_number = $1
`,

[
roll_number
]
);

console.log(
"DB Result:",
result.rows
);


if(
result.rows.length===0
){

return res
.status(404)
.json({

message:
"Student not found"
});
}


const student =
result.rows[0];


// PASSWORD CHECK

const isMatch =
await bcrypt.compare(

password,
student.password
);


if(!isMatch){

return res
.status(400)
.json({

message:
"Invalid Password"
});
}


// TOKEN

const token =
jwt.sign(

{
id:
student.id
},

process.env.JWT_SECRET,

{
expiresIn:
"7d"
}
);


res.json({

message:
"Login Success",

token,

student
});

}catch(error){

console.log(
"Login Error:",
error
);

res.status(500)
.json({

message:
"Server Error"
});
}
};

// =========================
// GET FACULTY FOR STUDENT
// =========================

const getStudentFaculty =
async(req,res)=>{

try{

const {

branch,
student_year,
semester,
section

}
=
req.query;


console.log(
"Student Query:",
req.query
);


const result =
await pool.query(

`
SELECT

f.id
AS faculty_id,

s.id
AS subject_id,

f.faculty_name,

s.subject_name

FROM faculty_subject_mapping m

JOIN faculty f
ON m.faculty_id = f.id

JOIN subjects s
ON m.subject_id = s.id

WHERE

m.branch = $1
AND CAST(m.year AS TEXT) = $2
AND CAST(m.semester AS TEXT) = $3
AND m.section = $4
`,

[
branch,
student_year,
semester,
section
]
);

console.log(
"Faculty Result:",
result.rows
);

res.json(
result.rows
);

}catch(error){

console.log(error);

res.status(500).json({

message:
"Failed to load faculty"
});
}
};

const resetPassword =
async(req,res)=>{

try{

const {
username
}
=
req.body;


// Check student exists

const student =
await pool.query(

`
SELECT *
FROM students
WHERE roll_number=$1
`,
[username]
);


if(
student.rows.length===0
){

return res
.status(404)
.json({

message:
"Student not found"
});
}


// Password = Roll Number

const hashedPassword =
await bcrypt.hash(
username,
10
);


// Update password

await pool.query(

`
UPDATE students
SET password=$1
WHERE roll_number=$2
`,

[
hashedPassword,
username
]
);


res.json({

message:
"Password reset successful. Username and Password are same"

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




// =========================
// EXPORTS
// =========================

module.exports = {

registerStudent,

loginStudent,

getStudentFaculty,

resetPassword

};