
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');
const User =require("../models/user");
const sendToken=require("../utils/sendToken");
const { ErrorHandler } = require('../utils/error')



const register=async (req,res,next)=>{

    try {
        
    
    const {name, email, password,role}=req.body;
    let user =null
    
        user = await User.findOne({email:email})
   
   
    if(user) 
    {
            next(new ErrorHandler("user aldready exits",404))
    }else{

    


    const hashedPassword=await bcrypt.hash(password,10)
    
    //skey setting
    const s_key=Math.floor(Math.random()*9000000000) + 1000000000;


  console.log(s_key);
if(role=='teacher'){
  console.log(role);
 
  user=await  User.create({name,email,password:hashedPassword,role,skey:s_key})
}else{
  user=await  User.create({name,email,password:hashedPassword,role})
}
// console.log(typeof(role)); 
  

   sendToken(res,user,"seccessfully registered");
  // res.send("asd")
}
}
  catch (error) {
    next(new ErrorHandler(error.message||"database error",404))
  }
  

}




const login= async(req,res,next)=>{
  try {
      
 
  const {email,password}=req.body;
  const user=await User.findOne({email}).select("+password").select("+skey")
  if(!user){
       next(new ErrorHandler("user does not exits",404))
  }
 var isMatched=await bcrypt.compare(password,user.password)
 
 
 if(!isMatched){
         next(new ErrorHandler("wrong password",404))
 }

if(user && isMatched){
sendToken(res,user,"login successfull")
}

} catch (error) {
  next(new ErrorHandler("database error",404))
}

}


const isAuth= async(req,res,next)=>{
  const {token} =req.cookies
  if(token){
      const decodedId= jwt.verify(token,process.env.JWT_SECRET)

     if(decodedId){
      try {
          req.user=await User.findById(decodedId);
          next()
        //   res.json({
        //     success:true,
        //     message:"ok"
        // })
      } catch (error) {

          console.log(error)
          res.json({
            success:false,
            message:"internal server isuee"
        })
      }
      
      
     }
  }
else {
  res.json({
      success:false,
      message:"user is not Authenticated"
  })}
}

module.exports={register,login,isAuth};