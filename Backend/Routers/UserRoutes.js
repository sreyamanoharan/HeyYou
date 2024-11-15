import express from "express";
const userRouter=express.Router()
import { userRegister } from "../Controllers/RegisterController.js";



userRouter.post('/register',userRegister)


export default userRouter