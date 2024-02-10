import React, { createContext, useEffect, useState } from 'react'
import axios from "axios";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [keranjang, setKeranjang] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8000/product")
            .then(res => {
                const product = res.data.data;
                setAll_Product(product);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        console.log(itemId);
        const formData = {
            id_product: itemId,
            id_user: localStorage.getItem('id')
        }
        console.log(formData)
        const jsonData = JSON.stringify(formData);
        axios.post("http://localhost:8000/keranjang/upload", jsonData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        console.log(cartItems);
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item]) {
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        const id = localStorage.getItem('id');
        axios.get(`http://localhost:8000/keranjang/total/${id}`)
            .then(res => {
                const total = res.data.data;
                setKeranjang(total);
                console.log("asjbajsb", total);
            })
            .catch(error => {
                console.log(error);
            });
        return keranjang
    }

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
