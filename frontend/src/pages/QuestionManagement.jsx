import {
useState,
useEffect
}
from "react";

import API
from "../services/api";


function QuestionManagement() {

const [

questions,
setQuestions

]
=
useState([]);


const [

question,
setQuestion

]
=
useState("");



const loadQuestions =
async()=>{

try{

const response =
await API.get(

"/questions"
);

setQuestions(
response.data
);

}catch(error){

console.log(error);
}
};



useEffect(()=>{

loadQuestions();

},[]);



// ADD QUESTION

const handleAddQuestion =
async()=>{

if(!question){

alert(
"Enter Question"
);

return;
}

try{

const response =
await API.post(

"/questions/add",

{
question
}
);

alert(
response.data.message
);

setQuestion("");

loadQuestions();

}catch(error){

alert(

error.response
?.data?.message
||
"Failed"
);
}
};



// DELETE QUESTION

const handleDelete =
async(id)=>{

const confirmDelete =
window.confirm(

"Delete Question?"
);

if(!confirmDelete)
return;

try{

const response =
await API.delete(

`/questions/delete/${id}`
);

alert(
response.data.message
);

loadQuestions();

}catch(error){

alert(
"Delete Failed"
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

maxWidth:
"900px",

margin:
"40px auto"

}}
>

<h2
className=
"text-center mb-4"
>

Question Management

</h2>



<div
className=
"row mb-4"
>

<div
className=
"col-md-9"
>

<input

type="text"

className=
"form-control"

placeholder=
"Enter Feedback Question"

value=
{question}

onChange=
{(e)=>

setQuestion(
e.target.value
)
}
/>

</div>



<div
className=
"col-md-3"
>

<button

className=
"submit-btn w-100"

onClick=
{handleAddQuestion}
>

Add Question

</button>

</div>

</div>



<table
className=
"table table-bordered"
>

<thead>

<tr>

<th>

S.No

</th>

<th>

Question

</th>

<th>

Action

</th>

</tr>

</thead>


<tbody>

{
questions.map(

(q,index)=>(

<tr
key={q.id}
>

<td>

{index+1}

</td>

<td>

{q.question}

</td>

<td>

<button

className=
"btn btn-danger"

onClick={()=>

handleDelete(
q.id
)
}
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

export default QuestionManagement;