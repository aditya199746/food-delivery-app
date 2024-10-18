import { connectionStr } from "../../lib/db";
import { userSchema } from "../../lib/usersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    let payload = await req.json()
    let result;
    let success=false
    await mongoose.connect(connectionStr, { useNewUrlParser: true,useUnifiedTopology: true })
    const user=new userSchema(payload)
    result=await user.save()
    if(result){
        success=true
    }
    return NextResponse.json({ result, success })
}