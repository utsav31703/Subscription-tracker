import mongoose from "mongoose"
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import { JWT_SECRET,JWT_EXPIRES_IN } from "../config/env.js";

export const signUp=async(req,res,next)=>{
    const session=await mongoose.startSession();
    session.startTransaction();
    let transactionCommitted = false;
    try{
        //Create a new User
        const {name, email,password}=req.body;
         
        //check if a user already exits
        const exisitingUser= await User.findOne({email})

        if(exisitingUser){
            const error=new Error('User already exists')
            error.status=409;
            throw error;
        }
        //Hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt)

        const newUser=await User.create([{name,email,password:hashedPassword}],{session});

        const token=jwt.sign({userId:newUser[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})

        await session.commitTransaction();
        transactionCommitted = true;
        session.endSession();

        res.status(201).json({
        success: true,
        message: "User created Successfully",
        data: {
          token,
          user: newUser[0]
        }
      });
    } catch (error) {
      if (!transactionCommitted) {
        await session.abortTransaction();
      }
      session.endSession();
      next(error);
    }
}
export const signIn=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
            const error=new Error("User not found")
            error.statusCode=404;
            throw error
        }
        const isPasswordVaild=await bcrypt.compare(password,user.password);

        if(!isPasswordVaild){
            const error=new Error("Invalid password")
            error.statusCode=401;
            throw error
        }

        const token =jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})
        res.status(200).json({
            success:true,
            message:"User sign In successfully",
            data:{
                token,
                user,
            }
        })
    } catch (error) {
        next(error);    
    }
}
export const signOut = async (req, res, next) => {
  try {
    // Placeholder logic
    res.status(200).json({
      success: true,
      message: "User signed out successfully",
    });
  } catch (error) {
    next(error);
  }
};

