const express = require("express");
const app= express();
const PORT= process.env.PORT || 5000
const bodyparser= require("body-parser")
const mongoose= require("mongoose");
// const {MONGO_URL}= require("./keys");
const dotenv = require('dotenv');
const Post = require('./models/post')

const path= require("path");

//main file
dotenv.config();
//connect to DB
mongoose.connect(process.env.MONGOURI,).then(()=>{
    console.log(`successfully connected`);
    }).catch((e)=>{
    console.log(`not connected`);
    }); 

// Import routes
const postRoute = require('./routes/post');
const exp = require("constants");


//Router MIddlewares
app.use(express.static(path.join(__dirname + "/public")))
app.use(bodyparser());
app.use(express.json());
app.use('/', postRoute);

app.get("/", (req, res)=>{
    try{
        res.status(200).json({
            status: "Success"
        })

    }catch(e){
        res.status(400).json({
            status: "Bad request",
            message: e.message
        })
    }
})



app.get("*" , (req, res)=> res.status(400).json({
    status: "Bad Request",
    message: "API not found."
}))

app.listen(PORT, console.log("Server starting at port " + PORT));