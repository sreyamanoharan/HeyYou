import UserModel from "../Models/RegisterModel.js";

export const userRegister=async (req,res)=>{
    const {Name,Email,PhoneNumber,Password,ConfirmPassword,ProfilePicture}=req.body
    const user=new UserModel({
        Name,
        Email,
        PhoneNumber,
        ProfilePicture,
        Password,
        ConfirmPassword
    })

    user.save()

    res.status(201).json({ message: 'User registered successfully ,Check your mail for verification' })
    
}