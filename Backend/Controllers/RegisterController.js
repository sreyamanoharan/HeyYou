import UserModel from '../Models/RegisterModel.js'
import crypto from 'crypto'
import { sendOtp } from "../utils/sendMail.js";
import { generateToken } from '../MiddleWares/Auth.js'

export const userRegister=async (req,res)=>{
    const {Name,Email,PhoneNumber,Password,ConfirmPassword,Profilepicture}=req.body


try {
    const user= await UserModel.findOne({Email:Email})

           
        
    if(user){
        return res.status(201).json({message:'user already exists'})
    }


    const newUser=new UserModel({
        Name,
        Email,
        PhoneNumber,
        Profilepicture,
        Password,
        ConfirmPassword
    })

    newUser.save()

    return res.status(201).json({ message: 'User registered successfully ,Check your mail for verification' })
} catch (error) {
   return res.status(500).json({message:error.message});
    
}
  
}

export const generateOtp=async(req,res)=>{


console.log(req.body);


    try {
        
    const {Email}=req.body
    
    const user=await UserModel.findOne({Email})
    console.log(user);
    

    if(!user){
        return res.status(400).json({message:'user not exists'})
    }

    const otp=crypto.randomInt(100000,999999).toString()
    user.otp=otp
    user.otpExpires=Date.now() + 5*60*1000;
  
    
    await user.save()
    await sendOtp(Email,otp)
    return res.status(200).json({message:'otp send to mail'})
    } catch (error) {
        return res.status(400).json({message:'server error'})
    }


}

export const verifyOtp=async(req,res)=>{

    const {email,otp}=req.body
  
    
    const user=await UserModel.findOne({Email:email})

    
    if(!user){
        res.status(400).json({message:"user not exists"})
    }
    if(user.otp!=otp||user.otpExpires<Date.now()){
  return res.status(400).json({message:"ivalid otp or otp expired"})
    }
    user.otp=null
    user.otpExpires=null
    await user.save()

    
    res.status(200).json({message:"otp verified succesfully"})
}


export const login=async(req,res)=>{
    const Email=req.body.email
    const password=req.body.password
    console.log(Email,password);
    
    await UserModel.findOne({Email:Email}).then((user)=>{
        if(user){
            console.log(user,'&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
            
            if(user.Password===password){
                res.status(201).json({user
                    ,token:generateToken(user._id)})
            }
            else{
                res.json("the password is incorrect")
            }
        }else{
            res.json("user not exists")
        }
    })
 

   

}

export const allUsers=async(req,res)=>{

  
 const users= await UserModel.find({Name:{$regex:req.query.search ,$options:'i'}}).find({_id:{$ne:req.user._id}})
 console.log(users);
 
 res.send(users)

}


