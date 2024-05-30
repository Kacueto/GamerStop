import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Auth/Login.js';
import Home from './components/Home.js';
import Admin from './components/Admin/Admin.js';
import Product from './components/Product.js';
import { CartProvider } from './components/Public/CartContext';
import Navbar from './components/Public/Navbar.js';
import Footer from './components/Public/Footer.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
const App = () => {
  const location = useLocation();
  const showFooter = location.pathname !== '/admin';

  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/product/:id" element={<Product />} />
        
      </Routes>
      {showFooter && <Footer />}
    </CartProvider>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
