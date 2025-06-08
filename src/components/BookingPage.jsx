import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookingPage.css';

const BookingPage = () => {
  const { id: serviceId } = useParams();
  const navigate = useNavigate();
  
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    cashOnDelivery: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/book-service/${serviceId}`);
        if (!res.ok) throw new Error('Failed to fetch service details');
        const data = await res.json();
        setService(data);
      } catch (err) {
        setError('Unable to load service details');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [serviceId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email || !formData.address || !formData.date) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service_id: serviceId, ...formData }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Booking failed');
      }

      setSuccess('Your booking was successful!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        date: '',
        cashOnDelivery: false,
      });

      setTimeout(() => {
        navigate('/booking-success'); // Navigate after success
      }, 2000);

    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="loader">Loading service info...</p>;
  if (error && !service) return <p className="error-msg">{error}</p>;

  return (
    <div className="booking-wrapper">
      <div className="booking-card">
        <h2 className="booking-title">Book Service: {service?.title}</h2>
        <p className="booking-description">{service?.description}</p>
        <p className="booking-price"><strong>Price:</strong> ₹{service?.price}</p>

        <form onSubmit={handleSubmit} className="booking-form">
          <input type="text" name="name" placeholder="Full Name*" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone (optional)" value={formData.phone} onChange={handleChange} />
          <textarea name="address" placeholder="Address*" value={formData.address} onChange={handleChange} required rows={3} />
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />

          <label className="checkbox-container">
            <input type="checkbox" name="cashOnDelivery" checked={formData.cashOnDelivery} onChange={handleChange} />
            <span>Cash on Delivery</span>
          </label>

          <button type="submit" className="confirm-btn">Confirm Booking</button>
        </form>

        {success && <p className="success-msg">{success}</p>}
        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
};

export default BookingPage;
