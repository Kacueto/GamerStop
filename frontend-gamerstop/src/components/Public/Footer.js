import React from 'react';

const Footer = () => {
    return (
        
        <footer>
            
            <div className="footer-container">
                <div className="footer-left">
                    <h1 className="footer-logo">Gamer Stop</h1>
                    <p>Hagámoslo realidad.</p>
                    <div className="social-media">
                        <a href="https://www.instagram.com/gamerstop_barranquilla/"><img src="" alt="Instagram"/></a>
                        <a href="https://api.whatsapp.com/send/?phone=573173594953&text&type=phone_number&app_absent=0"><img src="" alt="WhatsApp"/></a>
                        <a href="https://web.facebook.com/profile.php?id=100067717360685"><img src="" alt="Facebook"/></a>
                        
                    </div>
                </div>
                <div className="footer-center">
                    <ul>
                        <li><a href="#">Nuestra empresa</a></li>
                        <li><a href="#">Créditos nacionales</a></li>
                        <li><a href="#">Seminuevos</a></li>
                        <li><a href="#">Políticas y Términos y condiciones</a></li>
                        <li><a href="#">PQRS</a></li>
                        <li><a href="#">Trabaja con nosotros</a></li>
                        <li><a href="#">Fé de erratas</a></li>
                    </ul>
                </div>
                <div className="footer-right">
                    <p>Whatsapp:</p>
                    <p>(+57) 3173594953</p>
                    <p>Horario:</p>
                    <p>L-S 9:00 a.m. a 8:00 p.m.</p>
                    <p>D-F 10:00 a.m. a 4:00 p.m.</p>
                    <p>C. 84 #47 - 39, Barranquilla, Atlántico</p>
                    <div className="partners">
                        <img src="" alt="Bancolombia"/>
                        <img src="" alt="Davivienda"/>
                        <img src="" alt="Visa"/>
                        <img src="" alt="Mastercard"/>
                        <img src="" alt="Coordinadora"/>
                        <img src="" alt="Servientrega"/>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2023 GamerStopBarranquilla.com. Todos los derechos reservados</p>
            </div>
        </footer>
    );
};

export default Footer;
