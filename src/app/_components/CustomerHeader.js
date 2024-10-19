"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {
    const [cartNumber, setCartNumber] = useState(0);
    const [cartItem, setCartItem] = useState([]);
    const [user, setUser] = useState(undefined);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Access localStorage only in the browser
            const userStorage = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
            const cartStore = localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart"));
            setUser(userStorage || undefined);
            setCartNumber(cartStore?.length || 0);
            setCartItem(cartStore || []);
        }
    }, []);

    useEffect(() => {
        if (props.cartData && cartItem) {
            if (cartNumber) {
                if (cartItem[0].resto_id !== props.cartData.resto_id) {
                    localStorage.removeItem("cart");
                    setCartNumber(1);
                    setCartItem([props.cartData]);
                    localStorage.setItem("cart", JSON.stringify([props.cartData]));
                } else {
                    let localCartItem = [...cartItem];
                    localCartItem.push(props.cartData);
                    setCartItem(localCartItem);
                    setCartNumber(cartNumber + 1);
                    localStorage.setItem("cart", JSON.stringify(localCartItem));
                }
            } else {
                setCartNumber(1);
                setCartItem([props.cartData]);
                localStorage.setItem("cart", JSON.stringify([props.cartData]));
            }
        }
    }, [props.cartData, cartItem, cartNumber]);

    useEffect(() => {
        if (props.removeCartData && cartItem.length) {
            let localCartItem = cartItem.filter((item) => item._id !== props.removeCartData);
            setCartItem(localCartItem);
            setCartNumber(cartNumber - 1);
            localStorage.setItem("cart", JSON.stringify(localCartItem));
            if (localCartItem.length === 0) {
                localStorage.removeItem("cart");
            }
        }
    }, [props.removeCartData, cartItem, cartNumber]);

    const logout = () => {
        localStorage.removeItem("user");
        router.push("/user-auth");
    };

    return (
        <div>
            <div>
                <img src="" alt="img1" />
            </div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {user ? (
                    <>
                        <li>
                            <Link href="/myProfile">{user?.name}</Link>
                        </li>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/">Login</Link>
                        </li>
                        <li>
                            <Link href="/user-auth">SignUp</Link>
                        </li>
                    </>
                )}
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
    );
};

export default CustomerHeader;
