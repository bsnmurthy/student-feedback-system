const pool =
require("../config/db");



// GET ALL FACULTY

const getFaculty =
async(req,res)=>{

try{

const result =
await pool.query(

`
SELECT
id,
faculty_name,
designation,
department,
email
FROM faculty
ORDER BY faculty_name
`
);

res.json(
result.rows
);

}catch(error){

console.log(
"Faculty Load Error:",
error
);

res.status(500).json({

message:
"Failed to load faculty"
});
}
};


// ADD FACULTY

const addFaculty =
async(req,res)=>{

try{

const {

faculty_name,
designation,
department,
email

}
=
req.body;


await pool.query(

`
INSERT INTO faculty(

faculty_name,
designation,
department,
email

)

VALUES($1,$2,$3,$4)
`,

[
faculty_name,
designation,
department,
email
]
);

res.json({

message:
"Faculty Added"
});

}catch(error){

console.log(error);

res.status(500).json({

message:
"Failed to add faculty"
});
}
};



// DELETE FACULTY

const deleteFaculty =
async(req,res)=>{

try{

const { id }
=
req.params;


await pool.query(

`
DELETE
FROM faculty
WHERE id=$1
`,

[id]
);

res.json({

message:
"Faculty Deleted"
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

getFaculty,
addFaculty,
deleteFaculty
};