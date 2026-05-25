const pool =
require("../config/db");


// GET SUBJECTS

const getSubjects =
async(req,res)=>{

try{

const result =
await pool.query(

`
SELECT
id,
subject_name,
student_year,
semester_no,
branch
FROM subjects
ORDER BY subject_name
`
);

res.json(
result.rows
);

}catch(error){

console.log(
"Subject Load Error:",
error
);

res.status(500).json({

message:
"Failed to load subjects"
});
}
};
// ADD SUBJECT

const addSubject =
async(req,res)=>{

try{

const {

subject_name,
student_year,
semester_no,
branch

}
=
req.body;


await pool.query(

`
INSERT INTO subjects(

subject_name,
student_year,
semester_no,
branch

)

VALUES($1,$2,$3,$4)
`,

[
subject_name,
student_year,
semester_no,
branch
]
);

res.json({

message:
"Subject Added"
});

}catch(error){

console.log(error);

res.status(500).json({

message:
"Failed to add subject"
});
}
};


// DELETE SUBJECT

const deleteSubject =
async(req,res)=>{

try{

const {
id
}
=
req.params;

await pool.query(

`
DELETE
FROM subjects
WHERE id=$1
`,

[id]
);

res.json({

message:
"Deleted"
});

}catch(error){

console.log(error);

res.status(500).json({

message:
"Delete failed"
});
}
};


module.exports = {

getSubjects,
addSubject,
deleteSubject
};