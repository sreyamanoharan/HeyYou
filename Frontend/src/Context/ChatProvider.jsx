import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext=createContext()

const ChatProvider=({children})=>{

    const [user,setUser]=useState()
    const [selectedChat,setSelectedChat]=useState()
    const [chat,setChat]=useState()

    const navigate=useNavigate()

    useEffect(()=>{
        const userInfo=JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)

        if(!userInfo){
            navigate('/login')
        }
    },[navigate])

  return (
    <ChatContext.Provider value={{user,setUser,selectedChat,setSelectedChat,chat,setChat}}>
        {children}
    </ChatContext.Provider>
  )
}


export const ChatState=()=>{
   return useContext(ChatContext)
} 

export default ChatProvider