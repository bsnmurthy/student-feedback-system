const pool =
require("../config/db");



// GET SETTINGS

const getSettings =
async(req,res)=>{

try{

const result =
await pool.query(

`
SELECT *
FROM system_settings
LIMIT 1
`
);

res.json(
result.rows[0]
);

}catch(error){

console.log(error);

res.status(500).json({

message:
"Failed to load settings"
});
}
};




// UPDATE SETTINGS

const updateSettings =
async(req,res)=>{

try{

const {

academic_year,
current_year,
current_semester,
feedback_open,
feedback_start,
feedback_end

}
=
req.body;


await pool.query(

`
UPDATE system_settings

SET

academic_year = $1,
current_year = $2,
current_semester = $3,
feedback_open = $4,
feedback_start = $5,
feedback_end = $6

WHERE id = 1
`,

[
academic_year,
current_year,
current_semester,
feedback_open,
feedback_start,
feedback_end
]
);


res.json({

message:
"Settings Updated Successfully"
});

}catch(error){

console.log(error);

res.status(500).json({

message:
"Update Failed"
});
}
};



module.exports = {

getSettings,
updateSettings

};