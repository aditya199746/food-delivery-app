
import { useState } from "react"
import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"
import { useRouter } from "next/navigation"
const UserLogin = (props) => {
    const [email, setEamil] = useState("")
    const [password, setPassword] = useState("")

    const router= useRouter()

    const handleLogin=async ()=>{
        let response=await fetch("http://localhost:3000/api/user/login",{
            method:"POST",
            body:JSON.stringify({email,password})
        });
        response=await response.json();
        if(response.success){
            const {result} = response
            delete result.password
            localStorage.setItem("user",JSON.stringify(result))
            if(props?.redirect?.order){
                router.push("/order")
            }
            else{
                router.push("/")
            }
           
        } else{
            alert("failed to login, please try again with corret email and password")
        }
    }
    return <div>
        <div>
            <input type="text" placeholder="enter email" value={email} onChange={(e)=>setEamil(e.target.value)} />
        </div>
        <div>
            <input type="text" placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    </div>
}

export default UserLogin