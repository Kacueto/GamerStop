import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from './Public/CartContext';
import './Product.css';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (product.category) {
            fetchRelatedProducts();
        }
    }, [product]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/inventory/show_product/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const fetchRelatedProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/inventory/show_products_by_category/${product.category}`);
            setRelatedProducts(response.data);
        } catch (error) {
            console.error('Error fetching related products:', error);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value <= product.stock) {
            setQuantity(value);
        }
    };

    const total = (product.price * quantity).toFixed(2);

    return (
        <div className="product-container">
            <div className="product-details">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Precio: ${product.price}</p>
                    <div className="product-purchase">
                        <button className="add-to-cart-btn" onClick={handleAddToCart}>Agregar al carro</button>
                        <label>
                            Cantidad:
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                                max={product.stock}
                            />
                        </label>
                        <p>Total: ${total}</p>
                    </div>
                </div>
            </div>
            <div className="related-products">
                <h3>Productos relacionados</h3>
                <div className="related-products-list">
                    {relatedProducts.map((relatedProduct) => (
                        relatedProduct.id !== product.id && (
                            <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`} className="related-product-item-link">
                                <div className="related-product-item">
                                    <img src={relatedProduct.image} alt={relatedProduct.name} />
                                    <p>{relatedProduct.name}</p>
                                </div>
                            </Link>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Product;
