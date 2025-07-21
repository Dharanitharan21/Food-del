import UserModel from "../models/usermodel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user

const loginUesr =async (req ,res )=>{
   const {email ,password}=req.body
   try{
    const user =await UserModel.findOne({email})
    if(!user){
        return res.json({success:false,message:"User Not found"})
    }
    const isMatch =await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.json({success:false,message:"Invalid credentials"})
    }
    const token =createtoken(user._id)
    res.json({success:true,token})
   }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
 
const createtoken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user

const registerUser =async(req,res)=>{
    const {name,password ,email}=req.body
    try{
      const exists =await UserModel.findOne({email})
      if(exists){
        return res.json({success:false,message:"User already exists"})
      }
      //validating email format & strong password
      if(!validator.isEmail(email)){
        return res.json({success:false,message:'Please Enter a Valid Email'})
      }
      if(password.length<8){
        return res.json({success:false,message:'Please Enter a strong password'})
      }
      // hashing password
      const salt =await bcrypt.genSalt(10)
      const hashedpw =await bcrypt.hash(password,salt)

      const newUser =new UserModel({name:name,email:email,password:hashedpw})
      const user = await newUser.save()
      const token =createtoken(user._id)
      res.json({success:true,token})
      
      

    }catch(error){
        console.log(error);
        
        res.json({success:false,message:"Error"})
    }
}

export {loginUesr ,registerUser}