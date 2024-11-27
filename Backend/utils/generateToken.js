// import React, { Profiler, useState } from 'react'
// import axios from'../axios'
// import { ChatState } from '../Context/ChatProvider'
// import {getSender,getSenderFull} from '../config/ChatLogics'
// import ProfileModal from './ProfileModal'
// import UpdateGroupChatModal from './UpdateGroupChatModal'


// const SingleChat = ({fetchAgain,setFetchAgain}) => {

//   const [messages,setMessages]=useState([]);
//   const [loading,setLoading]=useState(false);
//   const [newMessage,setNewMessage]=useState('');

//     const {user,selectedChat,setSelectedChat}=ChatState()

//     const sendMessage=async(event)=>{
//   if(event.key==='Enter' && newMessage){
//     console.log('hiiiii');
    
//     try {
//       setNewMessage("")
//       const {data}=await axios.post('/message/new-message',{
//         content:newMessage,
//         chatId:selectedChat._id
//       },{
//         headers:{
//           'Content-Type':"application/json"
//         }
//       })
   
//       setMessages([...messages,data])
//     } catch (error) {
//       console.log(error);
      
//     }
 
//   }
//     }

//     const typingHandler=(e)=>{
//     setNewMessage(e.target.value)
//     }

//   return (
//     <div>
//       {selectedChat?(
//         <div>
//         {/* <button onClick={()=>setSelectedChat('')}/> */}
//         {!selectedChat.isGroupChat ?(
//           <>
//           <p>{getSender(user,selectedChat.users)}</p>
//           <ProfileModal user={getSenderFull(user, selectedChat.users)}/>
             
              
//           </>
//         ):(
//           <>
//           {selectedChat.chatName.toUpperCase()}
//           <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
//           </>
          
//         )}
//         </div>
//       ):(
//         <p>click on a user to start chating</p>
//       )}
//       <div>
//       {loading?(
//         <p>loading.....</p>
//       ):(
//         <div>
//         messages
//         </div>
//       )}
//       <form onKeyDown={sendMessage}>
//    <input type="text" placeholder='enter the message' onChange={typingHandler} value={newMessage}/>
//       </form>
//       </div>
//     </div>
//   )
// }

// export default SingleChat




import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axios';
import { allChats } from '../../../services';

const UserChat = ({ role }) => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setselectedUser] = useState();
  const [details, setDetails] = useState('');
  const selectedRef = useRef();
  const scrolldownRef = useRef(null);
  const userId = useSelector((state) => state.User.userId);

  // let socket = io('http://localhost:3000/');
  let socket = io('https://feelhome.winkell.store/');

  useEffect(() => {
    socket.emit('setup', userId);
  }, [messages, userId]);

  useEffect(() => {
    const fetch = async () => {
      allChats(userId).then((data) => {
        let lists = data?.map((obj) => {
          let filteredUsers = obj.User.filter((item) => item._id !== userId);
          return {
            ...obj,
            User: filteredUsers,
          };
        });
        setChats(lists);
        if (lists.length > 0) {
          // Select the first chat and fetch its messages
          selectChat(lists[0]);
          handleMessageFetch(lists[0]._id);
        }
      });
    };
    fetch();
  }, [userId]);

  useEffect(() => {
    axiosInstance.get(`/getUser/${userId}`).then((res) => {
      setDetails(res.data.users);
    });
  }, []);

  const selectChat = (user) => {
    setselectedUser(user);
    selectedRef.current = user;
  };

  const handleMessageFetch = async (chatId) => {
    const { data } = await axiosInstance.get(`/message/${chatId}`);
    setMessages(data.messages);
  };

  const handleMessageSent = async (e) => {
    e.preventDefault();

    if (newMessage.trim().length > 0) {
      const res = await sendMessage(newMessage, selectedUser?._id, userId);

      socket.emit('new message', res.message);

      setNewMessage('');
      setMessages([...messages, res.message]);
    }
  };

  const sendMessage = async (content, chatId, userId) => {
    const { data } = await axiosInstance.post(`/message`, {
      content,
      chatId,
      userId,
    });

    return data;
  };

  const setMessageFn = (e) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    socket.on('message received', (message) => {
      if (selectedRef?.current?.User[0]?._id === message.sender._id) {
        setMessages((messages) => [...messages, message]);
      } else {
        // Do something else if needed
      }
    });
  }, [socket]);

  useEffect(() => {
    if (scrolldownRef.current) {
      scrolldownRef.current.scrollTo({
        top: scrolldownRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);