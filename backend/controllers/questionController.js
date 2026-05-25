const pool =
require("../config/db");


// GET QUESTIONS

const getQuestions =
async(req,res)=>{

try{

const result =
await pool.query(

`SELECT *
FROM feedback_questions
ORDER BY id ASC`
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


const addQuestion =
async(req,res)=>{

try{

const {
question
}
=
req.body;


// avoid duplicate

const existing =
await pool.query(

`
SELECT *
FROM feedback_questions
WHERE question=$1
`,

[question]
);

if(
existing.rows.length>0
){

return res
.status(400)
.json({

message:
"Question already exists"
});
}


await pool.query(

`
INSERT INTO feedback_questions
(question,status)

VALUES($1,$2)
`,

[
question,
true
]
);

res.json({

message:
"Question Added Successfully"
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

const deleteQuestion =
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
FROM feedback_questions
WHERE id=$1
`,

[id]
);

res.json({

message:
"Question Deleted Successfully"
});

}catch(error){

console.log(error);

res.status(500)
.json({

message:
"Delete Failed"
});
}
};

module.exports = {

getQuestions,
addQuestion,
deleteQuestion

};
