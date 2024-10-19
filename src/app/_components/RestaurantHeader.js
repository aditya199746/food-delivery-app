"use client"
import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter,usePathname } from "next/navigation"
import Image from "next/image"


const RestaurantHeader = () => {
    const [details, setDetails] = useState()
    const router = useRouter()
    const pathName=usePathname()
    const hasFetched=useRef()
    useEffect(() => {
        if (typeof window !== "undefined") {
        if(hasFetched.current) return;
        hasFetched.current=true
        let data =localStorage.getItem("restaurantUser")&& localStorage.getItem("restaurantUser")
        if (!data && pathName=="/restaurant/dashboard") {
            router.push("/restaurant")
        } else if(data && pathName==="/restaurant"){
            router.push("/restaurant/dashboard")
        }
         else {
            setDetails(JSON.parse(data))
        }}
    },[])
    const handleLogout=()=>{
        localStorage.removeItem("restaurantUser")
        router.push("/restaurant")
    }
    return (
        <div>
            <div className="logo">
                <img src="" alt="RestaurantHeader logo" width={200} />
            </div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {
                    details && details?.resName ? 
                    <>
                    <li><button onClick={handleLogout}>Logout</button></li>
                        <li><Link href="/">Profile</Link></li>
                    </>
                     
                    :
                        <li>
                            <Link href="/">Login/SignUp</Link>
                        </li>
                }


            </ul>
        </div>
    )
}

export default RestaurantHeader