import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {
        const productExists = cart.some(item => item.id === product.id);
        if (!productExists) {
            setCart([...cart, { ...product, quantity }]);
        }
    };

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartItemCount }}>
            {children}
        </CartContext.Provider>
    );
};
