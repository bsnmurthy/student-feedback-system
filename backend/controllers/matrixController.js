const pool =
require("../config/db");


const getSectionFaculty =
async(req,res)=>{

try{

const {
year,
semester,
section
}
=
req.params;


console.log({

year,
semester,
section
});


const result =
await pool.query(

`
SELECT

fsm.id,

f.id
AS faculty_id,

f.faculty_name,

s.id
AS subject_id,

s.subject_name

FROM
faculty_subject_mapping fsm

JOIN faculty f
ON fsm.faculty_id=f.id

JOIN subjects s
ON fsm.subject_id=s.id

WHERE

CAST(fsm.year AS TEXT)
=
$1

AND

CAST(fsm.semester AS TEXT)
=
$2

AND

fsm.section
=
$3

ORDER BY
f.faculty_name
`,

[
String(year),
String(semester),
section
]
);

console.log(
result.rows
);

res.json(
result.rows
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

module.exports = {
getSectionFaculty
};