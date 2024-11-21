import jwt from "jsonwebtoken"
import Users from "../Models/RegisterModel.js"

export const generateToken=(userId)=>{

const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
return token
}


export const VerifyToken=async(req,res,next)=>{
    try {
        let token=req.headers.authorization
        console.log(token);
        
            
        if(!token){
           return console.log('access denied');
            
        }

        if(token.startsWith('Bearer')){
            console.log('token ind goooysss');
            token=token.slice(7,token.length).trimLeft()
            
        }
  console.log(token);
  
        const verified=jwt.verify(token,process.env.JWT_SECRET)
        
       const user=await Users.findOne({_id:verified.userId})
       console.log(user); // If you want the result as a plain JavaScript object

// If you specifically want to access the _id as a string


       req.user=user
         console.log(req.user,verified,'yyyyyaaaaaaaaaaaaaaaaaaaaaayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
         
        
        req.payload={verified,user}
        next()
        
    } catch (error) {
        console.log(error);
        
    }
}