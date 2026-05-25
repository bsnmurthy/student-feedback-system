const pool =
require("../config/db");


// GET MAPPINGS

const getMappings =
async(req,res)=>{

try{

const result =
await pool.query(

`
SELECT

m.id,

f.faculty_name,

s.subject_name,

m.academic_year,
m.student_year,
m.semester_no,
m.branch,
m.section,

m.faculty_id,
m.subject_id

FROM faculty_subject_mapping m

JOIN faculty f
ON m.faculty_id=f.id

JOIN subjects s
ON m.subject_id=s.id

ORDER BY
f.faculty_name
`
);

res.json(
result.rows
);

}catch(error){

console.log(error);

res.status(500).json({

message:
"Failed to load mappings"
});
}
};


// ADD MAPPING

const addMapping = async (req, res) => {
  try {
console.log(
"BODY:",
req.body
);
    const {

faculty_id,
subject_id,
academic_year,
branch,
student_year,
semester_no,
section

}
=
req.body;

    const result = await pool.query(
      `
     INSERT INTO
faculty_subject_mapping(

faculty_id,
subject_id,
academic_year,
branch,
student_year,
semester_no,
section

)

VALUES(

$1,$2,$3,
$4,$5,$6,
$7
)
`,

[
faculty_id,
subject_id,
academic_year,
branch,
student_year,
semester_no,
section
]
);

    // Duplicate check
    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "This faculty is already mapped to the selected subject"
      });
    }

    res.json({
      message: "Mapping Added Successfully"
    });

  } catch (error) {

    console.log("Mapping Error:", error);

    res.status(500).json({
      message: "Server Error"
    });
  }


};





// DELETE

const deleteMapping =
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
FROM faculty_subject_mapping
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

// GET STUDENT FACULTY LIST

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

m.id,

f.id
AS faculty_id,

m.subject_id,

f.faculty_name,

s.subject_name

FROM faculty_subject_mapping m

JOIN faculty f
ON m.faculty_id = f.id

JOIN subjects s
ON m.subject_id = s.id

WHERE

LOWER(m.branch)
=
LOWER($1)

AND

CAST(m.student_year AS TEXT)
=
$2

AND

CAST(m.semester_no AS TEXT)
=
$3

AND

LOWER(m.section)
=
LOWER($4)

ORDER BY
f.faculty_name
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



module.exports = {

getMappings,
addMapping,
deleteMapping,
getStudentFaculty
};