import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "./assets/logo.png"; // <- your burger + splash image


const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // NEW for search

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  const toggleStatus = (index) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = updatedOrders[index].status === 'Pending' ? 'Done' : 'Pending';
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  // Filtered Orders based on search
  const filteredOrders = orders.filter(order =>
    order.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="order-container">
      <header className="order-header">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img2" /> {/* you can adjust logo */}
        </div>
        <nav>
          <ul className="home-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li className="active"><Link to="/orders">Orders</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <h2 className="title">ORDERS</h2>

      {/* SEARCH BAR */}
      <div style={{ textAlign: 'center', margin: '20px 0', marginLeft:'70%' }}>
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

    <div className='table-wrapper'>
      <table className="order-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Status</th>
            <th>Ordered Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No matching orders found.
              </td>
            </tr>
          ) : (
            filteredOrders.map((order, idx) => (
              <tr key={idx}>
                <td className="product-name">{order.product}</td>
                <td>{order.size}</td>
                <td>₱ {order.price.toFixed(2)}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.date}</td>
                <td>
                  <button
                    onClick={() => toggleStatus(idx)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: order.status === 'Pending' ? '#f97316' : '#22c55e',
                      border: 'none',
                      borderRadius: '5px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    {order.status === 'Pending' ? 'Mark as Done' : 'Mark as Pending'}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default OrderList;
