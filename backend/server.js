const express =
require("express");

const cors =
require("cors");

require("dotenv")
.config();

const app =
express();


// Middleware

app.use(cors({

origin:[

"http://localhost:5173",

"https://student-feedback-system-alpha.vercel.app"

],

credentials:true

}));



app.use(express.json());


// Routes

const studentRoutes =
require("./routes/studentRoutes");

const facultyRoutes =
require("./routes/facultyRoutes");


const subjectRoutes =
require(
"./routes/subjectRoutes"
);

const feedbackRoutes =
require(
"./routes/feedbackRoutes"
);

const questionRoutes =
require(
"./routes/questionRoutes"
);

const adminRoutes =
require(
"./routes/adminRoutes"
);

const dashboardRoutes =
require(
"./routes/dashboardRoutes"
);




const reportRoutes =
require(
"./routes/reportRoutes"
);


const settingsRoutes =
require(
"./routes/settingsRoutes"
);

const matrixRoutes =
require(
"./routes/matrixRoutes"
);

const matrixFeedbackRoutes =
require(
"./routes/matrixFeedbackRoutes"
);

const analysisRoutes =
require(
"./routes/analysisRoutes"
);

const mappingRoutes =
require(
"./routes/mappingRoutes"
);

const studentAuthRoutes =
require(
"./routes/studentAuthRoutes"
);

const authRoutes =require("./routes/authRoutes");

app.use(
"/api/auth",
authRoutes
);


app.use(
"/api/student",
studentRoutes
);

app.use(
"/api/faculty",
facultyRoutes
);


app.use(
"/api/subject",
subjectRoutes
);

app.use(
"/api/feedback",
feedbackRoutes
);



app.use(
"/api/questions",
questionRoutes
);

app.use(
"/api/admin",
adminRoutes
);

app.use(
"/api/dashboard",
dashboardRoutes
);

app.use(
"/api/analysis",
analysisRoutes
);

app.use(
"/api/report",
reportRoutes
);

app.use(
"/api/settings",
settingsRoutes
);

app.use(
"/api/matrix",
matrixRoutes
);

app.use(
"/api/matrix-feedback",
matrixFeedbackRoutes
);

app.use(
"/api/subjects",
subjectRoutes
);

app.use(
"/api/mapping",
mappingRoutes
);

app.use(
"/api/student-auth",
studentAuthRoutes
);



app.get("/", (
req,
res
)=>{

res.send(
"Student Feedback API Running"
);

});


const PORT =
process.env.PORT
|| 5000;


app.listen(
PORT,
()=>{

console.log(
`Server Running on ${PORT}`
);
});