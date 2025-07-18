import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";
 const authRouter = Router();

 //http://localhost:5500/api/v1/auth/
authRouter.post('/sign-up',signUp)
authRouter.post('/sign-in',signIn)
authRouter.post('/sign-out',signOut)
export default authRouter;