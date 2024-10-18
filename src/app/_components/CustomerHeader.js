"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const CustomerHeader = (props) => {
    const userStorage =localStorage.getItem("user")&& JSON.parse(localStorage.getItem("user"))
    const cartStore =localStorage.getItem("cart")&& JSON.parse(localStorage.getItem("cart"))
    const [cartNumber, setCartNumber] = useState(cartStore?.length)
    const [cartItem, setCartItem] = useState(cartStore)
    const [user, setUser] = useState(userStorage ? userStorage : undefined)
    const router=useRouter()

    useEffect(() => {
        if (props.cartData) {
            if (cartNumber) {
                if (cartItem[0].resto_id != props.cartData.resto_id) {
                    localStorage.removeItem("cart")
                    setCartNumber(1)
                    setCartItem([props.cartData])
                    localStorage.setItem("cart", JSON.stringify([props.cartData]))
                }
                else {
                    let localCartItem = cartItem
                    localCartItem.push(JSON.parse(JSON.stringify(props.cartData)))
                    setCartItem(localCartItem)
                    setCartNumber(cartNumber + 1)
                    localStorage.setItem("cart", JSON.stringify(localCartItem))
                }

            } else {
                setCartNumber(1)
                setCartItem([props.cartData])
                localStorage.setItem("cart", JSON.stringify([props.cartData]))
            }

        }
    }, [props.cartData])

    useEffect(() => {
        if (props.removeCartData) {
            let localCartItem = cartItem.filter((item) => {
                return item._id !== props.removeCartData
            })
            setCartItem(localCartItem)
            setCartNumber(cartNumber - 1)
            localStorage.setItem("card", JSON.stringify(localCartItem))
            if (localCartItem.length === 0) {
                localStorage.removeItem("cart")
            }
        }

    }, props.removeCartData)

    useEffect(()=>{
        if(props.removeCartData){
            setCartItem([])
            setCartNumber(0)
            localStorage.removeItem("cart")
        }
    },[props.removeCartData])

    const logout =()=>{
        localStorage.removeItem("user")
        router.push("/user-auth")
    }
    
    return <div>
        <div>
            <img />
        </div>
        <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            {
                user ? <>
                    <li>
                        <Link href="/myProfile">{user?.name}</Link>
                    </li>
                    <li>
                        <button onClick={logout}>Logout</button>
                    </li>
                </>
                    : <>
                        <li>
                            <Link href="/">Login</Link>
                        </li>
                        <li>
                            <Link href="/user-auth">SignUp</Link>
                        </li>
                    </>
            }
            <li>
                <Link href={cartNumber ? "/cart" : "#"}>Cart ({cartNumber || 0})</Link>
            </li>
            <li>
                <Link href="/">Add Restaurant</Link>
            </li>
            <li>
                <Link href="/deliverypartner">Delivery Partner</Link>
            </li>
        </ul>
    </div>
}
export default CustomerHeader