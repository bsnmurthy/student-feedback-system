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


function StudentRegister(){

const navigate =
useNavigate();


const [

formData,
setFormData

]
=
useState({

roll_number:"",
student_name:"",
email:"",
mobile:"",
branch:"",
student_year:"",
semester_no:"",
section:"",
academic_year:"",
password:""

});


const handleChange =
(e)=>{

setFormData({

...formData,

[e.target.name]:
e.target.value

});
};


const handleRegister =
async()=>{

try{

await API.post(

"/student-auth/register",

formData
);

alert(
"Registration Successful"
);

navigate(
"/student-login"
);

}catch(error){

console.log(error);

alert(

error.response?.data
?.message

||

"Registration Failed"
);
}
};


return(

<div className="container mt-5">

<div
className=
"card p-5 shadow mx-auto"

style={{
maxWidth:"700px"
}}
>

<h2
className=
"text-center mb-4"
>

Student Registration

</h2>


<div className="row g-3">


{/* Student Name */}

<div className="col-md-6">

<label>

Student Name

</label>

<input
type="text"

name="student_name"

className=
"form-control"

value={
formData.student_name
}

onChange={
handleChange
}

required
/>

</div>



{/* Roll Number */}

<div className="col-md-6">

<label>

Roll Number

</label>

<input
type="text"

name="roll_number"

className=
"form-control"

placeholder=
"Enter Roll Number"

value={
formData.roll_number
}

onChange={
handleChange
}

required
/>

</div>



{/* Mobile */}

<div className="col-md-6">

<label>

Mobile

</label>

<input
type="text"

name="mobile"

className=
"form-control"

value={
formData.mobile
}

onChange={
handleChange
}

required
/>

</div>



{/* Email */}

<div className="col-md-6">

<label>

Email

</label>

<input
type="email"

name="email"

className=
"form-control"

value={
formData.email
}

onChange={
handleChange
}

required
/>

</div>



{/* Password */}

<div className="col-md-6">

<label>

Password

</label>

<input
type="password"

name="password"

className=
"form-control"

value={
formData.password
}

onChange={
handleChange
}

required
/>

</div>

{/* Academic Year */}

<div className="col-md-6">

<label>

Academic Year

</label>

<input
type="text"

name="academic_year"

className=
"form-control"

placeholder=
"Ex: 2026-27"

value={
formData.academic_year
}

onChange={
handleChange
}

required
/>

</div>

{/* Year */}

<div className="col-md-4">

<label>

Year

</label>

<select
name="student_year"

className=
"form-select"

value={
formData.student_year
}

onChange={
handleChange
}

required
>

<option value="">
Select Year
</option>

<option value="1">
1
</option>

<option value="2">
2
</option>

<option value="3">
3
</option>

<option value="4">
4
</option>

</select>

</div>



{/* Semester */}

<div className="col-md-4">

<label>

Semester

</label>

<select
name="semester_no"

className=
"form-select"

value={
formData.semester_no
}

onChange={
handleChange
}

required
>

<option value="">
Select Semester
</option>

<option value="1">
1
</option>

<option value="2">
2
</option>

</select>

</div>



{/* Section */}

<div className="col-md-4">

<label>

Section

</label>

<select
name="section"

className=
"form-select"

value={
formData.section
}

onChange={
handleChange
}

required
>

<option value="">
Select Section
</option>

<option value="A">
A
</option>

<option value="B">
B
</option>

<option value="C">
C
</option>

</select>

</div>



{/* Branch */}

<div className="col-md-12">

<label>

Branch

</label>

<select
name="branch"

className=
"form-select"

value={
formData.branch
}

onChange={
handleChange
}

required
>

<option value="">
Select Branch
</option>

<option value="CE">
CE
</option>

<option value="EEE">
EEE
</option>

<option value="ME">
ME
</option>

<option value="ECE">
ECE
</option>

<option value="CSE">
CSE
</option>

<option value="AI&DS">
AI&DS
</option>

<option value="AIML">
AIML
</option>

<option value="CSM">
CSM
</option>

</select>

</div>

</div>



<button
className=
"btn btn-success w-100 mt-4"

onClick={
handleRegister
}
>

Register

</button>



<p
className=
"text-center mt-3"
>

Already Registered?

<button
type="button"

className=
"btn btn-link"

onClick={()=>

navigate(
"/student/login"
)
}
>

Login

</button>

</p>

</div>

</div>
);
}

export default
StudentRegister;