const Class = require("../models/class");
const User = require("../models/user");
const { ErrorHandler } = require('../utils/error')

const joinClass=async(req,res,next)=>{
    const {classCode}=req.body;
    const user=req.user;
   
    try {
    //getting class
    const classObj=await Class.findOne({classcode:classCode});
    if(classObj){

    
    //adding user to the class
     const addstu= await Class.updateOne(
            {classcode:classCode},
            {$push:{
                students:[user._id]
             }});

    //adding class to user
       const addcls= await User.updateOne(
            {_id:user._id},
            {$push:{
                myclasses:[classObj._id]
             }});
            
        if(addstu&&addcls){
            res.json({
                success:true,
                message:" class successfully joined"
            });
        }else{
            next(new ErrorHandler("database error", 404))
        }
    }else{
        next(new ErrorHandler("class does not exist", 404))
    }
    } catch (error) {
        next(new ErrorHandler(error.message || "database error", 404))
    }
   
};

module.exports={joinClass}


