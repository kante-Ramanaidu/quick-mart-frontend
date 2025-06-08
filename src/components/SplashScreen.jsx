import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000); // redirect after 3 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <img src="/assets/delivery.png" alt="Delivery" className="splash-image" />
      <h2 className="splash-subheading">Fast delivery, right here</h2>
      <h1 className="splash-title">EXPERIENCE QUICKMART TODAY!</h1>
      <p className="splash-text">Join us for hassle-free shopping online</p>
      <span className="splash-brand">QuickMart</span>
    </div>
  );
};

export default SplashScreen;
