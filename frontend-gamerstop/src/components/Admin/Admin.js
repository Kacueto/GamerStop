import React, { useState } from 'react';
import Navbar from '../Public/Navbar';
import AdminSidebar from './SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/Admin.css'; 
import Productos from './Productos/Productos';
import Usuarios from './Usuarios/Usuarios';
import Pedidos from './Pedidos';
import Categorias from './Categorias/Categorias';

const Admin = () => {
    const [selectedOption, setSelectedOption] = useState("Dashboard");

    const handleSidebarItemClick = (option) => {
        setSelectedOption(option);
    };

    const renderComponent = () => {
        switch(selectedOption) {
            case "Productos":
                return <Productos />;
            case "Usuarios":
                return <Usuarios />;
            case "Pedidos":
                return <Pedidos />;
            case "Categorias":
                return <Categorias />;
            default:
                return null;
        }
    };

    return (
        <div>
            <Navbar />
            <AdminSidebar onSidebarItemClick={handleSidebarItemClick} />
            <div className="content"> {/* Contenedor para el contenido */}
                <div className="container-fluid">
                    <div className="p-4">
                        {renderComponent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;