const express =
require("express");

const router =
express.Router();

const {

registerStudent,
loginStudent,
getStudentFaculty

}
=
require(
"../controllers/studentController"
);


router.post(
"/register",
registerStudent
);

router.post(
"/login",
loginStudent
);

router.get(
"/faculty",
getStudentFaculty
);

module.exports =
router;