import { connectionStr } from "../../../lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {deliverypartnersSchema} from "../../../lib/deliverpartnerModel"

export async function GET(req,content) {
    let city=content.params.city
    let success=false
    await mongoose.connect(connectionStr, { useNewUrlParser: true })
    let filter = {city:{$regex:new RegExp(city,"i")}}
    console.log(filter,"filter")
    const result=await deliverypartnersSchema.find(filter)
    return NextResponse.json({ result })
}