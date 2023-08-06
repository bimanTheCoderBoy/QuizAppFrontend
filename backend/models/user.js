const mongoose = require('mongoose')
console.log("check fd1");
const User = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,

            unique: true,
            required: true


        },
        password: {
            required: true,
            type: String,
            // select: false

        }
        ,

        role: {
            type: String,
            enum: ['teacher', 'student'],
            required: true
        },
        skey: {

            type: String,
            required: function () {
                return this.role == "student" ? false : true;
            }


        },
        ownclasses:{
            type:[{type: mongoose.Schema.Types.ObjectId,}],
            required: function () {
                return this.role == "student" ? false : true;
            },
            ref:"Class"
            
        },
        otherclasses:{
            type:[{type: mongoose.Schema.Types.ObjectId,}],
            required: function () {
                return this.role == "student" ? false : true;
            },
            ref:"Class"
        },
        myclasses:{
            type:[{type: mongoose.Schema.Types.ObjectId,}],
            required: function () {
                return this.role == "teacher" ? false : true;
            },
            ref:"Class"
        },
        institutes:{
            type:[{type: mongoose.Schema.Types.ObjectId,}],
            ref:"User"
        },
        otherteachers:{
            type:[{type: mongoose.Schema.Types.ObjectId,}],
            ref:"User"
        },
        subteacherpair:{
            type:[{type:{ teacherid:mongoose.Schema.Types.ObjectId,subjectname:String}}],
            ref:"User"
        },
        createAt: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('User', User);