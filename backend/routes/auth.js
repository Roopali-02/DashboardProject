const express =require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();


const User = require('../models/User');

router.post('/signup',async(request,response)=>{
  const {username,email,password,role} = request.body;
  try{
  const userExists = await User.findOne({email});
  if(userExists){
  return response.status(400).json({message:'User with this email id already exists'});
  }
  const newUser = new User({username,email,password,role});
  await newUser.save();
  response.status(201).json({message:'Signup successful! You will be now redirected to Login page.'});
  }catch(err){
    response.status(500).json({ message: 'Internal server error, please try again later' });
  }
})

router.post('/login',async(request,response)=>{
  const {email,password} = request.body;
  try{
    const user = await User.findOne({email});
    if(!user){
      return response.status(400).json({message:'Invalid email! Please try again.'});
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if (!isPasswordValid) {
      return response.status(400).json({ message: 'Invalid password.' });
    }
    if (!process.env.JWT_SECRET) {
      return response.status(500).json({ message: 'Internal server error: JWT_SECRET is not set.' });
    }
    const payload = {
      userId:user._id,
      username:user.username,
      email:user.email,
      role:user.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:'7d'});
    response.status(200).json({token,message:'Login successful! You will be redirected to your dashboard.',user:payload});
 
  }catch(err){
    console.log(err);
    response.status(500).json({ message: 'An internal server error occurred.'});
  }
})

router.get('/users',async(request,response)=>{
  try{
    const users = await User.find();
    console.log(users);
    response.status(200).json({message:'Users fetched successfully!',users});
  }catch(err){
     response.status(500).json({message:err});
  }
})

router.delete('/:id',async(request,response)=>{
  try{
   await User.findByIdAndDelete(request.params.id);
   return response.status(200).json({message:'User deleted successfully!'});
  }catch(err){
    response.status(500).json({message:err});
  }
})

module.exports = router;