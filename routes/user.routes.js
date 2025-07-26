import { Router } from "express";
import { deleteUser, getUser, getUsers, updateUser, updateUserPassword } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";


const userRouter=Router()

userRouter.get('/',authorize,getUsers)

userRouter.get('/:id',authorize,getUser)

userRouter.post('/:id/password',authorize,updateUserPassword)
userRouter.put('/:id',authorize,updateUser)
userRouter.delete('/:id',authorize,deleteUser)
export default userRouter;