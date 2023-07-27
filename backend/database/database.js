const mongoose=require("mongoose");

const dbConnect = () => {


   mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME }).then(() => {
        console.log("DB connected")
    }).catch((e) => {
        console.log("db not connected for ", e)
    })
    
}
module.exports = dbConnect;