import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import axios from '../axios'

const VerifyOtp = () => {
  const [otp,setOtp]=useState('')

  const location=useLocation()
  let email=location.state?.email
  console.log(email);
  
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(email,otp,'geogleeeeeeee');
    
    await axios.post('/verify-otp',{email,otp}).then((res)=>{
      if(res.status=200){
        Navigate('/login')
      }
      
    })
  }

  return (
    <div>
        <p>verify OTP</p>
        <form onSubmit={handleSubmit}>
        <input type="number" value={otp} onChange={(e)=>setOtp(e.target.value)}/>
        <button type='submit'>verify OTP</button>
        </form>
       
        
    </div>
  )
}

export default VerifyOtp