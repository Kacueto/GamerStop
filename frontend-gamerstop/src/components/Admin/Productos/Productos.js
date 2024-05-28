import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Productos.css';
import AgregarProductoModal from './AgregarProductoModal';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchProductos();
        fetchCategorias();
    }, []);

    const fetchProductos = async () => {
        try {
            const response = await axios.get('http://localhost:8000/inventory/show_products');
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    const fetchCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:8000/inventory/show_categories');
            setCategorias(response.data);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };

    const handleFiltroCategoriaChange = (event) => {
        setFiltroCategoria(event.target.value);
    };

    const filtrarProductosPorCategoria = async () => {
        if (filtroCategoria === '') {
            fetchProductos();
        } else {
            try {
                const response = await axios.get(`http://localhost:8000/inventory/show_products_by_category/${filtroCategoria}`);
                setProductos(response.data);
            } catch (error) {
                console.error('Error al filtrar productos por categoría:', error);
            }
        }
    };

    const handleAbrirModal = () => {
        setIsModalOpen(true);
    };

    const handleCerrarModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <h2>Productos</h2>
            <label htmlFor="filtroCategoria">Filtrar por Categoría:</label>
            <select id="filtroCategoria" value={filtroCategoria} onChange={handleFiltroCategoriaChange}>
                <option value="">Todas las categorías</option>
                {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>{categoria.name}</option>
                ))}
            </select>
            <button className="btn-filtro" onClick={filtrarProductosPorCategoria}>Filtrar</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Imagen</th>
                        <th>Categoría</th>
                        <th className="actions-cell">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.name}</td>
                            <td>{producto.description}</td>
                            <td>{producto.price}</td>
                            <td>{producto.stock}</td>
                            <td><img src={producto.image} alt={producto.name} style={{ width: '50px' }} /></td>
                            <td>{producto.category}</td>
                            <td className="actions-cell">
                                <button className="btn-edit">Editar</button>
                                <button className="btn-delete">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn-add" onClick={handleAbrirModal}>+</button>
            <AgregarProductoModal
                isOpen={isModalOpen}
                onClose={handleCerrarModal}
                onProductoAgregado={fetchProductos}
            />
        </div>
    );
};

export default Productos;
