import { useRouter } from "next/navigation"
import React,{ useState } from "react"

const RestaurantLogin = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState(false)
    const router= useRouter()
    const handleLogin=async ()=>{
        if(!email || !password){
            setError(true)
            return false
        }else{
            setError(false)
        }
        let response=await fetch("http://localhost:3000/api/restaurant",{
            method:"POST",
            body:JSON.stringify({email,password,isLogin:true})
        })
        response=await response.json()
        if(response.success){
            const {result}=response
            delete result.password
            localStorage.setItem("restaurantUser",JSON.stringify(result))
            router.push("/restaurant/dashboard")
        } else {

        }
    }
    return (
        <>
        <h1>Login Page</h1>
            <div>
                <div>
                    <input type="text" placeholder="Enter email id" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    {
                        error && !email && <span>Please enter valid email</span>
                    }
                </div>
                <div>
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    {
                        error && !password && <span>Please enter valid Password</span>
                    }
                </div>
                <button onClick={handleLogin}>Login</button>
            </div>
        </>
    )
}

export default RestaurantLogin