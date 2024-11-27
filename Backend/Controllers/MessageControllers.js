import Message from '../Models/messageModel.js'
import Users from '../Models/RegisterModel.js';
import Chat from '../Models/chatModel.js'

export const sendMessage=async(req,res)=>{
  const {content,chatId}=req.body

  
  if(!content || !chatId){
    console.log('invalid data passed');
    return
    
  }
  var newMessage={
    sender:req.user._id,
    content:content,
    chat:chatId
  }

  try {
    var message=await Message.create(newMessage)

    message=await message.populate("sender",'Name Profilepicture')
    message=await message.populate("chat")
    message=await Users.populate(message,{
        path:'chat.user',
        select:'Name Profilepicture Email'
    })

await Chat.findByIdAndUpdate(req.body.chatId,{
    letestMessage:message
})


res.status(201).json(message)
  } catch (error) {
    console.log(error);
    
  }
}

export const AllMessages=async(req,res)=>{
 
    const chatId=req.params.chatId.trim();

    
  try {
    
    const messages=await Message.find({chat:chatId}).populate('sender',"Name Profilepicture Email").populate('chat')

  
    res.json(messages)
} catch (error) {
    console.log(error);
    
  }
}