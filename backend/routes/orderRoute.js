import express from 'express'
import authmiddleware from '../middleware/auth.js'
import { listOrders, placeOrder, updateStatus, usersOrders, verifyOrder } from '../controller/orderController.js'

const orderRouter =express.Router()

orderRouter.post('/place',authmiddleware,placeOrder)
orderRouter.post('/verify',verifyOrder)
orderRouter.post('/userorders',authmiddleware,usersOrders)
orderRouter.get('/list',listOrders)
orderRouter.post('/status',updateStatus)

export default orderRouter