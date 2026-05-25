const express =
require("express");

const router =
express.Router();

const {

downloadReport

}
=
require(

"../controllers/reportController"
);

const {

downloadFacultyReport

}
=
require(

"../controllers/facultyReportController"
);


// MAIN REPORT

router.get(

"/download",

downloadReport
);


// FACULTY REPORT

router.get(

"/faculty/:faculty_id",

downloadFacultyReport
);


module.exports =
router;