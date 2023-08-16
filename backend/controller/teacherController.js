const Class = require("../models/class");
const User = require("../models/user");
const { ErrorHandler } = require('../utils/error')

const getTeacherProfile = (req, res, next) => {
    console.log("get teacher");
    const user = req.user;

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

const joinInstitute = async (req, res, next) => {
    const { InstituteCode } = req.body;
    const user = req.user;

    try {

        //getting Institute
        const InstituteObj = await User.findOne({ skey: InstituteCode });
        // const int_id = (InstituteObj._id)
        // const user_id = (user._id)
        // console.log(int_id.equals(user_id));    
        if (InstituteObj) {
            if (user._id.equals(InstituteObj._id)) {
                next(new ErrorHandler("You Cannot Join Your Own Institute", 404))
            }
            if (user.institutes.includes(InstituteObj._id)) {
                next(new ErrorHandler("Already Joined", 404))
            }
            //adding teacher To institute
            const addteacherToinstitute = await User.updateOne(
                { skey: InstituteCode },
                {
                    $push: {
                        otherteachers: [user._id]
                    }
                });

            //adding  institute to teacher 
            const addinstituteToteacher = await User.updateOne(
                { _id: user._id },
                {
                    $push: {
                        institutes: [InstituteObj._id]
                    }
                });

            if (addteacherToinstitute && addinstituteToteacher) {
                res.json({
                    success: true,
                    message: "Institute joined successfully"
                });
            } else {
                next(new ErrorHandler("database error", 404))
            }
        } else {
            next(new ErrorHandler("Institute does not exist", 404))
        }
    } catch (error) {
        next(new ErrorHandler(error.message || "database error", 404))
    }

};


const teacherJoinClass = async (req, res, next) => {
    const { classid } = req.params;

    const user_id = req.body.userid;
    const subject_name = req.body.subjectname;

    try {
        //getting class
        const classObj = await Class.findOne({ _id: classid });
        if (classObj) {


            //adding user to the class
            const addstu = await Class.updateOne(
                { _id: classid },
                {
                    $push: {
                        subteacherpair: [{ subjectname: subject_name, teacherid: user_id }]
                    }
                });

            //adding class to user
            const addcls = await User.updateOne(
                { _id: user_id },
                {
                    $push: {
                        otherclasses: [classObj._id]
                    }
                });

            if (addstu && addcls) {
                res.json({
                    success: true,
                    message: " class successfully joined"
                });
            } else {
                next(new ErrorHandler("database error", 404))
            }
        } else {
            next(new ErrorHandler("class does not exist", 404))
        }
    } catch (error) {
        next(new ErrorHandler(error.message || "database error", 404))
    }

};

module.exports = { joinInstitute, teacherJoinClass, getTeacherProfile }


