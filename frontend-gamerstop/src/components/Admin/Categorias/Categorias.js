import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditarCategoriaModal from './EditarCategoriaModal';
import AgregarCategoriaModal from './AgregarCategoriaModal';
import '../../../Styles/Categorias.css';

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [showAgregarModal, setShowAgregarModal] = useState(false);

    const fetchCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:8000/inventory/show_categories');
            setCategorias(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    const handleEditarClick = (categoria) => {
        setSelectedCategoria(categoria);
    };

    const handleCloseModal = () => {
        setSelectedCategoria(null);
        setShowAgregarModal(false);
        fetchCategorias(); // Actualizar la tabla de categorías después de editar o agregar
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/inventory/delete_category/${id}/`);
            fetchCategorias(); // Actualizar la tabla de categorías después de eliminar
        } catch (error) {
            console.error('Error al eliminar categoría:', error);
        }
    };

    const handleAgregarClick = () => {
        setShowAgregarModal(true);
    };

    return (
        <div>
            <h2>Categorías</h2>
            {loading ? (
                <p>Cargando categorías...</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((categoria, index) => (
                            <tr key={index}>
                                <td>{categoria.id}</td>
                                <td>{categoria.name}</td>
                                <td>{categoria.description}</td>
                                <td className="actions-cell">
                                    <button className="btn-edit" onClick={() => handleEditarClick(categoria)}>Editar</button>
                                    <button className="btn-delete" onClick={() => handleDeleteClick(categoria.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {selectedCategoria && <EditarCategoriaModal categoria={selectedCategoria} onClose={handleCloseModal} />}
            {showAgregarModal && <AgregarCategoriaModal onClose={handleCloseModal} />}
            <button className="btn-add" onClick={handleAgregarClick}>+</button>
        </div>
    );
};

export default Categorias;
