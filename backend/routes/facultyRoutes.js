const express =
require("express");

const router =
express.Router();

const {

getFaculty,
addFaculty,
deleteFaculty

}
=
require(

"../controllers/facultyController"
);


router.get(
"/",
getFaculty
);

router.post(
"/",
addFaculty
);

router.delete(
"/:id",
deleteFaculty
);


module.exports =
router;