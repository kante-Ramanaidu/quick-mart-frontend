import React, { useState } from 'react';
import axios from 'axios';
import './SellerRegistration.css'
const SellerRegistration = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    storeName: '',
  });

  const toggleForm = () => setIsSignup((prev) => !prev);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        email: formData.email.trim(),
        password: formData.password.trim(),
      };

      const url = isSignup
        ? 'http://localhost:5000/api/sellers/register'
        : 'http://localhost:5000/api/sellers/login';

      const res = await axios.post(url, payload);

      localStorage.setItem('sellerId', res.data.seller.id);
      localStorage.setItem('token', res.data.token);

      alert('Success!');
      window.location.href = '/dashboard';
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="seller-auth" style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h2>{isSignup ? 'Seller Sign Up' : 'Seller Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <>
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <input
              name="storeName"
              placeholder="Store Name"
              value={formData.storeName}
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ marginTop: '1rem' }}>
          {isSignup ? 'Register' : 'Login'}
        </button>
      </form>
      <p onClick={toggleForm} style={{ cursor: 'pointer', color: 'blue', marginTop: '1rem' }}>
        {isSignup ? 'Already have an account? Login' : 'New seller? Register here'}
      </p>
    </div>
  );
};

export default SellerRegistration;
