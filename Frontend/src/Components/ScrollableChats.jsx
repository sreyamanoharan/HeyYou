import React from 'react'
import { isLastMessage, isSameSender ,isSameSenderMargin, isSameUser} from '../config/ChatLogics'
import { ChatState } from '../Context/ChatProvider'


const ScrollableChats = ({messages}) => {

    const {user}=ChatState()
  return (
    <div>
        {messages&&messages.map((m,i)=>(
            <div key={m._id}>
                {(isSameSender(messages,m,i,user._id)
                || isLastMessage(messages,i,user._id)
                 )&&(
                    <img src={user.Profilepicture} alt="" />
                )}
                <div>

            
                 <span style={{backgroundColor:`${m.sender._id === user._id ? "blue":"green"}`, 
                 marginLeft:isSameSenderMargin(messages,m,i,user._id),
                 marginTop:isSameUser(messages,m,i) ? 3 : 10
                }}> 
                    {m.content}
                 </span>
                 </div>
            </div>
           
        ))}
    </div>
  )
}

export default ScrollableChats