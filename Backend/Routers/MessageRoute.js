import express from 'express'
const messageRouter=express.Router()
import { VerifyToken } from '../MiddleWares/Auth.js'
import { AllMessages, sendMessage, unreadMessages ,} from '../Controllers/MessageControllers.js'


messageRouter.post('/new-message',VerifyToken,sendMessage)
messageRouter.get('/new-message/:chatId',VerifyToken,AllMessages)
messageRouter.get('/unread/:id',unreadMessages)


export default messageRouter