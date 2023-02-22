const User = require("../models/userModel")
const asyncHandler=require('express-async-handler');
const generateToken = require("../config/generateToken")

const registerUser = asyncHandler(async(req,res)=>{
    const {loginid,password} = req.body;

    if(!loginid||!password){
          res.status(400)
        throw new Error("Please enter all the Fields")
    }

    const user =await User.create({
        loginid,password
    });

    if(user){
        res.status(201).json(
        {   _id: user._id,
            login:user.loginid,
            token:generateToken(user._id)
            
        })
    }
    else{
        res.status(400)
        throw new Error("Failed to create user")
    } 
});


const allUsers=asyncHandler(async(req,res)=>{
        const keyword=req.query.search
        ? {
            $or:[

            {loginid:{$regex:req.query.search, $options:'i'}},
            {password:{$regex:req.query.search,$options:'i'}}
        ]}:{};

        const users=await User.find(keyword).find({_id:{$ne:req.user._id}})
        res.send(users)
    })

module.exports={registerUser,allUsers};

