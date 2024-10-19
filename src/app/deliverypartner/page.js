
"use client"
import { useEffect, useRef, useState } from "react"
import DeliveryHeader from "../_components/DeliveryHeader"
import { useRouter } from "next/navigation"

const DeliveryPartner = () => {
    const [loginMobile, setLoginMobile] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [mobile, setMobile] = useState("")
    const router=useRouter()
    const hasFetched=useRef()

    useEffect(()=>{
        if (typeof window !== "undefined") {
        if(hasFetched.current) return;
    hasFetched.current=true
        const delvery=localStorage.getItem("delivery")&&JSON.parse(localStorage.getItem("delivery"))
        if(delvery){
            router.push("/deliverydashboard")
        }
    }
    },[])

    const handleSignUp=async ()=>{
        let response=await fetch("http://localhost:3000/api/deliverypartners/signup",{
            method:"POST",
            body:JSON.stringify({name,password,city,address,mobile})
        })
        response=await response.json();
        if(response.success){
            const {result} = response
            delete result.password
            localStorage.setItem("delivery",JSON.stringify(result))
            router.push("/deliverypartner")
        }
    }

    const handleLogin=async ()=>{
        let response=await fetch("http://localhost:3000/api/deliverypartners/login",{
            method:"POST",
            body:JSON.stringify({mobile:loginMobile,password:loginPassword})
        });
        response=await response.json();
        if(response.success){
            const {result} = response
            delete result.password
            localStorage.setItem("delivery",JSON.stringify(result))
            router.push("/deliverypartner")
        } else{
            alert("failed to login, please try again with corret mbile and password")
        }
    }

    return <div>
        <DeliveryHeader />
        <div>
            <h1>Delivery Partner</h1>
            <div>
                <h3>Login</h3>
                <div>
                    <input type="text" placeholder="enter phone" value={loginMobile} onChange={(e) => setLoginMobile(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="enter password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                </div>
                <div>
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
            <div>
            <h3>SignUp</h3>
                <div>
                    <input type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <div>
                    <input type="text" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <div>
                    <input type="text" placeholder="COnfirm password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                </div>
                <div>
                    <input type="text" placeholder="Enter city" onChange={(e) => setCity(e.target.value)} value={city} />
                </div>
                <div>
                    <input type="text" placeholder="Enter address" onChange={(e) => setAddress(e.target.value)} value={address} />
                </div>
                <div>
                    <input type="text" placeholder="Enter Phone" onChange={(e) => setMobile(e.target.value)} value={mobile} />
                </div>
                <div>
                    <button onClick={handleSignUp} >SignUp</button>
                </div>
            </div>
        </div>
    </div>
}
export default DeliveryPartner