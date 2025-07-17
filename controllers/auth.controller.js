import mongoose from "mongoose"
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import { JWT_SECRET,JWT_EXPIRES_IN } from "../config/env";

const signUp=async(req,res,next)=>{
    const session=await mongoose.startSession();
    session.startTransaction();

    try{
        //Create a new User
        const {name, email,password}=req.body;
         
        //check if a user already exits
        const exisitingUser= await User.findOne({email})

        if(exisitingUser){
            const error=new Error('User already exists')
            error.statusCode=409;
            throw error;
        }
        //Hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt)

        const newUser=await User.create([{name,email,password:hashedPassword}],{session});

        const token=jwt.sign({userId:newUser[0]._id},JWT_SECRET,{JWT_EXPIRES_IN})

        await session.commitTransaction();
        session.endSession();

        res.statusCode(201).json({
            success:true,
            message:"User created Successfully",
            data:{
                token,
                user:newUser[0]
            }
        })
    } catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error)
    }
}
// export const signIn=async(req,res,next)=>{

// }
// export const signOut=async(req,res,next)=>{

// }
export { signUp };