const speakeasy = require('speakeasy');
const express = require('express');
const jwt = require('jsonwebtoken');
const bp = require('body-parser');
const {user}  = require('./db')
const cors = require('cors');
const {GenSecret} = require('./middleware')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bp.urlencoded({extended:true}));
app.use(express.json());

const jwtSecret = process.env.JWT_SECRET;

app.post('/signin', async(req, res)=>{
    const data  = req.body;
    console.log(data);
     const token = await jwt.sign({
        username: data.username
     }, jwtSecret);
    try{
       const exist = await user.findOne({
         username: data.username,
       });
      if(!exist){
         await user.create({
            username : data.username,
            password : data.password,
         });
         res.status(200).json({
            msg : "User Created Successfully 🎉",
            enabled: false,
            token:token
            
         })
      }
      else{
        const person = await user.findOne({
            username : data.username,
            password : data.password
        })
        if(!person){
            res.status(400).json({
                msg: "Invalid Details",
                enabled : false
            })
        }
        else{
            res.status(200).json({
                msg : "Signed in Successfully 🎉",
                enabled : person.enabled, 
                token:token
            })
        }
      }
       
    }
    catch(e){
     console.log("Error while checking username");
    }
    
});

app.get('/api/enable/totp', GenSecret, async(req, res)=>{
    const secret = await speakeasy.generateSecret();
    const username = req.username;
    try{
      await user.updateOne({
        username : username,
      },
    {
        $set:{
            secret:secret.base32
        }
    })
    res.status(200).json({
        msg :"Secret Created",
        detail: secret
    })
    }
    catch(e){
        console.log(e)
      res.status(400).json({
        msg : "Error while creating secret"
      })
    }

})

app.post('/api/verify/totp', GenSecret, async(req,res)=>{
    console.log(req.body, req.username);
    const username = req.username;
    const data=req.body;
    const userDetails = await user.findOne({
        username :username
    })
    const secret = userDetails.secret;
    const verified = await speakeasy.totp.verify({
        secret:secret,
        encoding : "base32",
        token : data.token
    })
    if(verified){
        // await user.updateOne({
        //     username: data.username
        // })
        await user.updateOne({
            username:username,
        },
        {
            $set:{
                enabled:true
            }
        })
        res.status(200).json({
            msg: "That's Correct 🎉",
        })
    }
    else{
        res.status(401).json({
            msg : "Invalid token"
        })
    }
})


app.get('/forget', GenSecret, async(req,res)=>{
     const username = req.username;
     try{
      await user.updateOne({
        username:username,
      },
    {
        $set:{
            enabled:false,
        }
    })
     res.status(200).json({
        msg : "Please login again and Scan QR again",
     })
     }
     catch(e){
        res.status(400).json({
            msg : "Something went wrong"
        })
     }
})

app.listen(3000, ()=>{
    console.log("Server Started at 3000");
})

