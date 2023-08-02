
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Class = require("../models/class");
const User = require("../models/user");
const sendToken = require("../utils/sendToken");
const { ErrorHandler } = require('../utils/error')

const createClass=async(req,res,next)=>{
    const {name}=req.body;
    const user=req.user;
    
    var classObj=null;
    try {
        //creating new class
        classObj =await Class.create({name});
        
        //sending new class to user
        await User.updateOne(
            {_id:user._id},
            {$push:{
                ownclasses:[classObj._id]
             }});
        


    } catch (error) {
        next(new ErrorHandler(error.message || "database error", 404))
    }
    if(classObj){
        res.json({
            success:true,
            message:" class successfully created"
        });
    }
   
}

const getAllClass=async(req,res,next)=>{
   const user=req.user;
    try {

        var ownClasses,otherClasses;
        ownClasses=await User.find({_id:user._id}).populate({path:"ownclasses",select:["name"]});

        otherClasses=await User.find({_id:user._id}).populate({path:"otherclasses",select:["name"]});


        res.json({
            success:true,
            message:"getting all classes successfully",
            ownClasses:ownClasses[0].ownclasses,
            otherClasses:otherClasses[0].otherclasses
        });
    } catch (error) {
        next(new ErrorHandler(error.message || "database error", 404))
    }
   

}
module.exports={createClass,getAllClass}


