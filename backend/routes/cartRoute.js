import express from 'express'
import { addToCart, getCart, removFromCart } from '../controller/cartController.js'
import authmiddleware from '../middleware/auth.js'

const cartRouter =express.Router()

cartRouter.post('/add',authmiddleware,addToCart)
cartRouter.post('/remove',authmiddleware,removFromCart)
cartRouter.post('/get',authmiddleware,getCart)

export default cartRouter