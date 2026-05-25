const express =
require("express");

const router =
express.Router();

const {


registerStudent,

loginStudent,

getStudentFaculty,

resetPassword

}
=
require(

"../controllers/studentController"
);


// REGISTER

router.post(

"/register",

registerStudent
);


// LOGIN

router.post(

"/login",

loginStudent
);

router.post(
"/reset-password",
resetPassword
);

module.exports =
router;