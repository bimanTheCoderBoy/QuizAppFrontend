const express =require('express')
const router=express.Router()
const {register,login,isAuth}=require("../controller/loginController")


router.get("",(req, res)=>{
    console.log("asd");
    res.send("fghjkl");
});
router.post("/register",register);
router.post("/login",login);
router.get("/isauth",isAuth);
module.exports =router