import mongoose from "mongoose";

export const connectdb =async()=>{
    await mongoose.connect(process.env.mongodb_url).then(()=>console.log("mongo db connected"))
}