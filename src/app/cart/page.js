"use client"
import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"
import { Delivery_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";
const Page=()=>{
    const [cartStorage,setCartStorage]=useState(JSON.parse(localStorage?.getItem('cart')))
    const [total]=useState(()=>cartStorage.length===1?cartStorage[0].price:
    cartStorage.reduce((a,b)=>{
        return a.price+b.price
    })
 )
 const router=useRouter()

 const orderNow=()=>{
    if(JSON.parse(localStorage.getItem("user"))){
        router.push("/order")
    }
    else{
        router.push("/user-auth?order=true")
    }
    
 }
    return <div>
        <CustomerHeader />
        <div>
            {
               cartStorage?.length> 0 ? cartStorage?.map((item,key)=>(
                    <div key={key}>
                        <div>{item.name}</div>
                        <div>{item.price}</div>
                        <div>{item.description}</div>
                        <img src={item.imgPath} />
                        {
                         <button onClick={()=>handleRemoveCart(item._id)} >Remove from cart</button>
                            
                        }
                        
                        
                    </div>
                ))
                : <h1>No Food items for now</h1>
            }
        </div>
        <div>
            <div>
                <span>Food Charges: </span>
                <span>{total}</span>
            </div>
            <div>
                <span>Tax: </span>
                <span>{(total*TAX)/100}</span>
            </div>
            <div>
                <span>Delivery Charges: </span>
                <span>{Delivery_CHARGES}</span>
            </div>
            <div>
                <span>Total Amount: </span>
                <span>{total+((total*TAX)/100)+Delivery_CHARGES}</span>
            </div>
        </div>
        <div>
            <button onClick={orderNow}>Order Now</button>
        </div>
        <Footer />
    </div>
};
export default Page