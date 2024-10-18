import { connectionStr } from "../../../../lib/db";
import { ordersSchema } from "../../../../lib/ordersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { restaurantSchema } from "../../../../lib/restaurantsModel";


export async function GET(req,content) {
    let id = content.params.id
    let success=false
    await mongoose.connect(connectionStr, { useNewUrlParser: true,useUnifiedTopology: true })
    let result=await ordersSchema.find({content:id})
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