import jwt from "jsonwebtoken"
import Users from "../Models/RegisterModel.js"

export const generateToken=(userId)=>{

const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
return token
}


export const VerifyToken=async(req,res,next)=>{
    try {
        let token=req.headers.authorization
      
        
            
        if(!token){
           return console.log('access denied');
            
        }

        if(token.startsWith('Bearer')){
            console.log('token ind goooysss');
            token=token.slice(7,token.length).trimLeft()
            
        }

  
        const verified=jwt.verify(token,process.env.JWT_SECRET)
        
       const user=await Users.findOne({_id:verified.userId})
   



       req.user=user
         
        
        req.payload={verified,user}
        next()
        
    } catch (error) {
        console.log(error);
        
    }
}