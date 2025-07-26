import bcrypt from "bcryptjs";  
import User from "../models/user.model.js";

export const getUsers=async(req,res,next)=>{
    try{
        const users= await User.find()

        res.status(200).json({success:true,data:users})
    } catch(error){
        next(error)
    }
}
export const getUser=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id).select('-password')

        if(!user){
            const error=new Error("No user found")
            error.statusCode=404;
            throw error
        }

        res.status(200).json({success:true,data:user})
    } catch(error){
        next(error)
    }
}
export const updateUser=async (req,res,next)=>{
    try{
        const {id}=req.params;
        const updateData=req.body;

        if(updateData.password){
            delete updateData.password;
        }
        const updatedUser=await User.findByIdAndUpdate(
            id,
            {
                $set:updateData
            },
            {
                new: true,
                runValidators:true
            }
        ).select('-password');

        if(!updatedUser){
            const error=new Error("No user found");
            error.statusCode=404;
            throw error
        }
        res.status(200).json({
            success:true,
            message:"User updated successfully",
            data:updatedUser
        })
    } catch(error){
        if(error.name === 'ValidationError'){
            const ValidationErrors=Object.values(error.errors).map(err=> err.message)
            const ValidationError=new Error(ValidationErrors.join(', '));
            return next(ValidationError)
        }
        next(error)
    }
}
export const deleteUser=async(res,req,next)=>{
    try{
        const {id} =req.params;

        const deletedUser=await User.findByIdAndDelete(id);
        if (!deletedUser) {
            const error = new Error("No user found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: null
        });
    } catch (error) {
        next(error);
    }
}
export const updateUserPassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;

        // Validate new password length (matching your model constraint)
        if (newPassword.length < 6) {
            const error = new Error("New password must be at least 6 characters long");
            error.statusCode = 400;
            throw error;
        }

        const user = await User.findById(id);
        
        if (!user) {
            const error = new Error("No user found");
            error.statusCode = 404;
            throw error;
        }

        // Verify current password using bcrypt.compare (same as your signIn)
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        
        if (!isPasswordValid) {
            const error = new Error("Current password is incorrect");
            error.statusCode = 401;
            throw error;
        }

        // Hash new password using the same method as your auth
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);
        
        // Update password
        await User.findByIdAndUpdate(id, { password: hashedNewPassword });

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });
    } catch (error) {
        next(error);
    }
};