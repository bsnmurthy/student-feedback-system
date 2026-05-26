import {
useEffect,
useState
}
from "react";

import API
from "../services/api";

function SubjectManagement(){

const [
subjects,
setSubjects
]
=
useState([]);

const [
formData,
setFormData
]
=
useState({

subject_name:"",
student_year:"3",
semester_no:"1",
branch:"CSE"

});


useEffect(()=>{

loadSubjects();

},[]);


const loadSubjects =
async()=>{

const response =
await API.get(
"/subjects"
);

setSubjects(
response.data
);
};


const addSubject =
async()=>{

await API.post(

"/subjects",

formData
);

alert(
"Subject Added"
);

loadSubjects();
};


const deleteSubject =
async(id)=>{

await API.delete(

`/subjects/${id}`
);

loadSubjects();
};


return(

<div className="container mt-4">

<h2>

Subject Management

</h2>

<div className="card p-4 mb-4">

<div className="row">

<div className="col-md-4">

<input
type="text"
placeholder="Subject Name"
className="form-control"

onChange={(e)=>

setFormData({

...formData,

subject_name:
e.target.value
})
}
/>

</div>


<div className="col-md-2">

<select
className=
"form-select"

onChange={(e)=>

setFormData({

...formData,

student_year:
e.target.value
})
}
>

<option>
1
</option>

<option>
2
</option>

<option>
3
</option>

<option>
4
</option>

</select>

</div>



<div className="col-md-2">

<select
className=
"form-select"

onChange={(e)=>

setFormData({

...formData,

semester_no:
e.target.value
})
}
>

<option>
1
</option>

<option>
2
</option>

</select>

</div>



<div className="col-md-2">

<select
className=
"form-select"

onChange={(e)=>

setFormData({

...formData,

branch:
e.target.value
})
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



<div className="col-md-2">

<button
className=
"btn btn-success w-100"

onClick=
{addSubject}
>

Add

</button>

</div>

</div>

</div>



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
Subject
</th>

<th>
Year
</th>

<th>
Semester
</th>

<th>
Branch
</th>

<th>
Action
</th>

</tr>

</thead>

<tbody>

{
subjects.map(
(item)=>(

<tr key={item.id}>

<td>
{
item.subject_name
}
</td>

<td>
{
item.student_year
}
</td>

<td>
{
item.semester_no
}
</td>

<td>
{
item.branch
}
</td>

<td>

<button
className=
"btn btn-danger btn-sm"

onClick=
{()=>deleteSubject(
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
);
}

export default
SubjectManagement;