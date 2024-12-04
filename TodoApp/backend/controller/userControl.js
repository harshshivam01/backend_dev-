const user = require('../models/userModel');
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');

const JWT_SECRET = 'harshsh';

const registerUser= async(req,res)=>{
    try{
        const {fullname,username,email,password} = req.body;
        const existingUser = await user.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({
                status: "error",
                message: "User already exists with this email or username"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await user.create({
            name: fullname,
            username,
            email,
            password: hashedPassword
        });
        const token =jwt.sign(
          {  userId: newUser._id,
            username:newUser.username},
            JWT_SECRET,
            {expiresIn:"72h"}
        
        );
        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            token
        });
    }catch(error){
        console.error('Registration error:', error);
        res.status(500).json({
            status: "error",
            message: "Failed to register user",
            error: error.message
        });
    }
};

const loginUser= async(req,res)=>{
    try{
        const {username,password}=req.body;
        const existingUser = await user.findOne({username});
        if(!existingUser) {
            return res.status(400).json({
                status: "error",
                message: "Invalid credentials"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid) {
            return res.status(400).json({
                status: "error",
                message: "Invalid credentials"
            });
        }
        const token = jwt.sign(
            { userId: existingUser._id, username: existingUser.username },
            JWT_SECRET,
            { expiresIn: '72h' }
        );
        res.status(200).json({
            status: "success",
            message: "Login successful",
            token
        });

    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Failed to login user",
            error: error.message
        });
    }
};

module.exports={
    registerUser,
    loginUser
};


