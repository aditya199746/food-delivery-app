"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"
import { Delivery_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";
const Order = () => {
    const [cartStorage, setCartStorage] =localStorage?.getItem('cart')&& useState(JSON.parse(localStorage?.getItem('cart')))
    const [total] = useState(() => cartStorage?.length === 1 ? cartStorage[0].price :
        cartStorage?.reduce((a, b) => {
            return a.price + b.price
        })
    )
    const [removeCartData,setRemoveCartData]=useState(false)
    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem("user")))
    const router=useRouter()

    useEffect(()=>{
        if(!total){
            router.push('/')
        }
    },[total])
    const handlePlaceOrder=async ()=>{
        let user_id=JSON.parse(localStorage.getItem("user"))._id
        let city=JSON.parse(localStorage.getItem("user")).city
        let cart=JSON.parse(localStorage.getItem("cart"))
        let foodItemIds=cart.map((item)=>item._id).toString()
        let deliveryBoyRes=await fetch("http://localhost:3000/api/deliverypartners/"+city)
        deliveryBoyRes=await deliveryBoyRes?.json()
        const deliveyBoyIds=deliveryBoyRes.result.map((item)=>item._id)

        let deliveryBoy_id=deliveyBoyIds[Math.floor(Math.random()*deliveyBoyIds.length)]
        let collection={
            user_id,
            resto_id:cart[0].resto_id,
            foodItemIds,
            deliveryBoy_id,
            status:"confirm",
            amount:total + ((total * TAX) / 100) + Delivery_CHARGES
        }
        let response=await fetch("http://localhost:3000/api/order",{
            method:"POST",
            body:JSON.stringify(collection)
        })
        response=await response.json()
        if(response.success){
            alert("Order COnfirmed")
            setRemoveCartData(true)
            router.push("/myProfile")
        }
        else{
            alert("Order failed")
        }
    }

    return <div>
        <CustomerHeader  removeCartData={removeCartData}/>
        <div>
            <div>
                <h2>User Details</h2>
                <div>
                    <span>Name</span>
                    <span>{userStorage.name}</span>
                </div>
                <div>
                    <span>Address</span>
                    <span>{userStorage.address}</span>
                </div>
                <div>
                    <span>Mobile number</span>
                    <span>{userStorage.mobile}</span>
                </div>
            </div>
        </div>
        <h2>Amount Details</h2>
        <div>
            <div>
                <span>Food Charges: </span>
                <span>{total}</span>
            </div>
            <div>
                <span>Tax: </span>
                <span>{(total * TAX) / 100}</span>
            </div>
            <div>
                <span>Delivery Charges: </span>
                <span>{Delivery_CHARGES}</span>
            </div>
            <div>
                <span>Total Amount: </span>
                <span>{total + ((total * TAX) / 100) + Delivery_CHARGES}</span>
            </div>
        </div>
        <h2>Payment Method</h2>
        <div>
                <span>Cash on Delivey</span>
                <span>{total + ((total * TAX) / 100) + Delivery_CHARGES}</span>
            </div>
        <div>
            <button onClick={handlePlaceOrder}>Place your Order Now</button>
        </div>
        <Footer />
    </div>
};
export default Order