
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const sendToken = require("../utils/sendToken");
const { ErrorHandler } = require('../utils/error')



const register = async (req, res, next) => {

  try {


    const { name, email, password, type } = req.body;
    let user = null;

    // user = await User.findOne({ email: email });


    // if (user) {
    //   next(new ErrorHandler("user aldready exits", 404));
    // }
    // console.log(req.body);


    // const hashedPassword = await bcrypt.hash(password, 10);


console.log("check 1");
    const newUser = await User.create({ name, email, password, type });
console.log("check 2");
    sendToken(res, newUser, "seccessfully registered");

  }
  catch (error) {
    // next(new ErrorHandler("database error", 404))
    res.send(error)
  }


}



const login = async (req, res, next) => {

  try {


    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      next(new ErrorHandler("user does not exits", 404))
    }
    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
      next(new ErrorHandler("wrong password", 404))
    }


    sendToken(res, user, "login successfull")
  } catch (error) {

    console.log('Error in Login', error)
    next(new ErrorHandler("database error", 404))
  }


}





const isAuth = async (req, res, next) => {
  const { token } = req.cookies
  if (token) {
    const decodedId = jwt.verify(token, process.env.JWT_SECRET)

    if (decodedId) {
      try {
        req.user = await User.findById(decodedId);
        next()
        //   res.json({
        //     success:true,
        //     message:"ok"
        // })
      } catch (error) {

        console.log(error)
        res.json({
          success: false,
          message: "internal server isuee"
        })
      }


    }
  }
  else {
    res.json({
      success: false,
      message: "user is not Authenticated"
    })
  }
}

module.exports = { register, login, isAuth };

