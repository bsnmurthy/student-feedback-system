import {
useEffect,
useState
}
from "react";

import API
from "../services/api";

import CollegeHeader
from "../components/CollegeHeader";

import CollegeFooter
from "../components/CollegeFooter";


function FeedbackForm() {

const student =
JSON.parse(

localStorage.getItem(
"student"
)
);


const [
facultyRows,
setFacultyRows
]
=
useState([]);


const [
questions,
setQuestions
]
=
useState([]);


const [
ratings,
setRatings
]
=
useState({});



useEffect(()=>{

if(student){

loadFaculty();
loadQuestions();

}

},[]);



// LOAD FACULTY

const loadFaculty =
async()=>{

try{

console.log(
"Student Object:",
student
);


const response =
await API.get(

"/mapping/student-faculty",

{
params:{

branch:
student.branch,

student_year:
student.student_year,

semester:
student.semester_no,

section:
student.section

}
}
);


console.log(
"Faculty Loaded:",
response.data
);


setFacultyRows(
response.data
|| []
);

}catch(error){

console.log(
"Faculty Error:",
error
);
}
};




// LOAD QUESTIONS

const loadQuestions =
async()=>{

try{

const response =
await API.get(
"/questions"
);

console.log(
"Questions Loaded:",
response.data
);

setQuestions(
response.data
|| []
);

}catch(error){

console.log(
"Question Error:",
error
);
}
};




// HANDLE RATING

const handleRating =
(
facultyId,
subjectId,
questionId,
value
)=>{

setRatings(
(prev)=>({

...prev,

[
`${facultyId}_${subjectId}_${questionId}`
]:
Number(value)

})
);
};




// SUBMIT FEEDBACK

const handleSubmit =
async()=>{

try{

const feedbacks =

facultyRows.map(
(row)=>{

const facultyRatings =
{};


questions.forEach(
(q)=>{

facultyRatings[
q.id
]
=
ratings[
`${row.faculty_id}_${row.subject_id}_${q.id}`
]
|| 0;

}
);


return{

faculty_id:
row.faculty_id,

subject_id:
row.subject_id,

ratings:
facultyRatings,

comments:""

};
}
);


await API.post(

"/matrix-feedback/submit",

{

student_id:
student.id,

academic_year:student.academic_year,

semester_no:
Number(
student.semester_no
),

student_year:
Number(
student.student_year
),

section:
student.section,

branch:
student.branch,

feedbacks

}
);


alert(
"Feedback Submitted Successfully"
);


// CLEAR SESSION

localStorage.removeItem(
"student"
);

localStorage.removeItem(
"studentToken"
);


// REDIRECT

window.location.href =
"/student-login";


}catch(error){

console.log(
"Submit Error:",
error
);

alert(

error.response
?.data
?.message

||

"Submission Failed"
);
}
};




return(

<div className="page-container">

<div className="feedback-card">

<CollegeHeader
branch={
student?.branch
}
/>


<h1
className=
"page-title text-center"
>

Faculty Feedback Matrix

</h1>


<p
className=
"sub-title text-center"

style={{
fontSize:"14px",
marginBottom:"10px"
}}
>

Fill feedback for all faculty at once

</p>





<div
className=
"student-box"

style={{
padding:"8px",
marginBottom:"10px"
}}
>

<h6>

Welcome,
{" "}
{student?.student_name}

</h6>


<p
style={{
fontSize:"12px",
margin:0
}}
>

Branch:
{" "}
{student?.branch}

{" | "}

Year:
{" "}
{student?.student_year}

{" | "}

Semester:
{" "}
{student?.semester_no}

{" | "}

Section:
{" "}
{student?.section}

</p>

</div>





<div
style={{
overflow:"auto",
maxHeight:"78vh",
border:"1px solid #ddd"
}}
>

<table
className=
"table table-bordered"

style={{
fontSize:"11px",
minWidth:"1800px",
lineHeight:"1.1",
marginBottom:0
}}
>

<thead
style={{
background:"#2563eb",
color:"white",
position:"sticky",
top:0,
zIndex:10
}}
>

<tr>

<th>
Faculty
</th>

<th>
Subject
</th>

{
questions.map(
(q,index)=>(

<th key={q.id}>

<b>
Q{index+1}
</b>

<br/>

{q.question}

</th>
))
}

</tr>

</thead>





<tbody>

{
facultyRows.length > 0

?

facultyRows.map(
(row)=>(

<tr
key={
`${row.faculty_id}_${row.subject_id}`
}
>

<td>
{row.faculty_name}
</td>

<td>
{row.subject_name}
</td>


{
questions.map(
(q)=>(

<td key={q.id}>

<select
className=
"form-select form-select-sm"

onChange={(e)=>

handleRating(

row.faculty_id,

row.subject_id,

q.id,

e.target.value
)
}
>

<option value="">
-
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

<option value="5">
5
</option>

</select>

</td>
))
}

</tr>
))

:

<tr>

<td
colSpan="50"
className=
"text-center"
>

No Faculty Mapping Found

</td>

</tr>
}

</tbody>

</table>

</div>

<div className="text-center mt-3">

<button
className=
"submit-btn"

onClick={
handleSubmit
}
>

Submit All Feedback

</button>

</div>


<CollegeFooter />

</div>

</div>

);
}

export default FeedbackForm;