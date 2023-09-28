const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    username: String,
    email: String,
    title: String,
    content: String,
    like: Number,
    comments: Array,
    date: String,
    category: String,
})


const BlogModel = mongoose.model("blog", blogSchema);

module.exports={
    BlogModel
}