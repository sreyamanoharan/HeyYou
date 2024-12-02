import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import SideBar from '../Components/SideBar'
import MyChats from '../Components/MyChats'
import ChatBox from '../Components/ChatBox'

const ChatPage = () => {

  const {user}= ChatState()  
  const [fetchAgain,setFetchAgain]=useState(false)
  return (
    <div>
          {user&&<SideBar/>}

        <div style={{display:'flex', justifyContent:'space-between', width:"100%"}}>
            {user&&<MyChats fetchAgain={fetchAgain}/>}
            {user&&<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
        </div>
    </div>
  )
}

export default ChatPage