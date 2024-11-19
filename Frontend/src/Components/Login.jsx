import axios from '../axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const Navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()
      await axios.post('/login',{email,password}).then((res)=>{
        console.log(res.data);
        if(res.data==="success"){
         Navigate('/')
        }
        
      })
    
  }

  return (
    <>
      <p>Login </p>
      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <label htmlFor="">Email</label>
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <label htmlFor="">Password</label>
      <button onClick={handleSubmit}>login</button>
    </>
  )
}

export default Login