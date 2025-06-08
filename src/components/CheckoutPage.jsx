// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const cartItems = state?.cartItems || [];

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    address: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    if (!customer.name || !customer.email || !customer.address) {
      setMessage('Please fill in all customer details.');
      return;
    }

    if (cartItems.length === 0) {
      setMessage('Your cart is empty!');
      return;
    }

    // Changed 'token' to 'userToken'
    const token = localStorage.getItem('userToken'); 
    if (!token) {
      setMessage('Please log in to place an order.');
      navigate('/login');
      return;
    }

    setLoading(true);

    const items = cartItems.map(item => ({
      id: item.id || item.product_id,
      quantity: item.quantity,
    }));

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Send token
        },
        body: JSON.stringify({ customer, items }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message === 'Token expired') {
          localStorage.removeItem('userToken');
          setMessage('Session expired. Please log in again.');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
          return;
        }
        throw new Error(data.error || data.message || 'Order failed');
      }

      setMessage(`Order placed! Order ID: ${data.orderId}`);
      localStorage.removeItem('cart'); // Clear cart

      setTimeout(() => navigate('/order-confirmation'), 3000);
    } catch (err) {
      console.error('Order Error:', err);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {message && <p className="checkout-message">{message}</p>}

      <div className="checkout-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={customer.name}
          onChange={handleChange}
          disabled={loading}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleChange}
          disabled={loading}
        />
        <textarea
          name="address"
          placeholder="Address"
          value={customer.address}
          onChange={handleChange}
          disabled={loading}
        />
        <button 
          className="btn-submit-order" 
          onClick={handleOrder} 
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Place Order (Cash on Delivery)'}
        </button>
      </div>

      <div className="checkout-summary">
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map(item => (
            <li key={item.id || item.product_id}>
              {item.title} × {item.quantity} = ₹
              {(Number(item.price) * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <strong>
          Total: ₹
          {cartItems
            .reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
            .toFixed(2)}
        </strong>
      </div>
    </div>
  );
};

export default CheckoutPage;
