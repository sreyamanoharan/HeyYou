import express from 'express'
import { addToGroup, createChat, createGroupChat, removeFromGroup, renameGroup } from '../Controllers/chatController.js'
import { VerifyToken } from '../MiddleWares/Auth.js'
import { accessChat } from '../Controllers/chatController.js'

const chatRouter=express.Router()


chatRouter.post('/create-chat',VerifyToken,createChat)
chatRouter.get('/get-chat',VerifyToken,accessChat)
chatRouter.post('/create-group',VerifyToken,createGroupChat)
chatRouter.put('/rename-group',VerifyToken,renameGroup)
chatRouter.put('/remove-group',VerifyToken,removeFromGroup)
chatRouter.put('/add-group',VerifyToken,addToGroup)

export default chatRouter