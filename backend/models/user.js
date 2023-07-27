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
            // unique: true, 
            required: true

        },
        password: {
            // required: true,
            type: String,
            // select: false
        }
        ,
        type:{
            type: String,
            // required: true
        },
        
        createAt: {
            type: Date,
            default: Date.now
        }
    }
)
console.log("schema check 2");
module.exports = mongoose.model('User',User);