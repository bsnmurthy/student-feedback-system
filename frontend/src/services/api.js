import axios from "axios";

const API =
axios.create({

baseURL:
"https://student-feedback-api-lsg5.onrender.com/api",
});

export default API;
