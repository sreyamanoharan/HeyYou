import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './Routers/UserRoutes.js'
import chatRouter from './Routers/ChatRoutes.js'
import dotenv from 'dotenv'
import messageRouter from './Routers/MessageRoute.js'
import {Server,Socket} from 'socket.io'
dotenv.config()


const app=express()
app.use(cors({
    origin: ["http://localhost:5173"],
   methods: ["GET", "POST","PATCH","PUT" ],
   credentials: true,
 }));
app.use(express.json())

const PORT=3000

app.use('/',userRouter)
app.use('/chat',chatRouter)
app.use('/message',messageRouter)


mongoose.connect("mongodb://localhost:27017/HeyYou").then((res)=>{
    console.log('mongo connected');
    
})

const server=app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

const io=new Server(server,{
  pingTimeout:60000,
  cors:{
    origin:"http://localhost:5173",
  }
});

io.on('connection',(socket)=>{
  console.log('connection to socket.io');

 
  socket.on('setup' ,(userData)=>{
    socket.join(userData._id)

    
    socket.emit('connected')
  });



    socket.on('join chat' ,(room)=>{
    socket.join(room)
    console.log('user joined//////////////////' +room);
    
    });

    socket.on('typing', (data) => {
      console.log(data);
      
      const { room, sender } = data; // Expecting the sender's ID in the data object
      console.log(`${sender} is typing in room ${room}`);
    
      // Emit the 'typing' event to all users in the room except the sender
      socket.to(room).emit('typing', { sender });
    });
    
    socket.on('stop typing', (data) => {
      const { room, sender } = data;
    
      // Emit the 'stop typing' event to all users in the room except the sender
      socket.to(room).emit('stop typing', { sender });
    });
    


    socket.on('new message' ,(newMessageReceived)=>{
      console.log(newMessageReceived,'hahaahhaa');
      
      var chat=newMessageReceived.chat
      console.log(chat.users);
      
 
      if(!chat.users) return console.log('chat.users is not defined');

      chat.users.forEach((user)=> {
        if(user==newMessageReceived.sender._id) return;
  
        console.log(`Sending message to user: ${user}`);
        
        socket.in(user).emit('message received',newMessageReceived)
      });
      
    })
})