import { connectionStr } from "../../lib/db";
import { ordersSchema } from "../../lib/ordersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { restaurantSchema } from "../../lib/restaurantsModel";

export async function POST(req) {
    let payload = await req.json()
    let result;
    let success=false
    await mongoose.connect(connectionStr, { useNewUrlParser: true,useUnifiedTopology: true })
    const orderObj=new ordersSchema(payload)
    result=await orderObj.save()
    if(result){
        success=true
    }
    return NextResponse.json({ result, success })
}

export async function GET(req) {
    let userId = req.nextUrl.searchParams.get("id")
    let success=false
    await mongoose.connect(connectionStr, { useNewUrlParser: true,useUnifiedTopology: true })
    let result=await ordersSchema.find({user_id:userId})
    if(result){
        let restoData=await Promise.all(
            result.map(async (item)=>{
                let restoInfo={};
                restoInfo.data=await restaurantSchema.findOne({_id:item.resto_id})
                restoInfo.amount=item.amount
                restoInfo.status=item.status
                return restoInfo
            })
        )
        result=restoData
        success=true
    }
    return NextResponse.json({ result, success })
}