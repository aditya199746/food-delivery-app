
import { useState } from "react"
import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"
import { useRouter } from "next/navigation"
const UserSignUp = (props) => {
    const [name, setName] = useState("")
    const [email, setEamil] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [mobile, setMobile] = useState("")

    const router= useRouter()

    const handleSignUp=async ()=>{
        let response=await fetch("http://localhost:3000/api/user",{
            method:"POST",
            body:JSON.stringify({name,email,password,city,address,mobile})
        })
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
        }
    }
    return <div>
        <CustomerHeader />
        <div>
            <input type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        <div>
            <input type="text" placeholder="Enter email" onChange={(e) => setEamil(e.target.value)} value={email} />
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
        <button onClick={handleSignUp}>SignUp</button>
        </div>

        <Footer />
    </div>
}

export default UserSignUp