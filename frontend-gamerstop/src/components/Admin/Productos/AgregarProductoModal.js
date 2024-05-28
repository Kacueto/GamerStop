import React, { useState } from 'react';
import axios from 'axios';
import './AgregarProductoModal.css';

const AgregarProductoModal = ({ isOpen, onClose, onProductoAgregado }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');

    const handleGuardarCambios = async () => {
        try {
            const nuevoProducto = { name, description, price, stock, image, category };
            await axios.post('http://localhost:8000/inventory/add_product', nuevoProducto);
            onProductoAgregado(); // Para actualizar la lista de productos en el componente principal
            onClose();
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Agregar Producto</h2>
                <form>
                    <label>
                        Nombre:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>
                        Descripción:
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <label>
                        Precio:
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </label>
                    <label>
                        Stock:
                        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
                    </label>
                    <label>
                        Imagen (URL):
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                    </label>
                    <label>
                        Categoría:
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                    </label>
                </form>
                <div className="modal-actions">
                    <button onClick={handleGuardarCambios}>Guardar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default AgregarProductoModal;