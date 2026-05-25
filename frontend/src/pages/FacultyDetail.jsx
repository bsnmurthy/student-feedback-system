import {
useEffect,
useState
}
from "react";

import {
useParams,
useNavigate
}
from "react-router-dom";

import API
from "../services/api";

import CollegeHeader
from "../components/CollegeHeader";

import CollegeFooter
from "../components/CollegeFooter";

import {
ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
Cell
}
from "recharts";

function FacultyDetail(){

const {
faculty_id
}
=
useParams();

const navigate =
useNavigate();

const [
facultyData,
setFacultyData
]
=
useState(null);


useEffect(()=>{

loadFaculty();

},[]);


const loadFaculty =
async()=>{

try{

const response =
await API.get(

`/analysis/faculty/${faculty_id}`
);

setFacultyData(
response.data
);

}catch(error){

console.log(error);
}
};


const colors=[

"#2563eb",
"#16a34a",
"#dc2626",
"#ca8a04",
"#9333ea",
"#0891b2",
"#ea580c"
];


if(!facultyData){

return(

<h2
className=
"text-center mt-5"
>
Loading...
</h2>

);
}


const strengths =

facultyData.questionAnalysis

.filter(
q=>

Number(
q.average_score
)>=4
);


const weakAreas =

facultyData.questionAnalysis

.filter(
q=>

Number(
q.average_score
)<4
);


return(

<div
style={{
background:"#f5f7fb",
minHeight:"100vh",
padding:"20px"
}}
>

<CollegeHeader />

<div className="container-fluid">

{/* TOP BUTTONS */}

<div
className=
"d-flex justify-content-between align-items-center mb-4"
>

<button
className=
"btn btn-secondary"

onClick={()=>
navigate("/admin-dashboard")
}
>

← Back

</button>


<button
className=
"btn btn-success"

onClick={() => {

const url =

`https://student-feedback-api-lsg5.onrender.com//api/report/faculty/${faculty_id}`;

window.open(
url,
"_blank"
);

}}
>

Download Faculty PDF

</button>

</div>



{/* PROFILE */}

<div
className=
"card shadow border-0 mb-4"
>

<div
className=
"card-body text-center"
>

<h2 className="fw-bold">

{
facultyData
.faculty_name
}

</h2>

<h5 className="text-muted">

{
facultyData
.subject_name
}

</h5>

</div>

</div>



{/* STATS */}

<div className="row">

<div className="col-md-4">

<div
className=
"card shadow-sm border-0 text-center p-3"
>

<h5>
Feedback Count
</h5>

<h2 className="text-primary">

{
facultyData
.feedback_count
}

</h2>

</div>

</div>



<div className="col-md-4">

<div
className=
"card shadow-sm border-0 text-center p-3"
>

<h5>
Strong Areas
</h5>

<h2 className="text-success">

{
strengths.length
}

</h2>

</div>

</div>



<div className="col-md-4">

<div
className=
"card shadow-sm border-0 text-center p-3"
>

<h5>
Areas for Improvement
</h5>

<h2 className="text-danger">

{
weakAreas.length
}

</h2>

</div>

</div>

</div>



{/* CHART */}

<div
className=
"card shadow border-0 mt-4"
>

<div className="card-body">

<h4
className=
"text-center mb-4"
>

Question-wise Performance

</h4>

<div
style={{
width:"100%",
height:"420px"
}}
>

<ResponsiveContainer>

<BarChart
data=
{
facultyData
.questionAnalysis
}
>

<CartesianGrid
strokeDasharray=
"3 3"
/>

<XAxis
dataKey=
"question"
/>

<YAxis
domain={[0,5]}
/>

<Tooltip />

<Bar
dataKey=
"average_score"

radius={[
8,
8,
0,
0
]}
>

{
facultyData
.questionAnalysis
.map(
(item,index)=>(

<Cell
key={index}

fill={
colors[
index %
colors.length
]
}
/>
))
}

</Bar>

</BarChart>

</ResponsiveContainer>

</div>

</div>

</div>



{/* TABLES */}

<div className="row mt-4">

<div className="col-md-6">

<div
className=
"card shadow border-0"
>

<div className="card-body">

<h4 className="text-success mb-3">

Strong Areas

</h4>

<table
className=
"table table-bordered table-hover"
>

<thead className="table-success">

<tr>
<th>Question</th>
<th>Score</th>
</tr>

</thead>

<tbody>

{
strengths.length>0

?

strengths.map(
(item,index)=>(

<tr key={index}>

<td>
{
item.question
}
</td>

<td>

<span
className=
"badge bg-success"
>

{
item.average_score
}

</span>

</td>

</tr>
))

:

<tr>

<td
colSpan="2"
className=
"text-center"
>

No Strong Areas

</td>

</tr>
}

</tbody>

</table>

</div>

</div>

</div>



<div className="col-md-6">

<div
className=
"card shadow border-0"
>

<div className="card-body">

<h4 className="text-danger mb-3">

Areas for Improvement

</h4>

<table
className=
"table table-bordered table-hover"
>

<thead className="table-danger">

<tr>
<th>Question</th>
<th>Score</th>
</tr>

</thead>

<tbody>

{
weakAreas.length>0

?

weakAreas.map(
(item,index)=>(

<tr key={index}>

<td>
{
item.question
}
</td>

<td>

<span
className=
"badge bg-danger"
>

{
item.average_score
}

</span>

</td>

</tr>
))

:

<tr>

<td
colSpan="2"
className=
"text-center"
>

No Weak Areas

</td>

</tr>
}

</tbody>

</table>

</div>

</div>

</div>

</div>

</div>

<CollegeFooter />

</div>
);
}

export default FacultyDetail;