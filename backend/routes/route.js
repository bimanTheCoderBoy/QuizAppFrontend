const express = require('express')
const router = express.Router()
const { register, login, isAuth, logout,isloggedIn } = require("../controller/AuthController")
const {createClass,getAllClass}=require("../controller/classController")


router.get("/", (req, res) => {
    console.log("asd");
    res.send("fghjkl");
});
//login auths
router.post("/register", register);
router.post("/login", login);
router.get("/isauth", isAuth);
router.delete("/logout", logout);
//login auths end


//class apis
router.post("/createclass",isloggedIn,createClass)
router.get("/getallclasses",isloggedIn,getAllClass)

module.exports = router