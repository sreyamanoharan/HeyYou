import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import SideBar from '../Components/SideBar'
import MyChats from '../Components/MyChats'
import ChatBox from '../Components/ChatBox'

const Chat = () => {

  const {user}= ChatState()  
  return (
    <div>
          {user&&<SideBar/>}

        <div>
            {user&&<MyChats/>}
            {user&&<ChatBox/>}
        </div>
    </div>
  )
}

export default Chat