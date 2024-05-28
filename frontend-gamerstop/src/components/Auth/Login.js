import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Public/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';

const Login = () => {
    const url = 'http://localhost:8000/auth/login';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(url, {
                email: email,
                password: password
            });

            // Verificar si la autenticación fue exitosa
            if (response.data && response.data.token) {
                const user = response.data.user;
                // Guardar el token en el almacenamiento local
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(user)); // Guardar información del usuario en localStorage
                setError('');
                // Redirigir a la página de admin o home basado en el rol del usuario
                if (user.admin) {
                    navigate('/admin');
                } else {
                    navigate('/home');
                }
            } else {
                setError('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error de autenticación:', error);
            setError('Error de autenticación. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="login-container d-flex justify-content-center align-items-center">
                <div className="login-box p-4">
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contraseña:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                    </form>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default Login;
