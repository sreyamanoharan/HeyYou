import express from "express";
const userRouter=express.Router()
import { userRegister,generateOtp,verifyOtp} from "../Controllers/RegisterController.js";
import { login } from "../Controllers/RegisterController.js";


userRouter.post('/register',userRegister)
userRouter.post('/generate-otp',generateOtp)
userRouter.post('/verify-otp',verifyOtp)
userRouter.post('/login',login)


export default userRouter