import { Link } from "react-router-dom";
import "./index.css"; // Import CSS file
import logo from "./assets/logo.png"; 


function About() {
  return (
    <div className="about-container">
      {/* Navbar */}
      <header className="about-header">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" /> {/* you can adjust logo */}
        </div>
        <nav>
          <ul className="home-nav">
            <li ><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/order">Orders</Link></li>
            <li className="active"><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      {/* About Section */}
      <div className="about-content">
        <h2 className="about-heading">Delicious Burgers</h2>
        <p className="about-text">
          Welcome to Delicious Burger, your go-to destination for mouthwatering, handcrafted burgers
          made with the freshest ingredients. Our website offers a seamless browsing experience,
          allowing you to explore our diverse menu featuring juicy beef patties, crispy chicken burgers,
          plant-based options, and gourmet sides.
        </p>
        <button className="about-btn">Learn More</button>
      </div>
    </div>
  );
}
export default About;