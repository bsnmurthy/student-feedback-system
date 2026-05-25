import {
useState
}
from "react";

import {
useNavigate
}
from "react-router-dom";


function CommonLogin() {

const navigate =
useNavigate();


const [

formData,
setFormData

]
=
useState({

role:""

});


const handleChange =
(e)=>{

setFormData({

...formData,

[e.target.name]:
e.target.value

});
};



// NAVIGATE BASED ON ROLE

const handleSubmit =
(e)=>{

e.preventDefault();


// STUDENT LOGIN PAGE

if(
formData.role
===
"student"
){

navigate(
"/student-login"
);

return;
}


// ADMIN LOGIN PAGE

if(
formData.role
===
"admin"
){

navigate(
"/admin-login"
);

return;
}


alert(
"Please Select Role"
);
};



return(

<div
className=
"page-container"
>

<div
className=
"feedback-card"

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

Student Feedback System

</h1>


<form
onSubmit=
{handleSubmit}
>


<div
className=
"mb-3"
>

<label>

Select Role

</label>

<select

name="role"

className=
"form-control"

value=
{formData.role}

onChange=
{handleChange}

required
>

<option value="">

Select Role

</option>

<option value="student">

Student

</option>

<option value="admin">

Admin

</option>

</select>

</div>



<button
type="submit"

className=
"submit-btn w-100"
>

Continue

</button>

</form>

</div>

</div>
);
}

export default CommonLogin;