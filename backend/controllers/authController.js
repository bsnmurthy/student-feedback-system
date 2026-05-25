const pool =
require("../config/db");

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");


// COMMON LOGIN

const login =
async(req,res)=>{

try{

const {

role,
username,
password

}
=
req.body;


let userQuery;
let user;
let isMatch =
false;


// ===================
// STUDENT LOGIN
// ===================

if(role==="student"){

userQuery =
await pool.query(

`
SELECT *
FROM students
WHERE roll_number=$1
`,
[username]
);

if(
userQuery.rows.length===0
){

return res
.status(400)
.json({

message:
"Invalid Roll Number"
});
}

user =
userQuery.rows[0];


// Student password = bcrypt

isMatch =
await bcrypt.compare(

password,
user.password
);

}



// ===================
// ADMIN LOGIN
// ===================

else if(role==="admin"){

userQuery =
await pool.query(

`
SELECT *
FROM admin
WHERE username=$1
`,
[username]
);

if(
userQuery.rows.length===0
){

return res
.status(400)
.json({

message:
"Invalid Username"
});
}

user =
userQuery.rows[0];


// Admin password = plain text

isMatch =
password
===
user.password;
}



// INVALID ROLE

else{

return res
.status(400)
.json({

message:
"Invalid Role"
});
}



// PASSWORD CHECK

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

id:user.id,
role:role

},

process.env.JWT_SECRET,

{

expiresIn:
"1d"

}
);



// SUCCESS

res.json({

token,
role,
user

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

login
};