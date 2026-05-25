import {
useEffect,
useState
}
from "react";

import API
from "../services/api";

import {

BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer

}
from "recharts";


function FacultyAnalysis(){

const [data,
setData]
=
useState([]);


useEffect(()=>{

loadAnalysis();

},[]);


const loadAnalysis =
async()=>{

const response =
await API.get(

"/analysis/faculty"
);

setData(
response.data
);
};


return(

<div style={{
padding:"40px"
}}>

<h1>
Faculty Wise Analysis
</h1>

<br/>

<div style={{
width:"100%",
height:"400px"
}}>

<ResponsiveContainer>

<BarChart
data={data}
>

<CartesianGrid />

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
/>

</BarChart>

</ResponsiveContainer>

</div>

</div>
);
}

export default
FacultyAnalysis;