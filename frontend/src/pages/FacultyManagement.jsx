import {
useEffect,
useState
}
from "react";

import API
from "../services/api";

function FacultyManagement(){

const [
facultyList,
setFacultyList
]
=
useState([]);

const [
formData,
setFormData
]
=
useState({

faculty_name:"",
designation:"",
department:"CSE",
email:""

});


useEffect(()=>{

loadFaculty();

},[]);



const loadFaculty =
async()=>{

try{

const response =
await API.get(
"/faculty"
);

setFacultyList(
response.data
);

}catch(error){

console.log(error);
}
};



const handleChange =
(e)=>{

setFormData({

...formData,

[e.target.name]:
e.target.value

});
};



const addFaculty =
async()=>{

try{

await API.post(

"/faculty",

formData
);

alert(
"Faculty Added Successfully"
);

setFormData({

faculty_name:"",
designation:"",
department:"CSE",
email:""

});

loadFaculty();

}catch(error){

console.log(error);
}
};



const deleteFaculty =
async(id)=>{

const confirmDelete =
window.confirm(

"Delete Faculty?"
);

if(!confirmDelete)
return;

try{

await API.delete(

`/faculty/${id}`
);

loadFaculty();

}catch(error){

console.log(error);
}
};



return(

<div className="container mt-4">

<h2 className="mb-4">

Faculty Management

</h2>



<div className="card p-4 shadow-sm mb-4">

<h4>

Add Faculty

</h4>

<div className="row">

<div className="col-md-3">

<input
type="text"
name="faculty_name"
placeholder="Faculty Name"
className="form-control"
value={
formData.faculty_name
}
onChange={
handleChange
}
/>

</div>


<div className="col-md-3">

<input
type="text"
name="designation"
placeholder="Designation"
className="form-control"
value={
formData.designation
}
onChange={
handleChange
}
/>

</div>


<div className="col-md-2">

<select
name="department"
className="form-select"
value={
formData.department
}
onChange={
handleChange
}
>

<option>
CE
</option>

<option>
EEE
</option>

<option>
ME
</option>

<option>
ECE
</option>

<option>
CSE
</option>


<option>
AI&DS
</option>

<option>
AIML
</option>

<option>
CSM
</option>

</select>

</div>



<div className="col-md-3">

<input
type="email"
name="email"
placeholder="Email"
className="form-control"
value={
formData.email
}
onChange={
handleChange
}
/>

</div>



<div className="col-md-1">

<button
className=
"btn btn-success w-100"

onClick=
{addFaculty}
>

Add

</button>

</div>

</div>

</div>



<div className="card p-4 shadow-sm">

<h4 className="mb-3">

Faculty List

</h4>

<table
className=
"table table-bordered"
>

<thead
className=
"table-primary"
>

<tr>

<th>
Faculty Name
</th>

<th>
Designation
</th>

<th>
Department
</th>

<th>
Email
</th>

<th>
Action
</th>

</tr>

</thead>

<tbody>

{
facultyList.map(
(item)=>(
<tr
key={item.id}
>

<td>
{
item.faculty_name
}
</td>

<td>
{
item.designation
}
</td>

<td>
{
item.department
}
</td>

<td>
{
item.email
}
</td>

<td>

<button
className=
"btn btn-danger btn-sm"

onClick=
{()=>deleteFaculty(
item.id
)}
>

Delete

</button>

</td>

</tr>
))
}

</tbody>

</table>

</div>

</div>
);
}

export default
FacultyManagement;