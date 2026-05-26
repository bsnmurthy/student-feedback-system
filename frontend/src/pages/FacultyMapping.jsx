import {
useEffect,
useState
}
from "react";

import API
from "../services/api";

function FacultyMapping(){

const [
facultyList,
setFacultyList
]
=
useState([]);

const [
subjectList,
setSubjectList
]
=
useState([]);

const [
mappingList,
setMappingList
]
=
useState([]);

const [

formData,
setFormData

]
=
useState({

academic_year:"",
branch:"CSE",
student_year:"",
semester_no:"",
section:"A",
faculty_id:"",
subject_id:""

});


useEffect(()=>{

loadData();

},[]);



const loadData =
async()=>{

try{

const [

facultyRes,
subjectRes,
mappingRes

]

=

await Promise.all([

API.get(
"/faculty"
),

API.get(
"/subjects"
),

API.get(
"/mapping"
)

]);

setFacultyList(
facultyRes.data
);

setSubjectList(
subjectRes.data
);

setMappingList(
mappingRes.data
|| []
);

}catch(error){

console.log(
"Loading Error:",
error
);
}
};



// ADD MAPPING

const addMapping =
async()=>{

try{

console.log(
"FORM DATA:",
formData
);

await API.post(

"/mapping",

formData
);

alert(
"Mapping Added Successfully"
);

setFormData({

academic_year:"",
branch:"CSE",
student_year:"",
semester_no:"",
section:"A",
faculty_id:"",
subject_id:""

});

loadData();

}catch(error){

console.log(error);

alert(

error.response
?.data?.message
||
"Failed to Add Mapping"

);
}
};



// DELETE

const deleteMapping =
async(id)=>{

try{

await API.delete(

`/mapping/${id}`
);

alert(
"Deleted Successfully"
);

loadData();

}catch(error){

console.log(error);

alert(
"Delete Failed"
);
}
};



return(

<div className="container mt-4">

<h2 className="mb-4">

Faculty–Subject Mapping

</h2>


<div className="card p-4 shadow-sm mb-4">

<div className="row g-3">


<div className="col-md-3">

<label>
Faculty
</label>

<select
className="form-select"

value={formData.faculty_id}

onChange={(e)=>

setFormData({

...formData,

faculty_id:
e.target.value
})
}
>

<option value="">
Select Faculty
</option>

{
facultyList.map((item)=>(

<option
key={item.id}
value={item.id}
>

{
item.faculty_name
}

</option>
))
}

</select>

</div>



<div className="col-md-3">

<label>
Subject
</label>

<select
className="form-select"

value={formData.subject_id}

onChange={(e)=>

setFormData({

...formData,

subject_id:
e.target.value
})
}
>

<option value="">
Select Subject
</option>

{
subjectList.map((item)=>(

<option
key={item.id}
value={item.id}
>

{
item.subject_name
}

</option>
))
}

</select>

</div>


<div className="col-md-2">

<label>
Academic Year
</label>

<select
className="form-select"

value={formData.academic_year}

onChange={(e)=>

setFormData({
...formData,
academic_year:e.target.value
})
}
>

<option value="">
Select
</option>

<option value="2026-27">
2024-25
</option>

<option value="2026-27">
2025-26
</option>

<option value="2026-27">
2026-27
</option>

<option value="2027-28">
2027-28
</option>

<option value="2028-29">
2028-29
</option>

<option value="2029-30">
2029-30
</option>

</select>
</div>

	

<div className="col-md-1">

<label>
Year
</label>

<select
className=
"form-select"

value={
formData.student_year
}

onChange={(e)=>

setFormData({

...formData,

student_year:
e.target.value
})
}
>

<option value="">
Select
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



<div className="col-md-1">

<label>
Sem
</label>

<select
className=
"form-select"

value={
formData.semester_no
}

onChange={(e)=>

setFormData({

...formData,

semester_no:
e.target.value
})
}
>

<option value="">
Select
</option>

<option value="1">
1
</option>

<option value="2">
2
</option>

</select>

</div>



<div className="col-md-2">

<label>
Branch
</label>

<select
className=
"form-select"

value={
formData.branch
}

onChange={(e)=>

setFormData({

...formData,

branch:
e.target.value
})
}
>

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



<div className="col-md-2">

<label>
Section
</label>

<select
className=
"form-select"

value={
formData.section
}

onChange={(e)=>

setFormData({

...formData,

section:
e.target.value
})
}
>

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



<div className="col-md-2 d-flex align-items-end">

<button
className=
"btn btn-success w-100"

onClick=
{addMapping}
>

Assign

</button>

</div>

</div>

</div>



<div className="card p-4 shadow-sm">

<h4 className="mb-3">

Current Mapping

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
Faculty
</th>

<th>
Subject
</th>

<th>
AY
</th>

<th>
Year
</th>

<th>
Sem
</th>

<th>
Branch
</th>

<th>
Section
</th>

<th>
Action
</th>

</tr>

</thead>

<tbody>

{
mappingList.map(
(item)=>(

<tr key={item.id}>

<td>
{item.faculty_name}
</td>

<td>
{item.subject_name}
</td>

<td>
{item.academic_year}
</td>

<td>
{item.student_year}
</td>

<td>
{item.semester_no}
</td>

<td>
{item.branch}
</td>

<td>
{item.section}
</td>

<td>

<button
className=
"btn btn-danger btn-sm"

onClick=
{()=>deleteMapping(
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

export default FacultyMapping;