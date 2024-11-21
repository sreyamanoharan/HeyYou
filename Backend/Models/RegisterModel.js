import mongoose from "mongoose";

const User=new mongoose.Schema({
    Name:{
        type:String
    },
    Email:{
        type:String
    },
    PhoneNumber:{
        type:Number
    },
    Password:{
        type:String
    },
    ConfirmPassword:{
        type:String
    },
    Profilepicture:{
        type:String
    },
    otp:{
        type:String
    },
    otpExpires:{
        type:Date
    }
})

const Users=mongoose.model('User',User)
export default Users