const express = require("express");
const User = require("../models/auth");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyUser = require('../middlewares/userAuth');
const JWT_SECRET = process.env.JWT_SECRET;

//creating a new user -> SignUp
router.post("/", async (req, res) => {
  try {
     const salt = await bcrypt.genSalt(10);
     const secPass = await bcrypt.hash(req.body.password,salt);
     const checkUser = await User.findOne({email : req.body.email});
     if(checkUser)
     return res.status(400).json({"error" : "User with email exists"});
     const newuser = new User({
      name : req.body.name,
      email : req.body.email,
      password : secPass  
    });
    const response = await newuser.save();
    // console.log(response)
    const data = {
      id : response._id
    }
    const token = jwt.sign(data,JWT_SECRET);
    // console.log(token);
    res.status(200).json({token});
  } catch (err) {
    res.status(400).json({ "status": "fail" });
  }
});



// User Authentication -> Login
router.post('/login',async (req,res)=>
{
    try{
       const result = await User.findOne({email:req.body.email});
       if(!result)
       return res.status(400).json({"error" : "User Doesn't exist"});
       const match = await bcrypt.compare(req.body.password, result.password);
       if(!match)
       return res.status(400).json({"error" : "check your password"}); 
      //  console.log(result)
       const data = {
        id : result._id
      }
      const token = jwt.sign(data,JWT_SECRET);
      res.status(200).json({token});
    }catch(err){
      console.log(err.message);
      res.status(500).json({"error" : "Login failed"});
    }
})


//Getting details of a User
router.get('/',verifyUser,async (req,res)=>
{
  try{
    const response = await User.findById({_id : req.id}).select("-password");
    if(!response)
    return res.status(400).json({"error" : "Couldn't find the User"});
    res.status(200).json(response);
  }catch(err){
    console.log(err.message);
    res.status(500).json({"error" : "fetching user details failed"});
  }
     
})
module.exports = router;
