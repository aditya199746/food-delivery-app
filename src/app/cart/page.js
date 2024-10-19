"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { Delivery_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
    const [cartStorage, setCartStorage] = useState([]);
    const [total, setTotal] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Access localStorage only in the browser
            const storedCart = localStorage.getItem("cart")
                ? JSON.parse(localStorage.getItem("cart"))
                : [];
            setCartStorage(storedCart);

            // Calculate the total price
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

    const orderNow = () => {
        const user = localStorage.getItem("user");
        if (user) {
            router.push("/order");
        } else {
            router.push("/user-auth?order=true");
        }
    };

    const handleRemoveCart = (id) => {
        const updatedCart = cartStorage.filter((item) => item._id !== id);
        setCartStorage(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        if (updatedCart.length === 0) {
            localStorage.removeItem("cart");
        }
    };

    return (
        <div>
            <CustomerHeader />
            <div>
                {cartStorage.length > 0 ? (
                    cartStorage.map((item, key) => (
                        <div key={key}>
                            <div>{item.name}</div>
                            <div>{item.price}</div>
                            <div>{item.description}</div>
                            <img src="" alt="img5" />
                            <button onClick={() => handleRemoveCart(item._id)}>
                                Remove from cart
                            </button>
                        </div>
                    ))
                ) : (
                    <h1>No Food items for now</h1>
                )}
            </div>
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
                    <span>{total + (total * TAX) / 100 + Delivery_CHARGES}</span>
                </div>
            </div>
            <div>
                <button onClick={orderNow}>Order Now</button>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
