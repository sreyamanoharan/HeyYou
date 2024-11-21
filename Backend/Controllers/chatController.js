import chatModel from '../Models/chatModel.js'
import User from '../Models/RegisterModel.js';

export const createChat=async(req,res)=>{

    const {userId}=req.body
    console.log(userId,'chattttttttttttttttttttttttttttttttttttt==========3333333333333');
    

    if(!userId){
        console.log('no userId');

        return res.status(400)
        
    }

  
    var isChat= await chatModel.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}}
        ]
    }).populate("users","-password").populate("latestMessage");

    console.log(isChat,'chaaatttttttt');
    
    isChat=await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"Name ProfilePicture Email"
    })
console.log(isChat,'[[[[[[[]]]]]]]]]]]]]]]]]]');


    if(isChat.length>0){
        res.send(isChat[0])
    }else{
        var chatData={
            chatName:'sender',
            isGroupChat:false,
            users:[req.user._id,userId]
        };

        try {
            const createdChat=await chatModel.create(chatData)
            const FullChat=await chatModel.findOne({_id:createdChat._id}).populate('users','-password')
            res.status(200).json(FullChat)
        } catch (error) {
            console.log(error);
            
        }
    }
}