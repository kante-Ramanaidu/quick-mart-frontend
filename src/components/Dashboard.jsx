// Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleAddProduct = () => navigate('/add-product');
  const handleViewProducts = () => navigate('/sellerProducts');
  const handleEditProfile = () => navigate('/edit-seller-profile');
  const handleViewOrders = () => navigate('/seller-orders');
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('sellerId');
    navigate('/');
  };

 return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome Seller!</h1>
          <p>Your hub for managing products, profile, and orders.</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-tile" onClick={handleAddProduct}>
            <h2>➕ Add Product</h2>
            <p>List new items and grow your store.</p>
          </div>

          <div className="dashboard-tile" onClick={handleViewProducts}>
            <h2>🛍️ View Products</h2>
            <p>Edit or remove your listed products.</p>
          </div>

         

          <div className="dashboard-tile" onClick={handleViewOrders}>
            <h2>📦 View Orders</h2>
            <p>Check and manage incoming orders.</p>
          </div>
        </div>

        <div className="dashboard-footer">
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
