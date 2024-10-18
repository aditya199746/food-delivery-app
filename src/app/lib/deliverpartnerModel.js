import mongoose from "mongoose";

const deliverypartnersModel=new mongoose.Schema({
    name:String,
    password:String,
    address:String,
    city:String,
    mobile:String
})

export const deliverypartnersSchema=mongoose.models.deliverypartners || mongoose.model("deliverypartners",deliverypartnersModel)