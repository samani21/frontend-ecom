import React, { useContext, useEffect, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const [keranjang, setKeranjang] = useState([]);
    const [checkout, setCheckout] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInfo = async () => {
            const id = localStorage.getItem('id');
            axios.get(`http://localhost:8000/keranjang/${id}`)
                .then(res => {
                    const keranjang = res.data.data;
                    setKeranjang(keranjang);
                    console.log("asjbaaaajsb", keranjang);
                })
                .catch(error => {
                    console.log(error);
                });
            axios.get(`http://localhost:8000/keranjang/checkout/${id}`)
                .then(res => {
                    const pembayaran = res.data.data;
                    setCheckout(pembayaran.total);
                    console.log("ss", pembayaran.total);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        fetchInfo();
    }, []);

    const handleCheckout = (checkout) => {
        console.log("bayar", checkout);
        const formData = {
            id_user: localStorage.getItem('id'),
            total: checkout
        }
        const jsonData = JSON.stringify(formData);
        axios.post("http://localhost:8000/pembayaran/bayar", jsonData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                navigate('/success')
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        
    }

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {keranjang.map((ker) => (
                <div className="cartitems-format cartitems-format-main" key={ker.id}>
                    <img src={ker.image} alt="" className='cartitems-product-icon' />
                    <p>{ker.name}</p>
                    <p>${ker.new_price}</p>
                    <button className='cartitem-quantity'>{ker.jumlah}</button>
                    <p>${ker.new_price * ker.jumlah}</p>
                    <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(ker.id) }} alt="" />
                </div>
            ))}
            <div className='cartitems-down'>
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${checkout}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Total</p>
                            <h3>${checkout}</h3>
                        </div>
                    </div>
                    <button onClick={() => { handleCheckout(checkout) }}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='promo code' />
                        <button >Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems
