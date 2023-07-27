const express = require('express')
const router = express.Router()
const { register } = require("../controller/AuthController")


router.get("/", (req, res) => {
    console.log("asd");
    res.send("fghjkl");
});
router.post("/register", register);

module.exports = router