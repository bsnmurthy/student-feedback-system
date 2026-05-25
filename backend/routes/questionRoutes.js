const express =
require("express");

const router =
express.Router();

const {

getQuestions,
addQuestion,
deleteQuestion

}
=
require(
"../controllers/questionController"
);


// GET QUESTIONS

router.get(
"/",
getQuestions
);


// ADD QUESTION

router.post(
"/add",
addQuestion
);


// DELETE QUESTION

router.delete(
"/delete/:id",
deleteQuestion
);


module.exports =
router;