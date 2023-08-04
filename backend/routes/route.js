const express = require('express')
const router = express.Router()
const { register, login, isAuth, logout,isloggedIn } = require("../controller/AuthController")
const {createClass,getAllClass,getClass}=require("../controller/classController")
const {joinClass}=require("../controller/studentController")


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

router.post("/createclass", isloggedIn, createClass)
router.get("/getallclasses", isloggedIn, getAllClass)

router.post("/createclass",isloggedIn,createClass)
router.get("/getallclasses",isloggedIn,getAllClass)
router.get("/getclass/:id",isloggedIn,getClass)



//student route
router.post("/joinclass",isloggedIn,joinClass)
// console.log(joinClass)


// router.patch("/uploadImage",);

module.exports = router