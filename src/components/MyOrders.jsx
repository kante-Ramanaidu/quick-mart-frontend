// src/pages/MyOrders.jsx
import React, { useEffect, useState } from 'react';
import './MyOrders.css';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // State to track which order's tracking info to show (optional)
  const [trackingOrderId, setTrackingOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('userToken');

      if (!token) {
        setMessage('Please log in to view your orders.');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/my-orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          if (data.message === 'Invalid or expired token') {
            localStorage.removeItem('userToken');
            setMessage('Session expired. Please log in again.');
            return;
          }
          throw new Error(data.error || 'Failed to fetch orders');
        }

        setOrders(data);
      } catch (err) {
        console.error('Order fetch error:', err);
        setMessage(err.message || 'An error occurred while fetching orders.');
      }
    };

    fetchOrders();
  }, []);

  // Dummy function to simulate tracking info display
  const handleTrackOrder = (orderId) => {
    // You can replace this with actual tracking API call or routing
    setTrackingOrderId(orderId === trackingOrderId ? null : orderId);
  };

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {message && <p className="orders-message">{message}</p>}

      {orders.length === 0 && !message && <p>No orders found.</p>}

      {orders.map(order => (
        <div key={order.orderId} className="order-card">
          <h3>Order ID: {order.orderId}</h3>
          <p><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>

          <div className="order-items">
            {order.items.map((item, idx) => (
              <div key={idx} className="order-item">
                <img src={item.imageUrl} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate(`/order-tracking/${order.orderId}`)}
            className="track-order-btn"
          >
            Track Order
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
