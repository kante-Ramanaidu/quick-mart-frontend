// src/components/CartIcon.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CartIcon.css';

const CartIcon = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(totalItems);
    };

    updateCartCount();

    // Recalculate when localStorage changes (manual trigger if needed)
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  return (
    <Link to="/cart" className="cart-icon-wrapper">
      <i className="fas fa-shopping-cart"></i>
      {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
    </Link>
  );
};

export default CartIcon;
