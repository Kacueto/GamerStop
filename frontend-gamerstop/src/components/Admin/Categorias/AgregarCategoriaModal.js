import React, { useState } from 'react';
import axios from 'axios';


const AgregarCategoriaModal = ({ onClose }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleGuardarCambios = async () => {
        const data = {
            name: nombre,
            description: descripcion,
        };

        try {
            await axios.post('http://localhost:8000/inventory/add_category', data);
            console.log('Categoría agregada exitosamente');
            onClose(); // Cierra el modal después de agregar
        } catch (error) {
            console.error('Error al agregar categoría:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Agregar Categoría</h2>
                <form>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Descripción:</label>
                        <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    </div>
                    <button type="button" className="btn-save" onClick={handleGuardarCambios}>Guardar cambios</button>
                </form>
            </div>
        </div>
    );
};

export default AgregarCategoriaModal;
