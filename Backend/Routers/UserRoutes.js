import express from "express";
const userRouter=express.Router()
import { userRegister,generateOtp,verifyOtp} from "../Controllers/RegisterController.js";
import { login } from "../Controllers/RegisterController.js";
import { allUsers } from "../Controllers/RegisterController.js";
import { VerifyToken } from "../MiddleWares/Auth.js";

userRouter.post('/register',userRegister)
userRouter.post('/generate-otp',generateOtp)
userRouter.post('/verify-otp',verifyOtp)
userRouter.post('/login',login)
userRouter.get('/user',VerifyToken,allUsers)


export default userRouter