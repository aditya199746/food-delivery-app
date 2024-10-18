"use client"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
const EditFoodItems
=(props)=>{
    const route=useRouter()
    const [name,setName]=useState("")
    const [price,setPrice]=useState("")
    const [path,setPath]=useState("")
    const [description,setDescription]=useState("")
    const [error,setError]=useState(false)

    const handleEditFoodItem=async ()=>{
        if(!name || !path || !price || !description){
            setError(true)
            return false
        }
        else{
            setError(false)
        }

        let response=await fetch(`http://localhost:3000/api/restaurant/foods/edit/${props.params.id}`,{
            method:"PUT",
            body:JSON.stringify({name,price,imgPath:path,description})
        })
        response=await response.json()
        if(response.success){
            route.push("../dashboard")
        } else{
            alert("data not updated")
        }
    }

    const handleLoadFoodItem= async()=>{
        let response=await fetch(`http://localhost:3000/api/restaurant/foods/edit/${props.params.id}`)
        response=await response.json()
        if(response.success){
            setName(response.result.name)
            setPrice(response.result.price)
            setPath(response.result.imgPath)
            setDescription(response.result.description)
        }
    }

    useEffect(()=>{
        handleLoadFoodItem()
    },[])
    return (
        <div>
            <h1>Update Food Item</h1>
            <div>
                <input type="text" placeholder="Enter Food name"
                value={name} onChange={(e)=>setName(e.target.value)} />
            {error && !name && <span>Please Enter valid Food Name</span>}
            </div>
            <div>
                <input type="text" placeholder="Enter Price"
                value={price} onChange={(e)=>setPrice(e.target.value)} />
            {error && !price && <span>Plaese Enter valid Food price</span>}
            </div>
            <div>
                <input type="text" placeholder="Enter image path"
                value={path} onChange={(e)=>setPath(e.target.value)} />
            {error && !path && <span>Plaese Enter valid Path</span>}
            </div>
            <div>
                <input type="text" placeholder="Enter Food Description"
                value={description} onChange={(e)=>setDescription(e.target.value)} />
            {error && !description && <span>Plaese Enter valid Description</span>}
            </div>
            <div>
                <button onClick={handleEditFoodItem}>Update Food Item</button>
            </div>
            <div>
                <button onClick={()=>route.push(`../dashboard`)}>Back to Dashboard</button>
            </div>
        </div>
    )
}

export default EditFoodItems
