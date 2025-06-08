import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SellerProducts.css';

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const sellerId = localStorage.getItem('sellerId');

  useEffect(() => {
    if (!sellerId || !token) {
      setMessage('You must be logged in as a seller to view products.');
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setMessage('');

      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/seller/${sellerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProducts(response.data.products || []);
        if (!response.data.products || response.data.products.length === 0) {
          setMessage('No products found for your store.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        const resp = error.response?.data;
        setMessage(resp?.error || resp?.message || 'Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sellerId, token]);

  return (
    <div className="seller-products-container">
      <h2 className="products-heading">Your Products</h2>

      {loading && <p className="loading-text">Loading products...</p>}

      {message && <p className="error-message">{message}</p>}

      {!loading && !message && (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {product.image_url && (
                <div className="image-container">
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="product-image"
                  />
                </div>
              )}
              <div className="product-info">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p><span className="label">Category:</span> {product.category}</p>
                <p><span className="label">Price:</span> ₹{product.price}</p>
                <p><span className="label">Stock:</span> {product.stock}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
