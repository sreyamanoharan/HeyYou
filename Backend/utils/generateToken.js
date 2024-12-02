import axios from '../axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { TextField, Button } from '@mui/material';import { Toaster, toast } from 'react-hot-toast';

const Login = () => {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const Navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()
      await axios.post('/login',{email,password}).then((res)=>{
        console.log(res.data);
       const {user ,token}=res.data
        
        if(res.status=="201"){
         console.log(res.data.token);
         localStorage.setItem('userInfo', JSON.stringify(user));
         localStorage.setItem('token', token);

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





      <p>dont have an account, please register</p>
     <button> <Link to={'/register'}>Register here</Link></button>
    </>
  )
}

export default Login