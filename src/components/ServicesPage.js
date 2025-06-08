import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesPage.css';  // Import your CSS file

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleBookNow = (serviceId) => {
    navigate(`/book-service/${serviceId}`);
  };

  return (
    <div className="services-page">
      <h1 className="services-title">Available Services</h1>

      {loading ? (
        <p className="services-loading">Loading services...</p>
      ) : services.length === 0 ? (
        <p className="services-empty">No services available.</p>
      ) : (
        <div className="services-list">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-info">
                {/* Removed emoji field since it doesn't exist in your DB */}
                <div className="service-emoji">🛠️</div>
                <div>
                  <h2 className="service-title">{service.title}</h2>
                  <p className="service-description">{service.description}</p>
                  <p className="service-price">Price: ${service.price}</p>
                </div>
              </div>
              <button
                onClick={() => handleBookNow(service.id)}
                className="book-button"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
