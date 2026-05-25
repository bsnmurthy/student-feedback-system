function ThankYou(){

return(

<div
style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#f8fafc"
}}
>

<div
className="card shadow p-5 text-center"
>

<h1>

✅ Feedback Submitted

</h1>

<p>

Thank you for your feedback.

Your response has been recorded successfully.

</p>

<a
href="/student-login"
className="btn btn-primary"
>

Back to Login

</a>

</div>

</div>
);
}

export default ThankYou;