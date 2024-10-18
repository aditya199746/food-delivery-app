import { connectionStr } from "../../../lib/db";
import { userSchema } from "../../../lib/usersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    let payload = await req.json()
    let success=false
    await mongoose.connect(connectionStr, { useNewUrlParser: true})
    let result=await userSchema.findOne({email:payload.email,password:payload.password})
    if(result){
        success=true
    }
    return NextResponse.json({ result, success })
}