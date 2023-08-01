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
            required: true


        },
        password: {
            // required: true,
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
        createAt: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('User', User);