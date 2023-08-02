const express = require('express')
const router = express.Router()
const { register, login, isAuth, logout } = require("../controller/AuthController")


router.get("/", (req, res) => {
    console.log("asd");
    res.send("fghjkl");
});
router.post("/register", register);
router.post("/login", login);
router.get("/isauth", isAuth);
router.delete("/logout", logout);

// router.patch("/uploadImage",);

module.exports = router