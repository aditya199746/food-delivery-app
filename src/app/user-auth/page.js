"use client"
import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"
import UserSignUp from "../_components/UserSignUp"
import UserLogin from "../_components/UserLogin"
import { useState } from "react"
const UserAuth=(props)=>{
    const [login,setLogin]=useState(true)
    return <div>
        <CustomerHeader />
        <h1>{login? "User Login":'User SignUp'}</h1>
        {login?<UserLogin redirect={props.searchParams} />:<UserSignUp redirect={props.searchParams} /> }
        <button onClick={()=>setLogin(!login)}>
            {login ? "Do not have account ? SignUp":"already have account? Login"}
        </button>
        
        <Footer />
    </div>
}

export default UserAuth