// components/Topbar.jsx
import React, { useState } from 'react';
import {
  FaBars, FaMapMarkerAlt, FaShoppingCart, FaSearch, FaShoppingBag, FaHome,
  FaClipboardList, FaCreditCard, FaSignOutAlt, FaTimes
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Topbar.css'; // Optional: Create Topbar styles if needed
import CartIcon from './CartIcon';

const Topbar = ({ user }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('Detect Location');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isSeller = user?.isSeller || false;

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://us1.locationiq.com/v1/reverse.php?key=pk.ebc952eb85332be4f43d9dc086fb556c&lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const locality = data.address?.city || data.address?.town || data.address?.state || 'Unknown';
            setLocation(locality);
          } catch {
            setLocation('Unknown location');
          }
        },
        () => setLocation('Location access denied')
      );
    } else {
      setLocation('Geolocation not supported');
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleAddProductClick = () => {
    navigate('/add-product');
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <FaBars className="text-2xl cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)} />
          <h1 className="logo">QuickMart</h1>
        </div>

        <div className="topbar-center">
          <button className="location-btn" onClick={detectLocation} title="Detect Current Location">
            <FaMapMarkerAlt className="location-icon" />
            <span className="location-text">{location}</span>
          </button>

          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for products, services, or sellers..."
              className="search-input"
            />
            <button onClick={handleSearch} className="search-btn">Search</button>
          </div>
        </div>

        <div className="topbar-right">
          <button className="cart-btn" onClick={() => navigate('/cart')}>
            <FaShoppingCart className="cart-icon" />
            <span className="cart-count">{<CartIcon/>}</span>
          </button>

          {!isSeller ? (
            <button className="become-seller-btn" onClick={() => navigate('/seller-registration')}>
              Become a Seller
            </button>
          ) : (
            <button className="add-product-btn" onClick={handleAddProductClick}>
              Add Seller Product
            </button>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="sidebar-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-header">
              <FaTimes className="close-icon" onClick={() => setIsMenuOpen(false)} />
            </div>

            <ul className="sidebar-menu">
              <li onClick={() => handleNavigate('/home')}><FaHome /> Home</li>
              <li onClick={() => handleNavigate('/orders')}><FaClipboardList /> My Orders</li>
              <li onClick={() => handleNavigate('/cart')}><FaShoppingBag /> My Cart</li>
              <li onClick={() => handleNavigate('/my-services')}><FaShoppingBag /> My Services</li>

              <li onClick={() => handleNavigate('/payments')}><FaCreditCard /> Payment Methods</li>
            </ul>

            <div className="logout" onClick={() => handleNavigate('/login')}>
              <FaSignOutAlt />
              Logout
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
