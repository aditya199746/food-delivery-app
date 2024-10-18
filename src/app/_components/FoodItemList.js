import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
const FoodItemList = () => {
    const route =useRouter()
    const [items, setItems] = useState([])
    const loadFoodItems = async () => {
        const resData=JSON.parse(localStorage.getItem("restaurantUser"))
        let response = await fetch(`http://localhost:3000/api/restaurant/foods/${resData._id}`)
        response = await response.json()
        if (response.success) {
            setItems(response.result)
        }
        else {
            alert("No food items from DB")
        }
    }
    useEffect(() => {
        loadFoodItems()
    }, [])

    const handleDelete=async(id)=>{
        let response= await fetch(`http://localhost:3000/api/restaurant/foods/${id}`,{
            method:"DELETE",
        })
        response=await response.json()
        if(response.success){
            loadFoodItems()
        } else{
            alert("deleted foof item")
        }
    }
    return (
        <div>
            <h1>Food Items</h1>
            <table>
                <thead>
                    <tr>
                        <td>S.N</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Image</td>
                        <td>Operations</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        items && items.map((item, key) => {
                           return <tr key={key}>
                                <td>{key+1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td><img src={item.imgPath} style={{width:"50px"}} /></td>
                                <td>
                                    <button onClick={()=>handleDelete(item._id)}>Delete</button>
                                    <button onClick={()=>route.push(`dashboard/${item._id}`)}>Edit</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default FoodItemList