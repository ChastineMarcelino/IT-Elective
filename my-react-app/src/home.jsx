import { Link } from "react-router-dom";
import BurgerSplash from "./assets/burger-splash.png"; // <- your burger + splash image
import logo from "./assets/logo.png"; 

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" /> {/* you can adjust logo */}
        </div>
        <nav>
          <ul className="home-nav">
            <li className="active"><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/order">Orders</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><i className="fas fa-shopping-cart"></i></li> {/* Cart icon */}
          </ul>
        </nav>
      </header>

      <div className="hero-section">
        <div className="hero-text">
          <h2>Delicious Burger</h2>
          <h1>Where Flavor<br />Meets Perfection!</h1>
          <p className="hero-description">
            Savor the taste of juicy, grilled perfection, topped with the freshest ingredients
            and served on a soft, toasted bun. Whether you crave classic, cheesy, or spicy, 
            we’ve got the perfect burger for you.
          </p>
          <Link to="/menu"><button className="order-btn">Order Now</button></Link>
        </div>

        <div className="hero-image">
          <img src={BurgerSplash} alt="Burger" className="image" />
        </div>
      </div>
    </div>
  );
}

export default Home;
