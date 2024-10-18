"use client"
import React, { useState } from "react"
import AddFoodItem from "../../_components/AddFoodItem"
import RestaurantHeader from "../../_components/RestaurantHeader"
import FoodItemList from "../../_components/FoodItemList"

const Dashboard=()=>{
    const [addItem,setAddItem]=useState(false)
    return <div>
        <RestaurantHeader />
        <button onClick={()=>setAddItem(true)}>Add Food Item</button>
        <button onClick={()=>setAddItem(false)}>Dashboard</button>
        {
            addItem ? <AddFoodItem setAddItem={setAddItem} /> : <FoodItemList />
        }
        
    </div>
}
export default Dashboard