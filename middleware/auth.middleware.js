const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next)=>{
    const token = req.headers.auth;
    if(token){
        jwt.verify(token, process.env.VERIFY_KEY, (err, decoded)=>{
            if(err) return err;
            req.body = {
                ...req.body,
                email: decoded.email,
                username: decoded.username
            }
            next();
        });
     
    }else{
        res.send({issue: true, msg: "token not found, login again..."})
    }
}
module.exports ={
    auth
}