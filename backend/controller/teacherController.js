const Class = require("../models/class");
const User = require("../models/user");
const { ErrorHandler } = require('../utils/error')

const joinInstitute=async(req,res,next)=>{
    const {InstituteCode}=req.body;
    const user=req.user;
   
    try {
    //getting Institute
    const InstituteObj=await User.findOne({skey:InstituteCode});

    if(InstituteObj){

    if(user._id===InstituteObj._id){
        next(new ErrorHandler("you can not join your own institute", 404))
    }
    //adding teacher To institute
     const addteacherToinstitute= await User.updateOne(
        {skey:InstituteCode},
            {$push:{
                otherteachers:[user._id]
             }});

    //adding  institute to teacher 
       const addinstituteToteacher= await User.updateOne(
            {_id:user._id},
            {$push:{
                institutes:[InstituteObj._id]
             }});
            
        if(addteacherToinstitute&&addinstituteToteacher){
            res.json({
                success:true,
                message:"Institute joined successfully"
            });
        }else{
            next(new ErrorHandler("database error", 404))
        }
    }else{
        next(new ErrorHandler("Institute does not exist", 404))
    }
    } catch (error) {
        next(new ErrorHandler(error.message || "database error", 404))
    }
   
};

module.exports={joinInstitute}


