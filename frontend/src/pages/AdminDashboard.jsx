

import AdminSidebar
from "../components/AdminSidebar";

import {
  useEffect,
  useState
} from "react";
import FacultyManagement
from "./FacultyManagement";

import SubjectManagement
from "./SubjectManagement";

import FacultyMapping
from "./FacultyMapping";

import {
  useNavigate
} from "react-router-dom";

import API from "../services/api";

import CollegeHeader from "../components/CollegeHeader";
import CollegeFooter from "../components/CollegeFooter";
import QuestionManagement from "./QuestionManagement";

import SystemSettings
from "./SystemSettings";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from "recharts";

function AdminDashboard() {
const [page,setPage] =
useState(
"dashboard"
);
  const navigate =
    useNavigate();

  const [analysis,
    setAnalysis] =
    useState([]);

const [questionAnalysis,
setQuestionAnalysis]
=
useState([]);
const [search,
setSearch] =
useState("");


const [
facultySearch,
setFacultySearch
]
=
useState("");

  const [bestFaculty,
    setBestFaculty] =
    useState(null);

  const [stats,
    setStats] =
    useState({
      totalFaculty: 0,
      totalFeedback: 0
    });

  const [filters,
    setFilters] =
    useState({

      academic_year:
        "2026-27",

      student_year:
        "3",

      semester_no:
        "1",

      branch:
        "CSE",

      section:
        "B"
    });



  // ROUTE PROTECTION

  useEffect(() => {

    const token =
      localStorage.getItem(
        "adminToken"
      );

    if (!token) {

      navigate(
        "/admin-login"
      );

      return;
    }

    loadAnalysis();

  }, [filters]);



  // LOAD ANALYSIS

  const loadAnalysis =
    async () => {

      try {

        const response =
          await API.get(

            "/analysis/faculty",

            {
              params:
                filters
            }
          );

const questionResponse =
await API.get(

"/analysis/questions",

{
params:
filters
}
);

setQuestionAnalysis(

questionResponse.data
);

        setAnalysis(
          response.data
        );


        if (
          response.data.length > 0
        ) {

          const sorted =
            [...response.data]
              .sort(
                (a, b) =>
                  b.average_score -
                  a.average_score
              );

          setBestFaculty(
            sorted[0]
          );
        }


        setStats({

          totalFaculty:
            response.data.length,

          totalFeedback:
            response.data.reduce(

              (sum, item) =>

                sum +
                Number(
                  item.total_feedback
                ),

              0
            )
        });

      } catch (error) {

        console.log(error);
      }
    };



  // LOGOUT

  const handleLogout =
    () => {

      localStorage.removeItem(
        "adminToken"
      );

      navigate(
        "/admin-login"
      );
    };



  // PDF DOWNLOAD

  const downloadPDF =
() => {

const url =

`http://localhost:5000/api/report/download
?academic_year=${filters.academic_year}
&student_year=${filters.student_year}
&semester_no=${filters.semester_no}
&branch=${filters.branch}
&section=${filters.section}`;

window.open(
url,
"_blank"
);
};



  const colors = [

    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#ca8a04",
    "#9333ea",
    "#0891b2",
    "#ea580c"
  ];

const filteredAnalysis =

analysis.filter(
(item)=>

item.faculty_name
?.toLowerCase()

.includes(

search
.toLowerCase()
)
);


const facultyList =

analysis.filter(
(item)=>

item.faculty_name
?.toLowerCase()

.includes(

facultySearch
.toLowerCase()
)
);


 return (

<div
style={{
display:"flex",
minHeight:"100vh",
overflow:"hidden"
}}
>

<AdminSidebar
page={page}
setPage={setPage}
/>

<div
style={{
flex:1,
padding:"20px",
height:"100vh",
overflowY:"auto"
}}
>

<CollegeHeader />

<div
className=
"d-flex justify-content-between align-items-center mb-4"
>

<div>

<h2>
Admin Dashboard
</h2>

<p className="text-muted">

Student Feedback Analysis

</p>

</div>



</div>



{/* DASHBOARD */}

{
page==="settings"

&&

<SystemSettings />
}

{
page ===
"question-management"

&&

<QuestionManagement/>
}

{
page==="dashboard"
&&
(
<>

{/* FILTERS */}

<div className="row mb-4">

<div className="col-md-2">

<label>
AY
</label>

<select
className=
"form-select"

value={
filters.academic_year
}

onChange={(e)=>

setFilters({

...filters,

academic_year:
e.target.value
})
}
>

<option>
2026-27
</option>

<option>
2025-26
</option>

</select>

</div>



<div className="col-md-2">

<label>
Year
</label>

<select
className=
"form-select"

value={
filters.student_year
}

onChange={(e)=>

setFilters({

...filters,

student_year:
e.target.value
})
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



<div className="col-md-2">

<label>
Semester
</label>

<select
className=
"form-select"

value={
filters.semester_no
}

onChange={(e)=>

setFilters({

...filters,

semester_no:
e.target.value
})
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



<div className="col-md-2">

<label>
Branch
</label>

<select
className=
"form-select"

value={
filters.branch
}

onChange={(e)=>

setFilters({

...filters,

branch:
e.target.value
})
}
>

<option>
CSE
</option>

<option>
ECE
</option>

<option>
EEE
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
filters.section
}

onChange={(e)=>

setFilters({

...filters,

section:
e.target.value
})
}
>

<option>A</option>
<option>B</option>
<option>C</option>

</select>

</div>

</div>



{/* STATS */}

<div className="row">

<div className="col-md-4">

<div className="dashboard-card">

<h5>
Total Faculty
</h5>

<h2>
{stats.totalFaculty}
</h2>

</div>

</div>



<div className="col-md-4">

<div className="dashboard-card">

<h5>
Total Feedback
</h5>

<h2>
{stats.totalFeedback}
</h2>

</div>

</div>



<div className="col-md-4">

<div className="dashboard-card">

<h5>
Best Faculty
</h5>

<h4>
{
bestFaculty
?.faculty_name
||
"-"
}
</h4>

<p>

Score:

{
bestFaculty
?.average_score
||
"-"
}

</p>

</div>

</div>

</div>

</>
)
}

{
page==="faculty-management"
&&
(
<FacultyManagement />
)
}
{
page==="faculty-management"
&&
(
<FacultyManagement />
)
}

{
page==="subject-management"
&&
(
<SubjectManagement />
)
}

{
page==="mapping"
&&
(
<FacultyMapping />
)
}

{/* REPORTS */}

{
page==="reports"
&&
(
<>
<div
className=
"d-flex justify-content-between align-items-center mb-4"
>

<h3>
Faculty Ranking Report
</h3>

<div>

<input

type="text"

placeholder=
"Search Faculty"

className=
"form-control"

value=
{search}

onChange=
{(e)=>

setSearch(
e.target.value
)
}

/>

</div>

</div>



<div className="row mb-3">

<div className="col-md-3">

<div className=
"dashboard-card"
>

<h6>
Total Faculty
</h6>

<h3>
{
stats.totalFaculty
}
</h3>

</div>

</div>


<div className="col-md-3">

<div className=
"dashboard-card"
>

<h6>
Best Faculty
</h6>

<p>

{
bestFaculty
?.faculty_name
||
"-"
}

</p>

</div>

</div>


<div className="col-md-3">

<div className=
"dashboard-card"
>

<h6>
Branch
</h6>

<p>
{
filters.branch
}
</p>

</div>

</div>


<div className="col-md-3">

<div className=
"dashboard-card"
>

<h6>
Academic Year
</h6>

<p>
{
filters.academic_year
}
</p>

</div>

</div>

</div>



<table
className=
"table table-bordered table-hover"
>

<thead
className=
"table-primary"
>

<tr>

<th>
Rank
</th>

<th>
Faculty
</th>

<th>
Subject
</th>

<th>
Average
</th>

<th>
Feedback
</th>

<th>
Action
</th>

</tr>

</thead>

<tbody>

{
filteredAnalysis

.sort(
(a,b)=>

b.average_score
-
a.average_score
)

.map(
(item,index)=>(

<tr
key=
{index}
>

<td>
{index+1}
</td>

<td>
{
item.faculty_name
}
</td>

<td>
{
item.subject_name
}
</td>

<td>
{
item.average_score
}
</td>

<td>
{
item.total_feedback
}
</td>

<td>



<button

className=
"btn btn-primary btn-sm"

onClick=
{()=>navigate(

`/faculty/${item.faculty_id}`
)}
>

View Report

</button>

</td>

</tr>
))
}

</tbody>

</table>



<div className=
"text-center mt-4"
>

<button

className=
"btn btn-success"

onClick=
{
downloadPDF
}
>

Download PDF Report

</button>

</div>
</>
)
}

{
page==="faculty"
&&
(
<>
<div
className=
"d-flex justify-content-between align-items-center mb-4"
>

<h3>
Faculty Reports
</h3>

<input

type="text"

placeholder=
"Search Faculty"

className=
"form-control"

style={{
width:"300px"
}}

value=
{facultySearch}

onChange=
{(e)=>

setFacultySearch(
e.target.value
)
}
/>

</div>



<div className="row">

{
facultyList.length>0

?

facultyList.map(
(item,index)=>(

<div
className=
"col-md-4 mb-4"

key={index}
>

<div
className=
"card shadow border-0 h-100"
>

<div
className=
"card-body text-center"
>

<h5
className=
"fw-bold"
>

{
item.faculty_name
}

</h5>

<p
className=
"text-muted"
>

{
item.subject_name
}

</p>

<div
className=
"mb-3"
>

<span
className=
"badge bg-primary"
>

Score:
{" "}

{
item.average_score
}

</span>

</div>

<button

className=
"btn btn-success"

onClick={()=>

navigate(

`/faculty/${item.faculty_id}`
)
}
>

View Report

</button>

</div>

</div>

</div>
))

:

<div
className=
"text-center"
>

No Faculty Found

</div>
}

</div>
</>
)
}
{/* ANALYTICS */}
{/* ANALYTICS */}

{
page==="analytics"
&&
(
<>
<h2 className="mb-4">

Department Analytics

</h2>

<div className="row">

<div className="col-md-4">

<div className="dashboard-card">

<h5>
Best Faculty
</h5>

<h3>
{
bestFaculty
?.faculty_name
||
"-"
}
</h3>

<p>

Score:
{" "}

{
bestFaculty
?.average_score
||
"-"
}

</p>

</div>

</div>



<div className="col-md-4">

<div className="dashboard-card">

<h5>
Total Faculty
</h5>

<h2>
{
stats
?.totalFaculty
||
0
}
</h2>

</div>

</div>



<div className="col-md-4">

<div className="dashboard-card">

<h5>
Total Feedback
</h5>

<h2>
{
stats
?.totalFeedback
||
0
}
</h2>

</div>

</div>

</div>



<div className="mt-5">

<h4>

Faculty Performance

</h4>

<div
style={{
width:"100%",
height:"450px"
}}
>

<ResponsiveContainer>

<BarChart
data={analysis}
>

<CartesianGrid
strokeDasharray=
"3 3"
/>

<XAxis
dataKey=
"faculty_name"
/>

<YAxis
domain={[0,5]}
/>

<Tooltip />

<Bar
dataKey=
"average_score"
fill="#2563eb"
/>

</BarChart>

</ResponsiveContainer>

</div>

</div>

</>
)
}
{/* QUESTION ANALYSIS */}

{
page==="questions"
&&
(
<>

<h3 className="text-center mb-3">

Question-wise Analytics

</h3>

<div
style={{
width:"100%",
height:"450px"
}}
>

<ResponsiveContainer>

<BarChart
data=
{questionAnalysis}
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
>

{
questionAnalysis.map(
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

</>
)
}

<CollegeFooter />

</div>

</div>
);
}
export default AdminDashboard;