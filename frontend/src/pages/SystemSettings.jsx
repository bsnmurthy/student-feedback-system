import {
useEffect,
useState
}
from "react";

import API
from "../services/api";


function SystemSettings(){

const [

settings,
setSettings

]
=
useState({

academic_year:"",
current_year:"",
current_semester:"",
feedback_open:true,
feedback_start:"",
feedback_end:""

});



useEffect(()=>{

loadSettings();

},[]);




// LOAD SETTINGS

const loadSettings =
async()=>{

try{

const response =
await API.get(
"/settings"
);

setSettings(
response.data
);

}catch(error){

console.log(error);
}
};




// HANDLE CHANGE

const handleChange =
(e)=>{

const {

name,
value,
type,
checked

}
=
e.target;

setSettings({

...settings,

[name]:

type==="checkbox"

?

checked

:

value

});
};




// UPDATE SETTINGS

const handleSave =
async()=>{

try{

const response =
await API.put(

"/settings",

settings
);

alert(
response.data.message
);

}catch(error){

console.log(error);

alert(
"Update Failed"
);
}
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
maxWidth:"700px",
margin:"40px auto"
}}
>

<h2
className=
"text-center mb-4"
>

System Settings

</h2>



<div className="mb-3">

<label>

Academic Year

</label>

<input
type="text"

name=
"academic_year"

className=
"form-control"

value={
settings.academic_year
}

onChange={
handleChange
}
/>

</div>




<div className="row">

<div className="col-md-6 mb-3">

<label>

Current Year

</label>

<select

name=
"current_year"

className=
"form-select"

value={
settings.current_year
}

onChange={
handleChange
}
>

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



<div className="col-md-6 mb-3">

<label>

Current Semester

</label>

<select

name=
"current_semester"

className=
"form-select"

value={
settings.current_semester
}

onChange={
handleChange
}
>

<option value="1">
1
</option>

<option value="2">
2
</option>

</select>

</div>

</div>




<div className="mb-3">

<label>

Feedback Start Date

</label>

<input
type="date"

name=
"feedback_start"

className=
"form-control"

value={
settings.feedback_start
|| ""
}

onChange={
handleChange
}
/>

</div>




<div className="mb-3">

<label>

Feedback End Date

</label>

<input
type="date"

name=
"feedback_end"

className=
"form-control"

value={
settings.feedback_end
|| ""
}

onChange={
handleChange
}
/>

</div>




<div
className=
"form-check mb-4"
>

<input

type="checkbox"

name=
"feedback_open"

className=
"form-check-input"

checked={
settings.feedback_open
}

onChange={
handleChange
}
/>

<label
className=
"form-check-label"
>

Feedback Open

</label>

</div>




<button

className=
"submit-btn w-100"

onClick={
handleSave
}
>

Save Settings

</button>

</div>

</div>
);
}

export default SystemSettings;