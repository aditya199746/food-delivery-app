"use client"
import { useEffect,useState } from "react"
import DeliveryHeader from "../_components/DeliveryHeader"
import { useRouter } from "next/navigation"

const Page=()=>{
const router=useRouter()
const [myOrders,setMyOrders]=useState([])

    const getMyOrders=async ()=>{
        const deliveryData=JSON.parse(localStorage.getItem("delivery"))
        let response=await fetch("http://localhost:3000/api/deliverypartners/orders/"+deliveryData._id)
        response=await response.json()
        if(response.success){
            setMyOrders(response.result)
        }
    }

    useEffect(()=>{
        getMyOrders()
    },[])
    useEffect(()=>{
        const delvery=JSON.parse(localStorage.getItem("delivery"))
        if(!delvery){
            router.push("/deliverydashboard")
        }
    },[])
    return <div>
        <DeliveryHeader />
        <h1>My Order List</h1>
        {
            myOrders.map((item)=>(
                <div>
                    <h4>{item.data.name}</h4>
                    <div>Amount: {item.amount}</div>
                    <div>Address: {item.data.address}</div>
                    <div>Status: {item.status}</div>
                    <div>Update Status: 
                        <select>
                            <option>Confirm</option>
                            <option>On the way</option>
                            <option>delivered</option>
                            <option>fail to deliver</option>
                        </select></div>
                </div>
            ))
        }
    </div>
}
export default Page