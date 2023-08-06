const mongoose = require("mongoose");
const ClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    classcode: {
        type: String,
        unique: true,
        //    default:function(){
        //     return  Math.floor(Math.random() * 9000000000) + 1000000000;
        //    } 
    },
    students: {
        type: [{ type: mongoose.Schema.Types.ObjectId, }],

        ref: "User"
    },
    teachers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, }],

        ref: "User"
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
    },
    subteacherpair:{

        type:[{type:{
             teacherid:mongoose.Schema.Types.ObjectId
             ,subjectname:String,
            }}],
        // ref:"User"
    },

});



module.exports = mongoose.model("Class", ClassSchema);