"use client";
import { useEffect, useRef, useState } from "react";
import Footer from "../../_components/Footer";
import CustomerHeader from "../../_components/CustomerHeader";

const DetailsPage = (props) => {
    const name = props.params.resName;
    const [restaurantDetails, setRestaurantDetails] = useState();
    const [foodItems, setFoodItems] = useState([]);
    const [cartData, setCartData] = useState();
    const [cartStore, setCartStore] = useState([]);
    const [cartIds, setCartIds] = useState([]);
    const [removeCartData, setRemoveCartData] = useState();
    const hasFetched = useRef(false);

    const loadRestaurantDetails = async () => {
        const id = props.searchParams.id;
        let res = await fetch(`http://localhost:3000/api/customer/${id}`);
        res = await res.json();
        if (res.success) {
            setRestaurantDetails(res.details);
            setFoodItems(res.foodItems);
        }
    };

    // Load restaurant details and handle initial localStorage access
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        loadRestaurantDetails();

        // Safe localStorage access after component mounts
        if (typeof window !== "undefined") {
            const storedCart = JSON.parse(localStorage?.getItem("cart") || "[]");
            setCartStore(storedCart);

            const storedCartIds = storedCart.map((item) => item._id);
            setCartIds(storedCartIds);
        }
    }, []);

    const addToCart = (item) => {
        const localCartIds = [...cartIds, item._id];
        setCartIds(localCartIds);
        setCartData(item);
        setRemoveCartData();

        const updatedCart = [...cartStore, item];
        setCartStore(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleRemoveCart = (id) => {
        const localIds = cartIds.filter((item) => item !== id);
        setCartIds(localIds);
        setCartData();

        const updatedCart = cartStore.filter((item) => item._id !== id);
        setCartStore(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        if (updatedCart.length === 0) {
            localStorage.removeItem("cart");
        }
    };

    return (
        <div>
            <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
            <div>
                <h1>{decodeURI(name)}</h1>
            </div>
            <div>
                <h3>Contact: {restaurantDetails?.phone}</h3>
                <h3>City: {restaurantDetails?.city}</h3>
                <h3>Address: {restaurantDetails?.address}</h3>
                <h3>Email: {restaurantDetails?.email}</h3>
            </div>
            <div>
                {foodItems?.length > 0 ? (
                    foodItems.map((item, idx) => (
                        <div key={`${item.name}${idx}`}>
                            <div>{item.name}</div>
                            <div>{item.price}</div>
                            <div>{item.description}</div>
                            <img src="" alt="img6" width={200} />
                            {cartIds.includes(item._id) ? (
                                <button onClick={() => handleRemoveCart(item._id)}>Remove from cart</button>
                            ) : (
                                <button onClick={() => addToCart(item)}>Add to cart</button>
                            )}
                        </div>
                    ))
                ) : (
                    <h1>No Food items for now</h1>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default DetailsPage;
