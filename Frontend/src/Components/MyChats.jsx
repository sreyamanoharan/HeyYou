import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import axios from '../axios'
import { getSender } from '../config/ChatLogics.js';
import GroupChatModal from './GroupChatModal';

const MyChats = ({fetchAgain}) => {

  const [loggedUser,setLoggedUser]=useState();
  const [modalOpen,setModalOpen]=useState(false)
  const {selectedChat,setSelectedChat,user,chats,setChats}=ChatState()

const fetchChats=async()=>{
  try {
    const {data}=await axios.get('/chat/get-chat', 
      {headers: {
      'Content-Type': 'application/json', // Specify Content-Type
    }})
    console.log(data,'chatss are here onlyyyy');
    
    setChats(data.chats)
  } catch (error) {
    
  }
}


useEffect(()=>{
  setLoggedUser(JSON.parse(localStorage.getItem('userInfo')))
  fetchChats()
},[fetchAgain])

const handleOpenModal = () => {
    setModalOpen(true);
  };

  
  const handleCloseModal = () => {
    setModalOpen(false);
  };


  return (
    <div style={{ paddingLeft: '50px' }}>
      <p>My Chats</p>
  
      <button onClick={handleOpenModal}>Create Group</button>

      {modalOpen && <GroupChatModal closeModal={handleCloseModal} />}

      <div>
        {chats ? (
          chats.map((chat) => (
            <li onClick={() => setSelectedChat(chat)} key={chat._id}>
             {!chat.isGroupChat
                  ? getSender(loggedUser, chat.users)
                : chat.chatName}
            </li>

          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MyChats;