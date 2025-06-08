// src/pages/BookingSuccess.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './BookingSuccess.css';

const BookingSuccess = () => {
  return (
    <div className="success-wrapper">
      <div className="success-card">
        <h2 className="success-title">✅ Booking Confirmed!</h2>
        <p>Your service has been booked successfully.</p>
        <p>It will be provided on your preferred date.</p>
        <Link to="/home" className="back-home-btn">Go to Home</Link>
      </div>
    </div>
  );
};

export default BookingSuccess;
