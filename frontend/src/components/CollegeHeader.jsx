import React from "react";

function CollegeHeader({ branch }) {

const departments = {

CSE:
"Department of Computer Science and Engineering",

ECE:
"Department of Electronics and Communication Engineering",

EEE:
"Department of Electrical and Electronics Engineering",

ME:
"Department of Mechanical Engineering",

CIVIL:
"Department of Civil Engineering"

};


return(

<div
className="text-center mb-3"
>

<h3
style={{
fontWeight:"bold",
marginBottom:"5px"
}}
>

BONAM VENKATA CHALAMAYYA ENGINEERING COLLEGE

</h3>


<h5
style={{
color:"#444",
marginBottom:"10px"
}}
>

{
departments[
branch
]
||
"Department"
}

</h5>

<hr/>

</div>
);
}

export default CollegeHeader;