import mongoose from "mongoose";

const restaurantModel=new mongoose.Schema({
    email:String,
    password:String,
    resName:String,
    city:String,
    address:String,
    phone:String,
})

export const restaurantSchema=mongoose.models.restaurants || mongoose.model("restaurants",restaurantModel)