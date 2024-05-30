import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { CartContext } from './CartContext';
import Cart from './Cart';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';  // Si tienes estilos adicionales, de lo contrario omite esto

const Navbar = () => {
    const { cartItemCount } = useContext(CartContext);
    const location = useLocation();
    const [categorias, setCategorias] = useState([]);
    const [articulos, setArticulos] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:8000/inventory/show_categories');
            setCategorias(response.data);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };

    const fetchArticulos = async (categoryId) => {
        try {
            const response = await axios.get(`http://localhost:8000/inventory/show_products_by_category/${categoryId}`);
            setArticulos(prevState => ({ ...prevState, [categoryId]: response.data }));
        } catch (error) {
            console.error('Error al obtener artículos:', error);
        }
    };

    const handleMouseEnter = (categoryId) => {
        if (!articulos[categoryId]) {
            fetchArticulos(categoryId);
        }
        setSelectedCategory(categoryId);
    };

    const handleMouseLeave = () => {
        setSelectedCategory(null);
    };

    const shouldShowCategories = location.pathname !== '/admin';
    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
                <div className="container-fluid">
                    <Link className="navbar-brand text-red font-weight-bold" to="/">GamerStop</Link>
                    {location.pathname !== '/login' && (
                        <form className="d-flex ms-3">
                            <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Buscar</button>
                        </form>
                    )}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/login"><FaUser /></Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link text-dark position-relative btn" onClick={toggleCart}>
                                    <FaShoppingCart />
                                    {cartItemCount > 0 && (
                                        <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">{cartItemCount}</span>
                                    )}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {shouldShowCategories && (
                <div className="bg-light py-2">
                    <div className="container-fluid">
                        <ul className="nav justify-content-start"> {/* Ajuste para alinear a la izquierda */}
                            {categorias.map(categoria => (
                                <li className="nav-item dropdown" key={categoria.id}
                                    onMouseEnter={() => handleMouseEnter(categoria.id)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div 
                                        className="nav-link text-dark" 
                                        href="#" 
                                        id={`categoryDropdown${categoria.id}`} 
                                        role="button"
                                    >
                                        {categoria.name}
                                    </div>
                                    {selectedCategory === categoria.id && articulos[categoria.id] && (
                                        <ul className="dropdown-menu show" aria-labelledby={`categoryDropdown${categoria.id}`} style={{display: 'block'}}>
                                            {articulos[categoria.id].map(articulo => (
                                                <li key={articulo.id}>
                                                    <Link className="dropdown-item" to={`/product/${articulo.id}`}>{articulo.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <Cart isOpen={isCartOpen} onClose={toggleCart} />
        </>
    );
};

export default Navbar;
