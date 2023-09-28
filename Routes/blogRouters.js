const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { BlogModel } = require("../model/blogModel");


const blogRouter = express.Router();

blogRouter.use(auth);
blogRouter.get("/",async (req, res)=>{
    try {
        let blogs = await BlogModel.find();
        res.send({issue: false, blogs: blogs})
    } catch (error) {
        res.send({issue: true, msg: error.message});
    }
})

blogRouter.post("/",async (req, res)=>{
    try {
        let obj = {
            ...req.body,
            date: new Date().toLocaleDateString(),
            like: 0,
            comments: {}
        }
        let blog = new BlogModel(obj);
        await blog.save();
        res.send({issue: false, msg: "posted successfully", blog: blog});
    } catch (error) {
        res.send({issue: true, msg: error.message});
    }
})

blogRouter.patch("/:id",async (req, res)=>{
    const {id} = req.params;
    try {
        let blog = await BlogModel.findByIdAndUpdate(id, req.body);
        res.send({issue: false, blogs: blog})
    } catch (error) {
        res.send({issue: true, msg: error.message});
    }
})

blogRouter.delete("/:id",async (req, res)=>{
    const {id} = req.params;
    try {
        let blog = await BlogModel.findByIdAndDelete(id);
        res.send({issue: false, blogs: blog})
    } catch (error) {
        res.send({issue: true, msg: error.message});
    }
})

blogRouter.patch("/:id/comment",async (req, res)=>{
    const {id} = req.params;
    try {
        let blog = await BlogModel.findByIdAndUpdate(id, req.body);
        res.send({issue: false, blogs: blog})
    } catch (error) {
        res.send({issue: true, msg: error.message});
    }
})

blogRouter.patch("/:id/like",async (req, res)=>{
    const {id} = req.params;
    try {
        let blog = await BlogModel.findByIdAndUpdate(id, req.body);
        res.send({issue: false, blogs: blog})
    } catch (error) {
        res.send({issue: true, msg: error.message});
    }
})
module.exports ={
    blogRouter
}