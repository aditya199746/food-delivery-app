"use client"
import { useState } from "react"
import RestaurantLogin from "../_components/RestaurantLogin"
import RestaurantSignUp from "../_components/RestaurantSignUp"
import RestaurantHeader from "../_components/RestaurantHeader"
import RestaurantFooter from "../_components/Footer"
//mongodb+srv://461997adityakumar:461997adityakumar@cluster0.4habl.mongodb.net/
const Restaurant=()=>{
    const [login,setLogin] = useState(true)
    return (
        <>
        <div className="container">
        <RestaurantHeader />
        <h1>Restaurant Login/SignUp Page</h1>
        {
            login ? <RestaurantLogin /> : <RestaurantSignUp />
        }
        <div>
            <button onClick={()=>setLogin(!login)}>
                {login ? "Do not have account? SignUp":"Already have account? Login"}
            </button>
        </div>
        </div>
        <RestaurantFooter />
        </>
    )
}

export default Restaurant;