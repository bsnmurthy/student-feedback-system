import React from "react";

import {
FaHome,
FaFilePdf,
FaUserTie,
FaBook,
FaLink,
FaChartBar,
FaChartLine,
FaSignOutAlt,
FaQuestionCircle,
FaCog
}
from "react-icons/fa";

const AdminSidebar = ({
page,
setPage
}) => {



const logout = () => {

localStorage.removeItem(
"adminToken"
);

window.location.href =
"/admin-login";
};


const menuItems = [

{
name: "Dashboard",
icon: <FaHome />,
page: "dashboard"
},

{
name: "Faculty Management",
icon: <FaUserTie />,
page: "faculty-management"
},

{
name: "Subject Management",
icon: <FaBook />,
page: "subject-management"
},

{
name: "Question Management",
icon: <FaQuestionCircle />,
page: "question-management"
},

{
name: "System Settings",
icon: <FaCog />,
page: "settings"
},

{
name: "Faculty Mapping",
icon: <FaLink />,
page: "mapping"
},

{
name: "Overall Reports",
icon: <FaFilePdf />,
page: "reports"
},

{
name: "Faculty Reports",
icon: <FaUserTie />,
page: "faculty"
},

{
name: "Analytics",
icon: <FaChartBar />,
page: "analytics"
},

{
name: "Question Analysis",
icon: <FaChartLine />,
page: "questions"
}
];


return (

<div
style={{

width:"260px",
background:"#0d47a1",
height:"100vh",
overflowY:"auto",
position:"sticky",
top:0

}}
>

<div>

<h1
style={{
fontWeight: "bold",
marginBottom: "40px",
fontSize:"28px"
}}
>
Admin Panel
</h1>


{
menuItems.map(
(item,index)=>(

<div
key={index}

onClick={()=>
setPage(
item.page
)
}

style={{
display: "flex",
alignItems: "center",
gap: "12px",
padding: "16px",
marginBottom: "14px",
borderRadius: "12px",
cursor: "pointer",

background:

page === item.page

? "#2563eb"

: "transparent",

transition:
"0.3s",

fontWeight:

page === item.page

? "bold"

: "normal"
}}
>

<span
style={{
fontSize:"20px"
}}
>
{
item.icon
}
</span>

<span
style={{
fontSize:"18px"
}}
>
{
item.name
}
</span>

</div>
))
}

</div>



<button

onClick={logout}

style={{
width: "100%",
padding: "14px",
border: "none",
background:
"#dc3545",
color: "white",
borderRadius: "10px",
fontSize: "18px",
cursor: "pointer",
display:"flex",
justifyContent:"center",
alignItems:"center",
gap:"8px"
}}
>

<FaSignOutAlt />

Logout

</button>

</div>
);
};

export default AdminSidebar;