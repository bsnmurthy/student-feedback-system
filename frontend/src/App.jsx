
import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";

import FacultyDetail
from "./pages/FacultyDetail";

import StudentRegister
from "./pages/StudentRegister";

import StudentLogin
from "./pages/StudentLogin";

import Dashboard
from "./pages/Dashboard";

import FeedbackForm
from "./pages/FeedbackForm";

import AdminDashboard
from "./pages/AdminDashboard";

import FacultyAnalysis
from "./pages/FacultyAnalysis";

import AdminLogin
from "./pages/AdminLogin";

import ThankYou
from "./pages/ThankYou";

import ProtectedRoute
from "./components/ProtectedRoute";

import Login
from "./pages/StudentLogin";


import CommonLogin from "./pages/CommonLogin";

import QuestionManagement
from "./pages/QuestionManagement";

function App() {

return (

<BrowserRouter>

<Routes>

<Route
path="/login"
element={<CommonLogin/>}
/>

<Route
path="/"
element={<CommonLogin/>}
/>

<Route
path="/student-register"

element={
<StudentRegister />
}

/>

<Route
path="/dashboard"
element={<Dashboard />}
/>

<Route
path="/feedback"
element={<FeedbackForm />}
/>


<Route
path="/question-management"
element={<QuestionManagement/>}
/>

<Route

path=
"/faculty/:faculty_id"

element={
<FacultyDetail />
}

/>

<Route
path="/admin-dashboard"

element={

<ProtectedRoute>

<AdminDashboard />

</ProtectedRoute>

}
/>

<Route
path="/faculty-analysis"
element={
<FacultyAnalysis />
}
/>

<Route

path=
"/admin-login"

element={
<AdminLogin />
}

/>

<Route
path="/admin"
element={<AdminLogin />}
/>

<Route
path="/thank-you"
element={<ThankYou />}
/>

<Route
path="/student-login"
element={<Login />}
/>

</Routes>



</BrowserRouter>

);
}

export default App;