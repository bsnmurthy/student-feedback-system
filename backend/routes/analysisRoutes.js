const express =
require("express");

const router =
express.Router();

const {

getFacultyAnalysis,
getQuestionAnalysis,
getFacultyDetailReport

}
=
require(

"../controllers/analysisController"
);


// FACULTY ANALYSIS

router.get(

"/faculty",

getFacultyAnalysis
);


// QUESTION ANALYSIS

router.get(

"/questions",

getQuestionAnalysis
);


// FACULTY DETAIL REPORT

router.get(

"/faculty/:faculty_id",

getFacultyDetailReport
);


module.exports =
router;