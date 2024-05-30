import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './Cart.css';
import axios from 'axios';

const Cart = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);

    const handlePlaceOrder = async () => {
        const orderDetails = cart.map(item => ({
            product: item.id,
            quantity: item.quantity,
            price: item.price,
            sub_total: item.quantity * item.price,
        }));

        const totalPrice = orderDetails.reduce((total, item) => total + item.sub_total, 0);

        const order = {
            order: {
                user: 4, // ID del usuario (por ahora fijo)
                total_price: totalPrice,
                status: "Pending"
            },
            orderdetails: orderDetails
        };

        console.log('Order JSON:', JSON.stringify(order, null, 2)); // Para revisar el JSON en la consola

        try {
            const response = await axios.post('http://localhost:8000/purchase/create/', order);
            console.log('Order response:', response.data);
            clearCart();
            onClose();
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className={`cart ${isOpen ? 'open' : ''}`}>
            <div className="cart-header">
                <h2>Carro de compras</h2>
                <button onClick={onClose} className="close-btn">&times;</button>
            </div>
            <div className="cart-body">
                {cart.length === 0 ? (
                    <p className='Parrafo-vacio'>Tu carro se encuentra vacio</p>
                ) : (
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4>{item.name}</h4>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: ${item.price}</p>
                                </div>
                                <button className="remove-btn" onClick={() => removeFromCart(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {cart.length > 0 && (
                <div className="cart-footer">
                    <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
