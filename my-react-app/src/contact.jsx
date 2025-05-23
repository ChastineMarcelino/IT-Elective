import React from 'react';
import { Link } from 'react-router-dom';
import logo from "./assets/logo.png"; 


function Contact() {
  return (
    <div className="contact-container">
      <header className="contact-header">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" /> {/* you can adjust logo */}
        </div>
        <nav>
          <ul className="home-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/about">About</Link></li>
            <li className="active"><Link to="/contact">Contact</Link></li>
            <li className="cart-icon">🛒</li>
          </ul>
        </nav>
      </header>

      <h2 className="contact-title">CONTACT US</h2>

      <form className="contact-form">
        <input type="text" placeholder="Name:" required />
        <input type="email" placeholder="Email:" required />
        <textarea placeholder="Message:" required></textarea>
        <button type="submit">Submit</button>
      </form>

      <div className="contact-info">
        <div className="info-item">
          <div className="info-icon">✉️</div>
          <p>Mamamo8@gmail.com</p>
        </div>
        <div className="info-item">
          <div className="info-icon">📞</div>
          <p>+6398765432109</p>
        </div>
        <div className="info-item">
          <div className="info-icon">📍</div>
          <p>Tagasamin sa bahay</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
