const Class = require("../models/class");
const User = require("../models/user");


//Get User Profile
const getProfile = (req, res, next) => {
    const user = req.user;
    //Check if teacher or student
    if (user.role === "student") {
        res.json({
            success: true,
            message: "getting user data successfully",
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        })
    }
    else {
        res.json({
            success: true,
            message: "getting user data successfully",
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            skey: user.skey,
            otherteachers: user.otherteachers,
            institutes: user.institutes
        });
    }
}

module.exports = { getProfile };
