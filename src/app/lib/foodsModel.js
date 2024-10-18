import mongoose from "mongoose";

const foodsModel=new mongoose.Schema({
    name:String,
    price:Number,
    imgPath:String,
    description:String,
    resto_id: mongoose.Schema.Types.ObjectId
})

export const foodsSchema=mongoose.models.foods || mongoose.model("foods",foodsModel)