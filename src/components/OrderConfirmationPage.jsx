// src/components/OrderConfirmationPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './orderconfirmation.css'; // create this file for styling

const OrderConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="confirmation-container">
      <h1 className="confirmation-title">Thank You! Your Order Is Placed.</h1>
      <p className="confirmation-message">
        Your order has been successfully placed. You can track your order status or continue shopping below.
      </p>
      <div className="confirmation-buttons">
        <button
          className="btn-continue"
          onClick={() => navigate('/products')}
        >
          Continue Shopping
        </button>
        <button
          className="btn-track"
          onClick={() => navigate('/order-tracking/:orderId')}
        >
          Order Tracking
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
