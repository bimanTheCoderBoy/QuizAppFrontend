const mongoose = require('mongoose')
console.log("check fd1");
const User = new mongoose.Schema(
    {
        name: {
            type: String,
            // required: true,
        },
        email: {
            type: String,
            unique: true, 
            required: true,
            index:true
        },
        password: {
            // required: true,
            type: String,
            // select: false
            
        }
        ,
        skey:{
            // required: true,
            type: String,
           

          required:function(){
            return this.role=="student"?false : true;
        }},
        role:{
           type: String,
           enum: ['teacher', 'student'] ,
        required: true
        },
        createAt: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('User',User);