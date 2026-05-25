const express =
require("express");

const router =
express.Router();

const {

getSectionFaculty

}
=
require(

"../controllers/matrixController"
);


router.get(

"/section/:year/:semester/:section",

getSectionFaculty
);

module.exports =
router;