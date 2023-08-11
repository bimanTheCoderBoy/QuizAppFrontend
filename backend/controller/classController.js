const Class = require("../models/class");
const User = require("../models/user");
const { ErrorHandler } = require('../utils/error')

const createClass = async (req, res, next) => {
    const { name } = req.body;
    const user = req.user;

    var classObj = null;
    try {
        //creating new class
        classObj = await Class.create({ name, classcode: Math.floor(Math.random() * 9000000000) + 1000000000 });

        // classObj = await Class.create({ name, classcode: Math.floor(Math.random() * 9000000000) + 1000000000 });

        //sending new class to user
        const ownclassesupdate = await User.updateOne(
            { _id: user._id },
            {
                $push: {
                    ownclasses: [classObj._id]
                }
            });
        //class admin 
        const classadmin = await Class.updateOne(
            { _id: classObj._id },
            { admin: user._id }
        )
        if (!(ownclassesupdate && classadmin)) {
            next(new ErrorHandler("database error", 404))
        }


    } catch (error) {
        next(new ErrorHandler(error.message || "database error", 404))
    }
    if (classObj) {
        res.json({
            success: true,
            message: " class successfully created"
        });
    }

}



const getAllClass = async (req, res, next) => {
    const user = req.user;
    try {


        const userData = await User.findOne({ _id: user._id }).populate({ path: "ownclasses", select: ["name", "admin"] }).populate({ path: "otherclasses", select: ["name", "admin"] });

        // otherClasses = await User.find({ _id: user._id }).populate({ path: "otherclasses", select: ["name"] });


        res.json({
            success: true,
            message: "getting all classes successfully",
            ownClasses: userData.ownclasses,
            otherClasses: userData.otherclasses,
            userName: user.name,
            role: user.role,
        });
    } catch (error) {
        next(new ErrorHandler(error.message || "database error", 404))
    }


}

const getClass = async (req, res, next) => {
    const id = req.params.id;
    try {
        var classData = await Class.findOne({ _id: id });

        const data = await Promise.all(classData.subteacherpair.map(async (e) => {
            const teacher = await User.findById(e.teacherid)
            return {
                teacherName: teacher.name,
                subjectName: e.subjectname
            }
        }));

        if (classData) {

            res.json({
                success: true,
                message: "getting class successfully",
                classData,
                subteacherarray: data,
                isAdmin: req.user._id === classData.admin
            });

        } else {
            next(new ErrorHandler("Class not found", 404))
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message || "class not found",
        });
    }
}


const createSubject = async (req, res, next) => {
    //getting classid from params
    const { classid } = req.params;
    try {
        const classobj = await Class.findById(classid)
        if (classobj) {
            const subjectname = req.body.subjectname;

            const subject = await Class.updateOne(
                { _id: classid },
                {
                    $push: {
                        subjects: [subjectname]
                    }
                });
            if (subject) {
                res.json({
                    success: true,
                    message: "subject successfully created"
                });
            } else {
                next(new ErrorHandler("database error", 404))
            }
        } else {
            next(new ErrorHandler("class does not exist", 404))
        }
    } catch (error) {
        next(new ErrorHandler("database error", 404))
    }
}

const getAllSubjects = async (req, res, next) => {
    const { classid } = req.params;
    try {
        const classobj = await Class.findById(classid)
        if (classobj) {
            const subjects = classobj.subjects;
            res.json({
                success: true,
                message: "subjects successfully fetched",
                subjects
            });
        } else {
            next(new ErrorHandler("class does not exist", 404))
        }
    } catch (error) {
        next(new ErrorHandler("database error", 404))
    }
}

const getAllTeachers = async (req, res, next) => {
    const instituteid = req.user._id;

    try {
        const userData = await User.findById(instituteid).populate({ path: "otherteachers", select: ["name"] })
        // console.log(teachers)
        if (userData) {

            var teachers = userData.otherteachers
            teachers = [...teachers, { _id: instituteid, name: req.user.name }]
            res.json({
                success: true,
                message: "teachers successfully fetched",
                teachers
            });
        } else {
            next(new ErrorHandler("class or teachers does not exist", 404))
        }
    } catch (error) {
        next(new ErrorHandler(error.message || "database error", 404))
    }
}
//delete section
const deleteSubTeacherPair=async(req,res,next)=>{
   const {classid}= req.params
   const {teacherid}=req.body
   try {
    const updatePair=await Class.updateOne({_id:classid},{$pull:{subteacherpair:{teacherid:teacherid}}})
    const updateTeacher= await User.updateOne({_id:teacherid},{$pull:{otherclasses:classid}})
 
     if(updatePair&&updateTeacher){
         res.json({
             success: true,
             message: "subject successfully deleted"
         });
     }
     else{
         next(new ErrorHandler("database error", 404))
     }
   } catch (error) {
    next(new ErrorHandler(error.message, 404))
   }
  
}

const deleteClass=async(req,res,next)=>{
    const {classid}= req.params
    // const {}
    const user=req.user;
    user.password
    try {
        const classData=await Class.findByIdAndDelete(classid);
        if(classData){
            res.json({
                success: true,
                message: "class successfully deleted"
            });
        }
        else{
            next(new ErrorHandler("database error", 404))
        }
    } catch (error) {
        next(new ErrorHandler(error.message, 404))
    }



}
module.exports = { createClass, getAllClass, getClass, createSubject, getAllSubjects, getAllTeachers,deleteSubTeacherPair,deleteClass }


