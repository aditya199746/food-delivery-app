import { connectionStr } from "../../../lib/db";
import { foodsSchema } from "../../../lib/foodsModel";
import { restaurantSchema } from "../../../lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content){
    const id=content.params.id
    await mongoose.connect(connectionStr, { useNewUrlParser: true })
    const details = await restaurantSchema.findOne({_id:id})
    const foodItems=await foodsSchema.find({resto_id:id})
    return NextResponse.json({ foodItems,details,success:true })
}