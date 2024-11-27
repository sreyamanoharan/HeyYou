import express from 'express'
const messageRouter=express.Router()
import { VerifyToken } from '../MiddleWares/Auth.js'
import { AllMessages, sendMessage } from '../Controllers/MessageControllers.js'


messageRouter.post('/new-message',VerifyToken,sendMessage)
messageRouter.get('/new-message/:chatId',VerifyToken,AllMessages)


export default messageRouter