import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'products',
    price: '',
    stock: '',
    image_url: '',
    offer_details: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
   const token = localStorage.getItem('token');

      if (!token) {
        setMessage('You must be logged in as a seller to add products.');
        return;
      }

      const sellerId = localStorage.getItem('sellerId');
      if (!sellerId) {
        setMessage('Seller ID not found. Please log in again.');
        return;
      }

      let offerDetailsParsed = null;
      if (formData.offer_details.trim() !== '') {
        try {
          offerDetailsParsed = JSON.parse(formData.offer_details);
        } catch (err) {
          setMessage('Offer Details must be valid JSON.');
          return;
        }
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image_url: formData.image_url,
        offer_details: offerDetailsParsed,
        seller_id: parseInt(sellerId)
      };

      const response = await axios.post(
        'http://localhost:5000/api/products/add',
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setMessage('Product added successfully!');
      setFormData({
        title: '',
        description: '',
        category: 'products',
        price: '',
        stock: '',
        image_url: '',
        offer_details: ''
      });

      console.log('Add product response:', response.data);
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage(error.response?.data?.error || 'Failed to add product. Please try again.');
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="products">Products</option>
          <option value="groceries">Groceries</option>
          <option value="food">Food</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="crafts">Crafts</option>
          <option value="home">Home</option>
        </select>

        <label>Price:</label>
        <input
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>Stock:</label>
        <input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
        />

        <label>Image URL:</label>
        <input
          name="image_url"
          type="text"
          value={formData.image_url}
          onChange={handleChange}
        />

        <label>Offer Details (JSON format):</label>
        <textarea
          name="offer_details"
          placeholder='e.g. {"discount": "10%", "valid_till": "2025-12-31"}'
          value={formData.offer_details}
          onChange={handleChange}
        />

        <button type="submit">Add Product</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddProduct;
