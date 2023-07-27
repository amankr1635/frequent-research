const express = require("express")
const { createUser,getAllUser,createCountry,createState,createCity ,getState,getCity,getCountry} = require("../controllers/userController")
const router =express.Router()


router.post("/createUser",createUser)
router.get("/getAllUsers",getAllUser)
router.post("/createCountry",createCountry);
router.post("/createState",createState);
router.post("/createCity",createCity);
router.get("/getCountry", getCountry)
router.get("/getState/:country", getState);
router.get("/getCity/:state", getCity);

router.all("/*", (req, res) => {
    res.status(400).send({ status: false, message: "invalid HTTP request" })
})





module.exports = router