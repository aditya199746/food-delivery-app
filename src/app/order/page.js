"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { Delivery_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Order = () => {
    const [cartStorage, setCartStorage] = useState([]);
    const [total, setTotal] = useState(0);
    const [removeCartData, setRemoveCartData] = useState(false);
    const [userStorage, setUserStorage] = useState({});
    const router = useRouter();

    useEffect(() => {
        // Safe localStorage access after the component has mounted
        if (typeof window !== "undefined") {
            const storedCart = localStorage?.getItem("cart")
                ? JSON.parse(localStorage.getItem("cart"))
                : [];
            setCartStorage(storedCart);

            const storedUser = localStorage?.getItem("user")
                ? JSON.parse(localStorage.getItem("user"))
                : {};
            setUserStorage(storedUser);

            // Calculate total price
            if (storedCart.length === 1) {
                setTotal(storedCart[0].price);
            } else if (storedCart.length > 1) {
                const totalPrice = storedCart.reduce((a, b) => {
                    return a.price + b.price;
                });
                setTotal(totalPrice);
            }
        }
    }, []);

    useEffect(() => {
        if (!total) {
            router.push('/');
        }
    }, [total]);

    const handlePlaceOrder = async () => {
        if (typeof window !== "undefined") {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");

            const foodItemIds = cart.map((item) => item._id).toString();
            const city = user.city;

            // Fetch delivery partner data
            let deliveryBoyRes = await fetch(`http://localhost:3000/api/deliverypartners/${city}`);
            deliveryBoyRes = await deliveryBoyRes.json();
            const deliveryBoyIds = deliveryBoyRes.result.map((item) => item._id);

            // Assign a random delivery partner
            const deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)];

            const collection = {
                user_id: user._id,
                resto_id: cart[0].resto_id,
                foodItemIds,
                deliveryBoy_id,
                status: "confirm",
                amount: total + ((total * TAX) / 100) + Delivery_CHARGES,
            };

            let response = await fetch("http://localhost:3000/api/order", {
                method: "POST",
                body: JSON.stringify(collection),
            });
            response = await response.json();

            if (response.success) {
                setRemoveCartData(true);
                router.push("/myProfile");
            } else {
                alert("Order failed");
            }
        }
    };

    return (
        <div>
            <CustomerHeader removeCartData={removeCartData} />
            <div>
                <h2>User Details</h2>
                <div>
                    <span>Name: </span>
                    <span>{userStorage.name}</span>
                </div>
                <div>
                    <span>Address: </span>
                    <span>{userStorage.address}</span>
                </div>
                <div>
                    <span>Mobile number: </span>
                    <span>{userStorage.mobile}</span>
                </div>
            </div>
            <h2>Amount Details</h2>
            <div>
                <div>
                    <span>Food Charges: </span>
                    <span>{total}</span>
                </div>
                <div>
                    <span>Tax: </span>
                    <span>{(total * TAX) / 100}</span>
                </div>
                <div>
                    <span>Delivery Charges: </span>
                    <span>{Delivery_CHARGES}</span>
                </div>
                <div>
                    <span>Total Amount: </span>
                    <span>{total + ((total * TAX) / 100) + Delivery_CHARGES}</span>
                </div>
            </div>
            <h2>Payment Method</h2>
            <div>
                <span>Cash on Delivery</span>
                <span>{total + ((total * TAX) / 100) + Delivery_CHARGES}</span>
            </div>
            <div>
                <button onClick={handlePlaceOrder}>Place your Order Now</button>
            </div>
            <Footer />
        </div>
    );
};

export default Order;
