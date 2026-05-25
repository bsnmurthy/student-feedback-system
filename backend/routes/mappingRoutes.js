const express =
require("express");

const router =
express.Router();

const {

getMappings,
addMapping,
deleteMapping,
getStudentFaculty
}
=
require(

"../controllers/mappingController"
);


router.get(
"/",
getMappings
);

router.post(
"/",
addMapping
);

router.delete(
"/:id",
deleteMapping
);
router.get(
"/student-faculty",
getStudentFaculty
);

module.exports =
router;