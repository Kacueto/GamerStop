import React, { useState } from 'react';
import axios from 'axios';
import '../../../Styles/EditarCategoriaModal.css';

const EditarCategoriaModal = ({ categoria, onClose }) => {
    const [nombre, setNombre] = useState(categoria.name);
    const [descripcion, setDescripcion] = useState(categoria.description);

    const handleGuardarCambios = async () => {
        const data = {
            name: nombre,
            description: descripcion,
        };

        try {
            await axios.put(`http://localhost:8000/inventory/edit_category/${categoria.id}/`, data);
            console.log('Categoría editada exitosamente');
            onClose(); // Cierra el modal después de editar
        } catch (error) {
            console.error('Error al editar categoría:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Editar Categoría</h2>
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

export default EditarCategoriaModal;
