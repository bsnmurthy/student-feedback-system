import axios from "axios";

const API =
axios.create({

baseURL:
"https://student-feedback-api.onrender.com/api",
});

export default API;