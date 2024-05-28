
import React, { useState } from 'react';
import axios from 'axios';
import '../../../Styles/modal.css'; 

const EditarUsuarioModal = ({ usuario, onClose }) => {
    const [nombre, setNombre] = useState(usuario.firstname);
    const [apellido, setApellido] = useState(usuario.lastname);
    const [email, setEmail] = useState(usuario.email);
    const [direccion, setDireccion] = useState(usuario.address);
    const [telefono, setTelefono] = useState(usuario.phonenumber);
    const [admin, setAdmin] = useState(usuario.admin);

    const handleGuardarCambios = async () => {
        const data = {
            firstname: nombre,
            lastname: apellido,
            email: email,
            address: direccion,
            phonenumber: telefono,
            admin: admin
        };
        try {
            await axios.put(`http://localhost:8000/auth/edit_user/${usuario.id}/`, data);
            console.log('Usuario editado exitosamente');
            onClose(); 
        } catch (error) {
            console.error('Error al editar usuario:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Editar Usuario</h2>
                <form>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Apellido:</label>
                        <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Dirección:</label>
                        <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Teléfono:</label>
                        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Admin:</label>
                        <input type="checkbox" checked={admin} onChange={(e) => setAdmin(e.target.checked)} />
                    </div>
                    <button type="button" onClick={handleGuardarCambios}>Guardar cambios</button>
                </form>
            </div>
        </div>
    );
};

export default EditarUsuarioModal;