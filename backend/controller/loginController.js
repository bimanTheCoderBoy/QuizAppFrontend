



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