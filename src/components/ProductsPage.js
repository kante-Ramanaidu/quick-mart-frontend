import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('search') || '';
    const category = queryParams.get('category') || '';

    let url = `http://localhost:5000/api/products`;
    const params = [];

    if (search) params.push(`search=${encodeURIComponent(search)}`);
    if (category) params.push(`category=${encodeURIComponent(category)}`);

    if (params.length) {
      url += `?${params.join('&')}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [location.search]);

const handleAddToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // Ensure price is stored as number
    const parsedProduct = {
      ...product,
      price: Number(product.price),
      quantity: 1,
    };
    cart.push(parsedProduct);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  setMessage(`${product.title} added to cart!`);
  setTimeout(() => setMessage(''), 3000);
};



  return (
    <div className="products-container">
      <h1 className="products-title">products from local sellers</h1>

      {message && <div className="add-to-cart-message">{message}</div>}

      <div className="product-grid">
        {products.length === 0 ? (
          <p className="no-products-message">
            No products found. Item might be out of stock or not available.
          </p>
        ) : (
          products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="product-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="product-details">
                <div className="product-title-price">
                  <h2 className="product-title">{product.title}</h2>
                  <span className="product-price">₹{product.price}</span>
                </div>
                <p className="product-category">{product.category}</p>
                <p className="product-description">{product.description}</p>
                {product.offer_details?.discount && (
                  <p className="product-offer">Offer: {product.offer_details.discount}</p>
                )}
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
