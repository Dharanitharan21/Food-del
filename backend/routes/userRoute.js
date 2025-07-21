import express from 'express'
import { loginUesr, registerUser } from '../controller/userController.js'

const userRouter =express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUesr)

export default userRouter

