const express =
require("express");

const router =
express.Router();

const {

submitMatrixFeedback

}
=
require(

"../controllers/matrixFeedbackController"
);


router.post(
"/submit",
submitMatrixFeedback
);

module.exports =
router;