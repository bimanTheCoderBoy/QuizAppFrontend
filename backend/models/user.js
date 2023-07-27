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
        type:{
            type: String,
            required: true
        },
        skey:{
            type: String,
            unique: true,
            default:121
        },
        createAt: {
            type: Date,
            default: Date.now
        }
    }
)
module.exports = mongoose.model('User',User);