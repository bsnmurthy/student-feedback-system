const pool =
require("../config/db");


const getDashboardStats =
async(req,res)=>{

try{

const students =
await pool.query(

"SELECT COUNT(*) FROM students"
);

const faculty =
await pool.query(

"SELECT COUNT(*) FROM faculty"
);

const subjects =
await pool.query(

"SELECT COUNT(*) FROM subjects"
);

const feedback =
await pool.query(

"SELECT COUNT(*) FROM feedback"
);

res.json({

totalStudents:
students.rows[0].count,

totalFaculty:
faculty.rows[0].count,

totalSubjects:
subjects.rows[0].count,

totalFeedback:
feedback.rows[0].count,
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
getDashboardStats
};