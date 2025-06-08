import React, { useEffect, useState } from 'react';
import './MyServices.css';

const MyServices = () => {
  const email = localStorage.getItem('email');
  const phone = localStorage.getItem('phone');
  const token = localStorage.getItem('token');
  const userIdentifier = email || phone;

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!userIdentifier || !token) {
      setMessage('services not found due to some technical issue');
      setLoading(false);
      return;
    }

    const fetchServices = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/my-services?user=${encodeURIComponent(userIdentifier)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch services.');

        if (data.length === 0) {
          setMessage('You haven’t booked any services yet.');
        } else {
          setServices(data);
        }
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [userIdentifier, token]);

  return (
    <div className="my-services-container">
      <h2 className="heading">My Booked Services</h2>

      {loading && <p className="info-msg">Loading your services...</p>}
      {message && !loading && <p className="info-msg">{message}</p>}

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
            <p><strong>Price:</strong> ₹{service.price}</p>
            <p><strong>Booking Date:</strong> {new Date(service.date).toLocaleDateString()}</p>
            <p><strong>Delivery Mode:</strong> {service.cash_on_delivery ? 'Cash on Delivery' : 'Prepaid'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyServices;
