const express = require('express')
const router = express.Router()
<<<<<<< HEAD
const { register, login, isAuth, logout, isloggedIn } = require("../controller/AuthController")
const { createClass, getAllClass } = require("../controller/classController")
=======
const { register, login, isAuth, logout,isloggedIn } = require("../controller/AuthController")
const {createClass,getAllClass,getClass}=require("../controller/classController")
const {joinClass}=require("../controller/studentController")
>>>>>>> 5ed5af4355a296a27a670143e1d5ee74a3526b76


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
<<<<<<< HEAD
router.post("/createclass", isloggedIn, createClass)
router.get("/getallclasses", isloggedIn, getAllClass)
=======
router.post("/createclass",isloggedIn,createClass)
router.get("/getallclasses",isloggedIn,getAllClass)
router.get("/getclass/:id",isloggedIn,getClass)



//student route
router.post("/joinclass",isloggedIn,joinClass)
// console.log(joinClass)
>>>>>>> 5ed5af4355a296a27a670143e1d5ee74a3526b76

// router.patch("/uploadImage",);

module.exports = router