import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from '../Assets/images/image1.jpeg';
import image2 from '../Assets/images/image2.jpeg';
import image3 from '../Assets/images/image3.jpeg';
import image4 from '../Assets/images/image4.jpeg';
import image5 from '../Assets/images/image5.jpeg';
import image6 from '../Assets/images/image6.jpeg';
import image7 from '../Assets/images/image7.jpeg'; 
import axios from 'axios';
import { Link } from 'react-router-dom';


const Home = () => {
    const [randomProducts, setRandomProducts] = useState([]);

    useEffect(() => {
        fetchRandomProducts();
    }, []);

    const fetchRandomProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/inventory/random_products/');
            setRandomProducts(response.data);
            console.log('Random products:', response.data); // Añade este log para verificar los datos
        } catch (error) {
            console.error('Error fetching random products:', error);
        }
    };

    return (
        <div className="contenedorcarrusel">
            <div className="container mt-5">
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5" aria-label="Slide 6"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="6" aria-label="Slide 7"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={image1} className="d-block w-100" alt="First slide"/>
                        </div>
                        <div className="carousel-item">
                            <img src={image2} className="d-block w-100" alt="Second slide"/>
                        </div>
                        <div className="carousel-item">
                            <img src={image3} className="d-block w-100" alt="Third slide"/>
                        </div>
                        <div className="carousel-item">
                            <img src={image4} className="d-block w-100" alt="Fourth slide"/>
                        </div>
                        <div className="carousel-item">
                            <img src={image5} className="d-block w-100" alt="Fifth slide"/>
                        </div>
                        <div className="carousel-item">
                            <img src={image6} className="d-block w-100" alt="Sixth slide"/>
                        </div>
                        <div className="carousel-item">
                            <img src={image7} className="d-block w-100" alt="Seventh slide"/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    {randomProducts.map(product => (
                        <div className="col-12 col-md-6 col-lg-4 mb-4" key={product.id}>
                            <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                                <div className="card h-100">
                                    <img src={product.image} className="card-img-top" alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.description}</p>
                                        <p className="card-text">${product.price}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
