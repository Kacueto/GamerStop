import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/SideBar.css';

const SideBar = ({ onSidebarItemClick }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleItemClick = (option) => {
        setSelectedOption(option);
        onSidebarItemClick(option); // Llama a la función proporcionada por el padre con la opción seleccionada
    };

    return (
        <div className="sidebar text-white bg-dark">
            <div className="logo">
                <img src="https://via.placeholder.com/100" alt="Admin" className="img-fluid rounded-circle" />
            </div>
            <ul className="nav flex-column mb-auto">
                <li>
                    <button className="nav-link text-white" onClick={() => handleItemClick("Productos")}>
                        <i className="fa fa-cube"></i> Productos
                    </button>
                </li>
                <li>
                    <button className="nav-link text-white" onClick={() => handleItemClick("Usuarios")}>
                        <i className="fa fa-users"></i> Usuarios
                    </button>
                </li>
                <li>
                    <button className="nav-link text-white" onClick={() => handleItemClick("Pedidos")}>
                        <i className="fa fa-shopping-cart"></i> Pedidos
                    </button>
                </li>
                <li>
                    <button className="nav-link text-white" onClick={() => handleItemClick("Categorias")}>
                        <i className="fa fa-cog"></i> Categorias
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;