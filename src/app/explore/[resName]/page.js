"use client"
import { useEffect, useState } from "react"
import Footer from "../../_components/Footer"
import CustomerHeader from "../../_components/CustomerHeader"

const DetailsPage=(props)=>{
    const name=props.params.resName
    const [restaurantDetails,setRestaurantDetails]=useState()
    const [foodItems,setFoodItems]=useState([])
    const [cartData,setCartData]=useState()
    const [cartStore,setCartStore]=useState(JSON.parse(localStorage.getItem("cart")))
    const [cartIds,setCartIds]=useState( cartStore ?
        ()=> cartStore?.map((item)=>{
        return item._id
    }):[])
    const[removeCartData,setRemoveCartData]=useState()
    const loadRestaurantDetails=async ()=>{
        const id=props.searchParams.id
        let res=await fetch("http://localhost:3000/api/customer/"+id)
        res=await res.json()
        if(res.success){
            setRestaurantDetails(res.details)
            setFoodItems(res.foodItems)
        }
    }
    useEffect(()=>{
loadRestaurantDetails()
    },[])

    const addToCart=(item)=>{
        let localCartIds=cartIds
        localCartIds.push(item._id)
        setCartIds(localCartIds)
        setCartData(item)
        setRemoveCartData()
    }

    const handleRemoveCart=(id)=>{
        setRemoveCartData(id)
        let localIds=cartIds.filter((item=>item!=id))
        setCartIds(localIds)
        setCartData()

    }

    return <div>
        <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
        <div>
            <h1>{decodeURI(name)}</h1>

        </div>
        <div>
            <h3>COntact : {restaurantDetails?.phone}</h3>
            <h3>City : {restaurantDetails?.city}</h3>
            <h3>Address : {restaurantDetails?.address}</h3>
            <h3>Email : {restaurantDetails?.email}</h3>
        </div>
        <div>
            {
               foodItems?.length> 0 ? foodItems?.map((item)=>(
                    <div>
                        <div>{item.name}</div>
                        <div>{item.price}</div>
                        <div>{item.description}</div>
                        <img src={item.imgPath} />
                        {
                            cartIds.includes(item._id) 
                            ? <button onClick={()=>handleRemoveCart(item._id)} >Remove from cart</button>
                            :  <button onClick={()=>addToCart(item)}>Add to cart</button>
                        }
                        
                        
                    </div>
                ))
                : <h1>No Food items for now</h1>
            }
        </div>
        <Footer />
    </div>
}
export default DetailsPage