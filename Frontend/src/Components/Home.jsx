import React, { useEffect } from 'react'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'


const Home = () => {
 
  const navigate=useNavigate()

  useEffect(()=>{
    // const token=localStorage.getItem("token")
    const user=JSON.parse(localStorage.getItem("userInfo"))


      console.log(user,'homepage user....');
      
    if(user){
        navigate('/chats')
    }
},[navigate])  


//  useEffect(()=>{
//    axios.post('/chat/create-chat')
//  })
 

  return (
    <div>
     
    </div>
  )
}

export default Home