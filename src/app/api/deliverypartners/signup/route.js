import { deliverypartnersSchema } from "../../../lib/deliverpartnerModel";
import { connectionStr } from "../../../lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    let payload = await req.json()
    let result;
    let success=false
    await mongoose.connect(connectionStr, { useNewUrlParser: true})
    const user=new deliverypartnersSchema(payload)
    result=await user.save()
    if(result){
        success=true
    }
    return NextResponse.json({ result, success })
}