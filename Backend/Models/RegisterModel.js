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
    }
})

const Users=mongoose.model('userSchema',User)
export default Users