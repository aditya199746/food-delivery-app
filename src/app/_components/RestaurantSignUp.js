import { useRouter } from "next/navigation"
import React, {useState} from "react"

const RestaurantSignUp=()=>{
    const [formData,setFormData]=useState({})
    const [cPass,setCPass]=useState("")
    const router= useRouter()
    const handleChange=(e)=>{
        setFormData((prev)=>{
            return {...prev,[e.target.name]:e.target.value }
        })
    }
    const handleSignUp=async()=>{
        let response= await fetch("http://localhost:3000/api/restaurant",{
            method:"POST",
            body:JSON.stringify(formData)
        })
        response=await response.json()
        if(response.success){
            const {result}=response
            delete result.password
            localStorage.setItem("restaurantUser",JSON.stringify(result))
            router.push("/restaurant/dashboard")
        }
    }
    
    return (
        <>
        <h1>Login Page</h1>
            <div>
                <div>
                    <input type="text" placeholder="Enter email id" name="email" onChange={handleChange} value={formData?.email|| ""} />
                </div>
                <div>
                    <input type="password" placeholder="Enter Password" name="password" onChange={handleChange} value={formData?.password|| ""} />
                </div>
                <div>
                    <input type="password" placeholder="Confirm Password" name="cPassword" onChange={(e)=>setCPass(e.target.value)} value={cPass} />
                </div>
                <div>
                    <input type="text" placeholder="Enter restaurant name" name="resName" onChange={handleChange} value={formData?.resName|| ""} />
                </div>
                <div>
                    <input type="text" placeholder="Enter City" name="city" onChange={handleChange} value={formData?.city|| ""} />
                </div>
                <div>
                    <input type="text" placeholder="Enter Full Address" name="address" onChange={handleChange} value={formData?.address || ""} />
                </div>
                <div>
                    <input type="text" placeholder="Enter Contact No." name="phone" onChange={handleChange} value={formData?.phone || ""} />
                </div>
                <button onClick={handleSignUp}>Sign up</button>
            </div>
        </>
    )
}

export default RestaurantSignUp