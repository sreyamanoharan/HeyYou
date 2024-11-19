import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './Routers/UserRoutes.js'
import dotenv from 'dotenv'
dotenv.config()


const app=express()
app.use(cors({
    origin: ["http://localhost:5173"],
   methods: ["GET", "POST","PATCH","PUT" ],
   credentials: true,
 }));
app.use(express.json())

const PORT=3000

app.use('/',userRouter)


mongoose.connect("mongodb://localhost:27017/HeyYou").then((res)=>{
    console.log('mongo connected');
    
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });