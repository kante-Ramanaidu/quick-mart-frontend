// src/components/OrderTrackingPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './OrderTrackingPage.css';

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    fetch(`http://localhost:5000/api/orders/${orderId}/status`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status || 'Pending');
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching order status:', err);
        setStatus('Error fetching status');
        setLoading(false);
      });
  }, [orderId]);

  return (
    <div className="tracking-container">
      <h1 className="tracking-title">Track Your Order</h1>
      <p className="tracking-subtitle">Stay updated and get ready to enjoy your purchase!</p>

      {loading ? (
        <p className="tracking-loading">Loading your order status...</p>
      ) : (
        <>
          <div className="status-box">
            <span className="status-label">Current Status:</span>
            <span className={`status-text status-${status.toLowerCase().replace(/\s+/g, '-')}`}>
              {status}
            </span>
          </div>
          {status.toLowerCase() !== 'error fetching status' && status.toLowerCase() !== 'pending' && (
            <p className="delivery-info">
              Estimated delivery within <strong>1 hour</strong>. Thanks for choosing QuickMart!
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default OrderTrackingPage;
