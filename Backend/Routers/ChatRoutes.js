import express from 'express'
import { createChat } from '../Controllers/chatController.js'
import { VerifyToken } from '../MiddleWares/Auth.js'

const chatRouter=express.Router()


chatRouter.post('/create-chat',VerifyToken,createChat)
// chatRouter.post('/get-chat',VerifyToken,accessChat)
// chatRouter.post('/create-group',VerifyToken,createGroupChat)
// chatRouter.put('/rename-group',VerifyToken,renameGroup)
// chatRouter.put('/remove-group',VerifyToken,removeFromGroup)
// chatRouter.put('/add-group',VerifyToken,addToGroup)

export default chatRouter