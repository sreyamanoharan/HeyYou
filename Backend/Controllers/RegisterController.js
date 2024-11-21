import UserModel from "../Models/RegisterModel.js";
import crypto from 'crypto'
import { sendOtp } from "../utils/sendMail.js";
import { generateToken } from '../MiddleWares/Auth.js'

export const userRegister=async (req,res)=>{
    const {Name,Email,PhoneNumber,Password,ConfirmPassword,ProfilePicture}=req.body


try {
    const user= await UserModel.findOne({Email:Email})
           console.log(user,'llllllllllllllllllllllllllllllllllllllllllllllllllllllllllll');
           
        
    if(user){
        return res.status(201).json({message:'user already exists'})
    }


    const newUser=new UserModel({
        Name,
        Email,
        PhoneNumber,
        ProfilePicture,
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
    console.log('===generate otp=========');
    

    const user=await UserModel.findOne({Email})
    console.log(user);
    

    if(!user){
        return res.status(400).json({message:'user not exists'})
    }

    const otp=crypto.randomInt(100000,999999).toString()
    user.otp=otp
    user.otpExpires=Date.now() + 5*60*1000;
    console.log(otp,'ptp hereeeeeee');
    
    await user.save()
    await sendOtp(Email,otp)
    return res.status(200).json({message:'otp send to mail'})
    } catch (error) {
        return res.status(400).json({message:'server error'})
    }


}

export const verifyOtp=async(req,res)=>{

    const {email,otp}=req.body
    console.log(req.body,'kkkkkkkkk');
    
    const user=await UserModel.findOne({Email:email})
    console.log(user,'whwre is the Userrrrrr');

    console.log(user.otp);
    
    

    if(!user){
        res.status(400).json({message:"user not exists"})
    }
    if(user.otp!=otp||user.otpExpires<Date.now()){
  return res.status(400).json({message:"ivalid otp or otp expired"})
    }
    user.otp=null
    user.otpExpires=null
    await user.save()
    console.log(user.otp,'ooooooooooooooooo');
    
    res.status(200).json({message:"otp verified succesfully"})
}


export const login=async(req,res)=>{
    const Email=req.body.email
    const password=req.body.password
    console.log(Email,password);
    
    await UserModel.findOne({Email:Email}).then((user)=>{
        if(user){
            if(user.Password===password){
                res.status(201).json({token:generateToken(user._id),userId:user._id})
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
    console.log(req.query.search,'hhhheeellllooooooooooooooooooooooooooo-------------------');
    
    const keyword=req.query.search ? {
        $or: [
            {Name: { $regex: req.query.search ,$options:"i"}},
            {Email:{ $regex: req.query.search ,$options:"i"}}
        ]
    }:{};
  console.log(keyword);
  
 const users= await UserModel.find(keyword).find({_id:{$ne:req.user._id}})
 console.log(users);
 
 res.send(users)

}


