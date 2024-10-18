import { connectionStr } from "../../../lib/db";
import { restaurantSchema } from "../../../lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    await mongoose.connect(connectionStr, { useNewUrlParser: true })
    const data = await restaurantSchema.find()
    return NextResponse.json({ result: data })
}

export async function POST(req)  {
    let payload = await req.json()
    let result;
    let success=false
    await mongoose.connect(connectionStr, { useNewUrlParser: true,useUnifiedTopology: true })
    if (payload.isLogin) {
        //use for api login
         result = await restaurantSchema.findOne({ email: payload.email, password: payload.password }).exec();
        if(result){
            success=true
        }
    } else {
        //use for signup
        let restaurant = new restaurantSchema(payload)
        result = await restaurant.save()
        if(result){
            success=true
        }
    }
    console.log(result,"result")
    return NextResponse.json({ result, success })
}