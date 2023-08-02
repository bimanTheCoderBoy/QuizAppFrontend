const mongoose=require("mongoose");
const ClassSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    classCode:{
       type:String,
       unique:true,
       default:function(){
        return  Math.floor(Math.random() * 9000000000) + 1000000000;
       } 
    },

});



module.exports=mongoose.model("Class",ClassSchema);