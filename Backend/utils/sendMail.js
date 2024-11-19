import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  export const sendOtp=async(Email,otp)=>{
    console.log('senddddddddddddddd');
    
    await transporter.sendMail({
        from: process.env.Email,
        to: Email ,
        subject: 'otp verification',
        text: `your otp ${otp}`
      });
    }