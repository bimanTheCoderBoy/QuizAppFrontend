const mongoose = require('mongoose')
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
            select: false
        }
        ,
        role:{
           type: String,
           enum: ['teacher', 'student'] ,
        required: true
        },
        skey:{
            required: true,
            type: String,
            
            
        },
        createAt: {
            type: Date,
            default: Date.now
        }
    }
)
module.exports = mongoose.model('User',User);