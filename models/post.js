const mongoose= require("mongoose");
const postSchema = new mongoose.Schema({
    photo: {
        type: String,
        // default: "no photo"
    },
    author: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: String
},{timestamps:true})

module.exports= mongoose.model("Post", postSchema);