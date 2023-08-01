const express = require("express");
const app = express();

const cookie_parser = require("cookie-parser");
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: path.resolve(__dirname, "./config.env") })


const router = require("./routes/route.js")


//db connect
const dbconect = require("./database/database.js")
dbconect();

//error middle ware
const { errorMiddleware } = require("./utils/error.js")
//middle wares
app.use(express.json());
app.use(cookie_parser());

<<<<<<< HEAD
app.use('/api/v1', router);
=======
app.use('/api/v1',router);
>>>>>>> 1cabc6c1f82726efc9c01c73f4de3c8499067217
app.use(errorMiddleware);




const port = process.env.PORT || 3000;
//listening server
app.listen(port, () => {
    console.log("server is listening at port " + port)
});
