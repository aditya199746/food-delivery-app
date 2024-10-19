"use client"
import { useEffect, useRef, useState } from "react"
import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"

const MyProfile=()=>{
    const [myOrders,setMyOrders]=useState([])
    const hasFetched=useRef()

    const getMyOrders=async ()=>{
        if (typeof window !== "undefined") {
        const userStorge=localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user"))
        let response=await fetch("http://localhost:3000/api/order?id="+userStorge?._id||"")
        response=await response.json()
        if(response.success){
            setMyOrders(response.result)
        }
    }
    }

    useEffect(()=>{
        if(hasFetched.current) return;
    hasFetched.current=true
        getMyOrders()
    },[])
    return <div>
        <CustomerHeader />
        {
            myOrders.map((item,idx)=>(
                <div key={`${item.data.name}${idx}`}>
                    <h4>{item.data.name}</h4>
                    <div>Amount: {item.amount}</div>
                    <div>Address: {item.data.address}</div>
                    <div>Status: {item.status}</div>
                </div>
            ))
        }
        <Footer />
    </div>
}
export default MyProfile