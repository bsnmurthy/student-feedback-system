const express =
require("express");

const router =
express.Router();

const {

getSettings,
updateSettings

}
=
require(

"../controllers/settingsController"
);



// GET

router.get(
"/",
getSettings
);


// UPDATE

router.put(
"/",
updateSettings
);


module.exports =
router;