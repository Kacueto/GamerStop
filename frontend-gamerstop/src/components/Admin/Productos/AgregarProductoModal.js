import React, { useState } from 'react';
import axios from 'axios';
import './AgregarProductoModal.css'; // Asegúrate de que los estilos estén correctos

const AgregarProductoModal = ({ isOpen, onClose, onProductoAgregado, categorias }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');

    const handleGuardarCambios = async () => {
        try {
            const nuevoProducto = { name, description, price, stock, image, category };
            console.log('Datos del nuevo producto:', JSON.stringify(nuevoProducto, null, 2));
            const response = await axios.post('http://localhost:8000/inventory/add_product', nuevoProducto);
            console.log('Respuesta del servidor:', response);
            onProductoAgregado();
            onClose();
        } catch (error) {
            console.error('Error al agregar producto:', error.response ? error.response.data : error.message);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Agregar Producto</h2>
                <form>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Descripción:</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Precio:</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Stock:</label>
                        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Imagen (URL):</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Categoría:</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Seleccione una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>{categoria.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="button" className="btn-save" onClick={handleGuardarCambios}>Guardar cambios</button>
                </form>
            </div>
        </div>
    );
};

export default AgregarProductoModal;
