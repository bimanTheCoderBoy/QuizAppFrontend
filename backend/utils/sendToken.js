const jwt = require("jsonwebtoken")
const sendToken = (res, user, message) => {

    console.log(user)
    // const seky=

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    console.log(token);
    return res.cookie("token", token, { maxage: 60 * 60 * 1000 * 60 }).json({
        success: true,
        message: message,
        skey: user.skey
    })
}

module.exports = sendToken;