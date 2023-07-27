const express =require('express')
const router=express.Router()



router.get("",(req, res)=>{
    console.log("asd");
    res.send("fghjkl");
});
 
module.exports =router