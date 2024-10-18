"use client"
import { useEffect, useState } from "react"
import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"

const MyProfile=()=>{
    const [myOrders,setMyOrders]=useState([])

    const getMyOrders=async ()=>{
        const userStorge=JSON.parse(localStorage.getItem("user"))
        let response=await fetch("http://localhost:3000/api/order?id="+userStorge._id)
        response=await response.json()
        if(response.success){
            setMyOrders(response.result)
        }
    }

    useEffect(()=>{
        getMyOrders()
    },[])
    return <div>
        <CustomerHeader />
        {
            myOrders.map((item)=>(
                <div>
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