const express = require('express');
const cors = require("cors");
const { connectToDB } = require('./db');
const { UserModel } = require('./model/userModel');
const jwt = require("jsonwebtoken");
const { blogRouter } = require('./Routes/blogRouters');
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send("welcome to Blog Press!")
})
app.use("/blogs", blogRouter);

app.post("/register", async(req, res)=>{
    const {email} = req.body;
    try {
        let existUser = await UserModel.findOne({email: email});
        if(existUser !== null){
            res.send({issue: true, msg: "User Already Exits"});
        }else{
            bcrypt.hash(req.body.password, 5, async (err, hash)=>{
                if(err){
                    return err;
                }
                let obj = {
                    ...req.body,
                    password: hash
                }
                let user = new UserModel(obj);
                await user.save();
                res.send({issue: false, msg: "registered Successfully!"})
            })
          
        }
    } catch (error) {
        res.send({issue: true, msg: error.message});
        
    }
})

app.post("/login", async(req, res)=>{
    const {email} = req.body;
    try {
        let existUser = await UserModel.findOne({email});

        if(existUser !== null){
            bcrypt.compare(req.body.password, existUser.password,  (err, result)=>{
                if(err) return err;
                if(result){
                    const token  =  jwt.sign({username: existUser.username, email: existUser.email }, process.env.VERIFY_KEY);
                    res.send({issue: false, msg: "registered Successfully!", token: token, email: existUser.email, username: existUser.username})
                }else{
                    res.send({issue: true, msg: "something is wrong..."})
                }
             
            })
        }else{
            res.send({issue: true, msg: "User Doesn't Exits"});
        }
    } catch (error) {
        res.send({issue: true, msg: error.message});
        
    }
})


app.listen(8080, async ()=>{
    try {
        await connectToDB;
        console.log("server is running...");
    } catch (error) {
        throw new Error(error);
    }
})