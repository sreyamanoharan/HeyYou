import React, { useEffect } from 'react'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'


const Home = () => {

  const navigate=useNavigate()

  useEffect(()=>{
    const token=localStorage.getItem("token")

    if(token){
        navigate('/chats')
    }
},[navigate])


 useEffect(()=>{
   axios.post('/chat/create-chat')
 })
 

 const logout=()=>{
  localStorage.removeItem('token')
  navigate('/login')
 }
  
  return (
    <div>
      <p>hellooo</p>
      <button style={{color:'red'}} onClick={logout}>logout</button>
    </div>
  )
}

export default Home