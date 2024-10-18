import React, { useState } from "react"
const AddFoodItem=(props)=>{
    const [name,setName]=useState("")
    const [price,setPrice]=useState("")
    const [path,setPath]=useState("")
    const [description,setDescription]=useState("")
    const [error,setError]=useState(false)

    const handleFoodItem=async ()=>{
        if(!name || !path || !price || !description){
            setError(true)
            return false
        }
        else{
            setError(false)
        }
        const resData=JSON.parse(localStorage.getItem("restaurantUser"))
        let resto_id
        if(resData){
            resto_id=resData._id
        }
        let response=await fetch("http://localhost:3000/api/restaurant/foods",{
            method:"POST",
            body:JSON.stringify({name,price,imgPath:path,description,resto_id})
        })
        response=await response.json()
        if(response.success){
            alert("added food")
            props.setAddItem(false)
        }
        else{
            alert(" food item not added")
        }
    }
    return (
        <div>
            <h1>Add Food Item</h1>
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
                <button onClick={handleFoodItem}>Add Food Item</button>
            </div>
        </div>
    )
}

export default AddFoodItem