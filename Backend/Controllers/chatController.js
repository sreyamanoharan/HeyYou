import chatModel from '../Models/chatModel.js'
import User from '../Models/RegisterModel.js';

export const createChat=async(req,res)=>{

    const {userId}=req.body

    

    if(!userId){

        return res.status(400)
        
    }

  
    var isChat= await chatModel.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}}
        ]
    }).populate("users","-password").populate("latestMessage");

  
    
    isChat=await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"Name ProfilePicture Email"
    })



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
export const accessChat = (req, res) => {

  
  
    try {
      chatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: 'Name Profilepicture Email'
          });

  
        
          res.status(200).send({ user: req.user, chats: results });
        })
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Server Error' });
    }
  }
  

export const createGroupChat=async (req,res)=>{


    
    var users=req.body.users;
    
    if(users.length<2){
        return res.status(400).send('more than 2 users are required two create a group')
    }

    users.push(req.user)
   try {
    const groupChat=await chatModel.create({
        chatName:req.body.name,
        users:users,
        isGroupChat:true,
        groupAdmin:req.user
    })

    const fullGroupChat=await chatModel.findOne({_id:groupChat._id})
                         .populate('users',"-password")
                         .populate('groupAdmin',"-password")

                         res.status(200).send(fullGroupChat)
   } catch (error) {
    console.log(error);
    
   }

}

export const renameGroup=async(req,res)=>{

    const {chatId,chatName}=req.body

    const updatedChat=await chatModel.findByIdAndUpdate(
        chatId,{chatName},{new:true}
    )
    .populate("users","-password")
    .populate("groupAdmin","-password")


    if(!updatedChat){
        console.log('chat nOt found');
        
    }else{
       return res.json(updatedChat)
    }
} 



export const addToGroup=async(req,res)=>{


    const {chatId,userId}=req.body

    const added=await chatModel.findByIdAndUpdate(chatId,{
        $push:{users:userId}},
        {new:true}
    )
    .populate("users","-password")
    .populate("groupAdmin","-password")

if(!added){
    console.log('error on adding to group');
    
}else{
    res.json(added)
}

}

export const removeFromGroup=async(req,res)=>{


    const {chatId,userId}=req.body

    const removed=await chatModel.findByIdAndUpdate(chatId,{
        $pull:{users:userId}},
        {new:true}
    )
    .populate("users","-password")
    .populate("groupAdmin","-password")

if(!removed){
    console.log('error on adding to group');
    
}else{
    res.json(removed)
}

}
