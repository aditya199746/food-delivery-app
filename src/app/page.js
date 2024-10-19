"use client"
import { useEffect, useRef, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import Restaurant from "./restaurant/page"
import { useRouter } from "next/navigation";

export default function Home() {
  const [location,setLocation]=useState([])
  const [selectedLocation,setSelectedLocation]=useState("")
  const [showLocation,setShowLocation]=useState(false)
  const[restaurants,setRestaurants]=useState([])
  const hasFetched = useRef()

  const router=useRouter()
  const loadLocations=async ()=>{
    let response=await fetch("http://localhost:3000/api/customer/locations")
    response=await response.json()
    if(response.success){
      setLocation(response.result)
    }
  }

  const loadRestaurants=async (params)=>{
    let url="http://localhost:3000/api/customer"
    if(params?.location){
      url=`http://localhost:3000/api/customer?location=${params.location}`
    } else if(params?.restaurant){
      url=`http://localhost:3000/api/customer?restaurant=${params.restaurant}`
    }
    let response=await fetch(url)
    response=await response.json()
    if(response.success){
      setRestaurants(response.result)
    }
  }
  useEffect(()=>{
    if(hasFetched.current) return;
    hasFetched.current=true
    loadLocations()
    loadRestaurants()
  },[])

  const handleListItem=(loc)=>{
    setSelectedLocation(loc)
    setShowLocation(false)
    loadRestaurants({location:loc})
  }

  return (
      <main>
        <CustomerHeader />
        
        {/* <Restaurant /> */}
        <div>
          <h1>Food delivey</h1>
          <div>
            <input type="text" placeholder="select Place"defaultValue={selectedLocation} onClick={()=>setShowLocation(true)} />
            <ul>
              {
                showLocation&& location.map((loc,idx)=>{
                 return <li onClick={()=>handleListItem(loc)} key={idx}>{loc}</li>
                })
              }
            </ul>
            <input type="text" placeholder="Enter Food or Restaurant name" onChange={(e)=>loadRestaurants({restaurant:e.target.value})} />
          </div>
        </div>
        <div>
        {
          restaurants.map((item)=>{
            return <div onClick={()=>router.push("explore/"+item.resName+"?id="+item._id)} key={item._id}>
              <h3>{item.resName}</h3>
              <h4>Contact: {item.phone}</h4>
              <div>City: {item.city}</div>
              <div>Address: {item.address}</div>
              <div>Email: {item.email}</div>
            </div>
          })
        }
        </div>
        <Footer />
      </main>
  );
}
