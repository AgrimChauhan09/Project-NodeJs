const express = require('express');
const cors=require("cors");
require('./db/config');
const User = require('./db/user'); 
const { request } = require('http');
const app = express(); 

app.use(express.json());
app.use(cors());
 
app.post('/register', async (req, res) => {
 
        let user = new User(req.body); 
        let result = await user.save(); 


        result=result.toObject();
        delete result.password 

        
        // res.send(req.body);
        res.send(result);

        // res.send("helooo"); 
}); 

app.post("/login",async (req,res)=>{
        console.log(req.body)
        if(req.body.password && req.body.email){

        let user= await User.findOne(req.body).select("-password");
        if(user){

                res.send(user)
        }else{
                res.send({result:"no user found"})
           }

        }else{
                res.send({result:"no user found"})
        }
})

app.listen(5000);
