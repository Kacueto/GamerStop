import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditarUsuarioModal from './EditarUsuarioModal';
import '../../../Styles/Usuarios.css';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUsuario, setSelectedUsuario] = useState(null);

    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:8000/auth/user/');
            setUsuarios(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleEditarClick = (usuario) => {
        setSelectedUsuario(usuario);
    };

    const handleCloseModal = () => {
        setSelectedUsuario(null);
        fetchUsuarios(); 
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/auth/user/${id}/`);
            fetchUsuarios(); 
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
        }
    };

    return (
        <div>
            <h2>Usuarios</h2>
            {loading ? (
                <p>Cargando usuarios...</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>Admin</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.firstname}</td>
                                <td>{usuario.lastname}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.address}</td>
                                <td>{usuario.phonenumber}</td>
                                <td>{usuario.admin ? 'Sí' : 'No'}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => handleEditarClick(usuario)}>Editar</button>
                                    <button className="btn-delete" onClick={() => handleDeleteClick(usuario.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {selectedUsuario && <EditarUsuarioModal usuario={selectedUsuario} onClose={handleCloseModal} />}
        </div>
    );
};

export default Usuarios;
