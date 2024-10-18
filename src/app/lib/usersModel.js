import mongoose from "mongoose";

const usersModel=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    address:String,
    city:String,
    mobile:String
})

export const userSchema=mongoose.models.users || mongoose.model("users",usersModel)