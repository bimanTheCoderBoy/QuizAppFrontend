
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');
const User =require("../models/user");
const sendToken=require("../utils/sendToken");
const { ErrorHandler } = require('../utils/error')



const register=async (req,res,next)=>{

    try {
        
    
    const {name, email, password,type}=req.body;
    let user =null
    
        user = await User.findOne({email:email})
   
   
    if(user) 
    {
            next(new ErrorHandler("user aldready exits",404))
    }


    const hashedPassword=await bcrypt.hash(password,10)
    


  user=await  User.create({name,email,password:hashedPassword,type})

  sendToken(res,user,"seccessfully registered");
  
}
  catch (error) {
    next(new ErrorHandler("database error",404))
  }
  

}


const login= async(req,res,next)=>{
  try {
      
 
  const {email,password}=req.body;
  const user=await User.findOne({email}).select("+password")
  if(!user){
       next(new ErrorHandler("user does not exits",404))
  }
 const isMatched=await bcrypt.compare(password,user.password)
 if(!isMatched){
  next(new ErrorHandler("wrong password",404))
 }


sendToken(res,user,"login successfull")
} catch (error) {
  next(new ErrorHandler("database error",404))
}

}

module.exports={register};