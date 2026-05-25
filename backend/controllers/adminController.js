const pool =
require("../config/db");

const jwt =
require("jsonwebtoken");


const adminLogin =
async(req,res)=>{

try{

const {

username,
password

}
=
req.body;


const result =
await pool.query(

`
SELECT *
FROM admins
WHERE username=$1
AND password=$2
`,

[
username,
password
]
);


if(
result.rows.length===0
){

return res
.status(401)
.json({

message:
"Invalid Credentials"
});
}


const admin =
result.rows[0];


const token =
jwt.sign(

{
id:
admin.id
},

process.env.JWT_SECRET,

{
expiresIn:
"1d"
}
);


res.json({

message:
"Admin Login Success",

token
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

adminLogin
};