import {
useState
}
from "react";

import {
useNavigate
}
from "react-router-dom";

import API
from "../services/api";


function Login() {

const navigate =
useNavigate();


const [

formData,
setFormData

]
=
useState({

roll_number: "",
password: ""

});


const [

error,
setError

]
=
useState("");


// HANDLE INPUT

const handleChange =
(e) => {

setFormData({

...formData,

[e.target.name]:
e.target.value

});
};


const handleResetPassword =
async()=>{

if(!formData.roll_number){

alert(
"Please enter Roll Number first"
);

return;
}

try{

const response =

await API.post(

"/student/reset-password",

{
username:
formData.roll_number
}
);


alert(
response.data.message
);

}catch(error){

alert(

error.response
?.data?.message
||
"Reset Failed"

);
}
};

// LOGIN

const handleSubmit =
async (e) => {

e.preventDefault();

setError("");

try {

const response =
await API.post(

"/student-auth/login",

formData
);

console.log(
"Login Response:",
response.data
);


// SAVE TOKEN

localStorage.setItem(

"studentToken",

response.data.token
);



// SAVE STUDENT OBJECT

localStorage.setItem(

"student",

JSON.stringify(

response.data.student

)
);

console.log(

"Saved Student:",

response.data.student
);


// SUCCESS

alert(
"Login Successful"
);


// REDIRECT

navigate(
"/feedback"
);

}
catch (error) {

console.log(error);

setError(

error.response
?.data?.message
||
"Login Failed"

);
}
};


return (

<div className="page-container">

<div
className="feedback-card"

style={{
maxWidth:
"450px",

margin:
"50px auto"
}}
>

<h1
className=
"text-center mb-4"
>

Student Login

</h1>


<form
onSubmit=
{handleSubmit}
>

<div className="mb-3">

<label>

Roll Number

</label>

<input
type="text"

name="roll_number"

placeholder=
"Enter Roll Number"

className=
"form-control"

value=
{formData.roll_number}

onChange=
{handleChange}

required
/>

</div>



<div className="mb-3">

<label>

Password

</label>

<input
type="password"

name="password"

className=
"form-control"

value=
{formData.password}

onChange=
{handleChange}

required
/>

</div>



{
error && (

<div
className=
"alert alert-danger"
>

{error}

</div>
)
}



<button
type="submit"

className=
"submit-btn w-100"
>

Login

</button>

<p
style={{
color:"blue",
cursor:"pointer",
textAlign:"center",
marginTop:"10px",
fontWeight:"bold"
}}

onClick={
handleResetPassword
}
>

Forgot Password?
Click Here to Reset

</p>

<p
className=
"text-center mt-3"
>

New Student?

<button
type="button"

className=
"btn btn-link"

onClick={()=>

navigate(
"/student-register"
)
}
>

Register Here

</button>

</p>

</form>

</div>

</div>
);
}

export default Login;