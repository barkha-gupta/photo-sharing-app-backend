const express= require("express");
const router= express.Router();
const mongoose= require('mongoose');
const Post = mongoose.model("Post");
const bodyparser= require("body-parser");

router.use(bodyparser());

router.get("/insta", async(req, res)=>{
    try{
        //fetching all the posts
        const posts = await Post.find().sort("-createdAt");
        res.status(200).json({
            posts
        })
    }
    catch(e){
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.post("/createpost", async(req, res)=>{
    try{
        const {photo, author, location, description} = req.body; 
        if(!author || !location){
            return res.status(400).json({
                status: "Failed",
                message: "Pease input fields"
            })
        }
        const post = await Post.create({
            photo,
            author,
            location,
            description
        });
        res.status(200).json({
            status: "ok",
            post
        })

    }
    catch(e){
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
    
})

module.exports= router;