import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import beefBurger from './assets/beef-burger.jpg';
import teriyakiBurger from './assets/Teriyaki-Burgers-recipe.jpg';
import muffalettaBurger from './assets/Muffaletta-burger.jpg';
import mushroomSwissBurger from './assets/Mushroom-Swiss-burger.jpg';
import BufalloChicken from './assets/bufallo-chicken.jpg';
import grilledChecken from './assets/grilled.jpg';
import baconCheese from './assets/bacon-cheese.jpg';
import Egg from './assets/Egg-burger-scaled.jpg';
import logo from "./assets/logo.png"; // <- your burger + splash image


function Menu() {
  const defaultProducts = [
    { id: 1, name: "Juicy beef burger", price: 85, image: beefBurger },
    { id: 2, name: "Teriyaki burger", price: 105, image: teriyakiBurger },
    { id: 3, name: "Muffaletta burger", price: 95, image: muffalettaBurger },
    { id: 4, name: "Mushroom Swiss burger", price: 75, image: mushroomSwissBurger },
    { id: 5, name: "Buffalo chicken burger", price: 95, image: BufalloChicken },
    { id: 6, name: "Grilled chicken burger", price: 85, image: grilledChecken },
    { id: 7, name: "Bacon cheese burger", price: 135, image: baconCheese },
    { id: 8, name: "Egg burger", price: 65, image: Egg },
  ];

  const [addedProducts, setAddedProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });
  const [showModal, setShowModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setAddedProducts(storedProducts);
  }, []);

  const saveAddedProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
    setAddedProducts(products);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.product.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const placeOrder = () => {
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

    const newOrders = cart.map(item => ({
      id: Date.now() + Math.floor(Math.random() * 1000),
      product: item.product.name,
      size: `${item.quantity} pcs`,
      addOns: 'None',
      price: item.product.price * item.quantity,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    }));

    const updatedOrders = [...existingOrders, ...newOrders];

    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setCart([]);
    setShowCart(false);
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProduct(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const addNewProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert('Please fill all fields');
      return;
    }
    const newId = Date.now();
    const productToAdd = { id: newId, ...newProduct, price: Number(newProduct.price) };
    const updated = [...addedProducts, productToAdd];
    saveAddedProducts(updated);
    setNewProduct({ name: '', price: '', image: '' });
    setShowModal(false);
  };

  const deleteProduct = (id) => {
    const updated = addedProducts.filter(product => product.id !== id);
    saveAddedProducts(updated);
  };

  const allProducts = [...defaultProducts, ...addedProducts];
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="menu-container">
      <header className="menu-header">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" /> {/* you can adjust logo */}
        </div>
        <nav>
          <ul className="home-nav">
            <li><Link to="/">Home</Link></li>
            <li className="active"><Link to="/menu">Menu</Link></li>
            <li><Link to="/order">Orders</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li className="cart-icon" onClick={() => setShowCart(true)} style={{ cursor: 'pointer' }}>
              🛒 {cart.reduce((total, item) => total + item.quantity, 0)}
            </li>
          </ul>
        </nav>
      </header>

      <div className="menu-search">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="product-grid">
        {allProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((product, index) => (
          <div key={`product-${index}-${product.name}`} className="product-card" onClick={() => { setSelectedProduct(product); setSelectedQuantity(1); }}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <div className="product-info">
              <span>₱ {product.price}</span>
            </div>
            {addedProducts.find(p => p.id === product.id) && (
              <button onClick={(e) => { e.stopPropagation(); deleteProduct(product.id); }} style={{ marginTop: '5px', background: 'transparent', color: '#ccc', border: 'none', fontSize: '12px', cursor: 'pointer' }}>
                (remove)
              </button>
            )}
          </div>
        ))}
      </div>

      <button className="floating-button" onClick={() => setShowModal(true)}>＋</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Product</h2>
            <input type="text" name="name" value={newProduct.name} placeholder="Product Name" onChange={handleInputChange} />
            <input type="number" name="price" value={newProduct.price} placeholder="Price" onChange={handleInputChange} />
            <div className="custom-file-upload">
              <label htmlFor="fileInput">Upload Image</label>
              <input id="fileInput" type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
            {newProduct.image && (
              <img src={newProduct.image} alt="Preview" style={{ marginTop: '15px', width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #555' }} />
            )}
            <div className="modal-buttons">
              <button onClick={addNewProduct}>Add</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal" style={{ position: 'relative' }}>
            <button style={{ background: 'transparent', border: 'none', fontSize: '24px', position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={() => setSelectedProduct(null)}>✖️</button>
            <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }} />
            <h2>{selectedProduct.name}</h2>
            <p><strong>₱ {selectedProduct.price}</strong></p>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
              <button onClick={() => setSelectedQuantity(q => Math.max(1, q - 1))}>➖</button>
              <span style={{ margin: '0 10px' }}>{selectedQuantity}</span>
              <button onClick={() => setSelectedQuantity(q => q + 1)}>➕</button>
            </div>
            <p style={{ margin: '15px 0' }}>Delicious {selectedProduct.name} made with fresh ingredients and unique flavors!</p>
            <div className="modal-buttons">
              <button onClick={() => { addToCart(selectedProduct, selectedQuantity); setSelectedProduct(null); }}>Add to Cart</button>
              <button style={{ backgroundColor: '#f97316' }} onClick={() => { addToCart(selectedProduct, selectedQuantity); setSelectedProduct(null); setShowCart(true); }}>Buy Now</button>
            </div>
          </div>
        </div>
      )}

      {showCart && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>My Cart</h2>
            {cart.length === 0 ? (
              <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {cart.map((item, index) => (
                  <li key={index} style={{ marginBottom: '10px', background: '#2a2a2a', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{item.product.name}</strong> × {item.quantity}<br />
                      ₱ {item.product.price * item.quantity}
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} style={{ backgroundColor: 'transparent', border: 'none', color: 'red', fontSize: '20px', cursor: 'pointer' }}>🗑️</button>
                  </li>
                ))}
              </ul>
            )}
            <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Total: ₱ {totalPrice}</h3>
            <div className="modal-buttons">
              <button onClick={placeOrder} style={{ backgroundColor: '#f97316' }}>Buy Now</button>
              <button onClick={() => setShowCart(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="success-icon">✅</div>
            <h2 className="success-text">Order Placed Successfully</h2>
            <p>Your order has been successfully placed.<br />Please keep browsing for more.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
