import React, { useState,useEffect } from 'react';
import {
  FaMapMarkerAlt, FaShoppingBag, FaHome, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn,FaTruck,FaStore,FaShoppingCart
} from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';



import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const features = [
  {
    icon: <FaMapMarkerAlt />,
    title: 'Find Local Sellers',
    description: 'Discover talented artisans, bakers, and service providers in your neighborhood.',
  },
  {
    icon: <FaShoppingBag />,
    title: 'Shop With Confidence',
    description: 'Browse verified sellers with reviews from your community members.',
  },
  {
    icon: <FaHome />,
    title: 'Pickup or Delivery',
    description: 'Get your items delivered or arrange for convenient local pickup.',
  },
];


const cardsData = [
  {
    id: 1,
    icon: <FaTruck size={48} color="#4F46E5" />,
    title: 'Delivery in Under 1 Hour',
    desc: 'QuickMart connects you with nearby sellers, ensuring ultra-fast delivery from local stores — usually within 60 minutes.',
    bgColor: '#EEF2FF',
    textColor: '#4F46E5',
  },
  {
    id: 2,
    icon: <FaStore size={48} color="#10B981" />,
    title: 'Support Your Neighborhood',
    desc: 'We help small vendors and home businesses thrive by giving them a digital platform to reach customers nearby.',
    bgColor: '#ECFDF5',
    textColor: '#059669',
  },
  {
    id: 3,
    icon: <FaShoppingCart size={48} color="#F59E0B" />,
    title: 'Groceries, Food & Services',
    desc: 'From fresh groceries to trusted home services, QuickMart brings everything you need under one roof.',
    bgColor: '#FFFBEB',
    textColor: '#B45309',
  },
];
const testimonials = [
  {
    rating: 5,
    text: "I've discovered so many amazing local artisans through QuickMart. The quality of handmade products is outstanding and I love supporting my community.",
    name: "Jane Doe",
    role: "Customer",
    initials: "JD",
  },
  {
    rating: 5,
    text: "As a small bakery owner, QuickMart has helped me reach new customers in my area. My business has grown significantly since joining the platform.",
    name: "Michael Smith",
    role: "Seller",
    initials: "MS",
  },
  {
    rating: 4,
    text: "The convenience of finding high-quality services near me has been a game-changer. I've hired a local gardener and home cleaner through the platform.",
    name: "Alex Johnson",
    role: "Customer",
    initials: "AJ",
  }
];

const categories = [
  { label: 'Food', desc: 'Fresh & Homemade', bg: 'bg-red', icon: '🍽️' },
  { label: 'Crafts', desc: 'Handmade with love', bg: 'bg-blue', icon: '🧶' },
  { label: 'Services', desc: 'Professional help', bg: 'bg-green', icon: '🔧' },
  { label: 'Clothing', desc: 'Unique fashion', bg: 'bg-yellow', icon: '👕' },
  { label: 'Groceries', desc: 'Everyday essentials', bg: 'bg-orange', icon: '🛒' },
  { label: 'Electronics', desc: 'Tech & gadgets', bg: 'bg-purple', icon: '📱' },
  { label: 'Home', desc: 'Decor & furniture', bg: 'bg-pink', icon: '🏠' },
];

const HomePage = ({ user }) => {
  const navigate = useNavigate();
   const [currentIndex, setCurrentIndex] = useState(0);
 
  
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Auto-change card every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % cardsData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  

  const handleCategoryClick = (categoryLabel) => {
  if (categoryLabel.toLowerCase() === 'services') {
    navigate('/services');
  } else {
    navigate(`/products?category=${encodeURIComponent(categoryLabel.toLowerCase())}`);
  }
};

  

  const displayedCategories = showAllCategories ? categories : categories.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">

      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Discover Amazing Local Products & Services</h1>
          <p>Connect with trusted sellers in your neighborhood and support your local community.</p>
          <div className="popular-tags">
            <span>Popular:</span>
            <a href="#">Handmade Crafts</a>
            <a href="#">Fresh Produce</a>
            <a href="#">Home Services</a>
            <a href="#">Local Art</a>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-box"><h2>10k+</h2><p>Local Sellers</p></div>
          <div className="stat-box"><h2>50k+</h2><p>Products</p></div>
          <div className="stat-box"><h2>200+</h2><p>Communities</p></div>
          <div className="stat-box"><h2>4.8</h2><p>Average Rating</p></div>
        </div>
      </section>

      <div className="categories-container" id="browse-categories">
        <div className="categories-header">
          <h2>Browse Categories</h2>
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="view-all-btn"
          >
            {showAllCategories ? 'Show Less' : 'View All'}
          </button>
        </div>

        <div className="categories-grid">
          {displayedCategories.map((cat, i) => (
            <div
              key={i}
              className={`category-card ${cat.bg}`}
              onClick={() => handleCategoryClick(cat.label)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCategoryClick(cat.label);
              }}
            >
              <div className="category-content">
                <div className="category-icon">{cat.icon}</div>
                <div className="category-title">{cat.label}</div>
                <div className="category-desc">{cat.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>


        

      <div className="popular-food-container">
        <div className="popular-food-header">
          <h2>Popular Food</h2>
          <button onClick={() => navigate('/products?category=food')}>See All</button>
        </div>

        <div className="popular-food-scroll">
          {[
            { label: 'Pizza', emoji: '🍕' },
            { label: 'Burger', emoji: '🍔' },
            { label: 'Meals', emoji: '🍛' },
            { label: 'Drinks', emoji: '🥤' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="popular-food-card"
              onClick={() => handleCategoryClick('Food')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCategoryClick('Food');
              }}
            >
              <div className="emoji">{item.emoji}</div>
              <div className="label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>


      {/* Grocery Stores */}
<div className="grocery-container">
  <div className="grocery-header">
    <h2 className="grocery-title">Grocery Stores</h2>
    <button
      className="grocery-see-all"
      onClick={() => navigate('/products?category=groceries')}
      aria-label="See all grocery stores"
    >
      See All
    </button>
  </div>
  <div className="grocery-scroll">
    {[
      { name: 'Fresh Market', tag: '$0 delivery fee', tagColor: 'bg-green-100', emoji: '🛒' },
      { name: 'Organic Goods', tag: '15% off 1st order', tagColor: 'bg-indigo-100', emoji: '🥗' },
      { name: 'Quick Mart', tag: 'Buy 1 Get 1 Free', tagColor: 'bg-yellow-100', emoji: '🏪' },
    ].map((store, idx) => (
      <div
        key={idx}
        className="grocery-card"
        onClick={() => navigate('/products?category=groceries')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') navigate('/products?category=groceries');
        }}
        aria-label={`View products from ${store.name}`}
      >
        <div className="grocery-emoji">{store.emoji}</div>
        <div className="grocery-name">{store.name}</div>
        <div className={`grocery-tag ${store.tagColor}`}>{store.tag}</div>
      </div>
    ))}
  </div>
</div>

      {/* Home Services */}
<div className="home-services-container">
  <div className="home-services-header">
    <h2 className="home-services-title">Home Services</h2>
    <button
      className="home-services-see-all"
      onClick={() => navigate('/services')}
      aria-label="See all home services"
    >
      See All
    </button>
  </div>
  <div className="home-services-list">
    {[
      { title: 'Home Cleaning', price: '$49', emoji: '🧼' },
      { title: 'Appliance Repair', price: '$79', emoji: '🔧' },
      { title: 'Plumbing Services', price: '$99', emoji: '🚿' },
    ].map((service, idx) => (
      <div key={idx} className="home-service-card">
        <div className="home-service-info">
          <div className="home-service-emoji">{service.emoji}</div>
          <div>
            <h4 className="home-service-title">{service.title}</h4>
            <p className="home-service-price">Starting from {service.price}</p>
          </div>
        </div>
        <button
          className="home-service-book-btn"
          onClick={() => navigate('/services')}
          aria-label={`Book ${service.title}`}
        >
          Book Now
        </button>
      </div>
    ))}
  </div>
</div>


{/* how it works */}
  <section className="about-quickmart" id="about">
      <h2 className="section-title">About QuickMart</h2>
      <div className="cards-container">
        {cardsData.map((card, index) => (
          <div
            key={card.id}
            className={`card ${index === currentIndex ? 'active' : 'inactive'}`}
            style={{ backgroundColor: card.bgColor, color: card.textColor }}
            aria-hidden={index !== currentIndex}
          >
            <div className="card-icon">{card.icon}</div>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-desc">{card.desc}</p>
          </div>
        ))}
      </div>
      <div className="dots">
        {cardsData.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === currentIndex ? 'dot-active' : ''}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to card ${i + 1}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setCurrentIndex(i); }}
          />
        ))}
      </div>
    </section>




 <section className="how-it-works">
      <h2 className="how-title">How LocalSpot Works</h2>
      <p className="how-subtitle">
        Our platform makes it easy to discover and purchase from local sellers in your community.
      </p>
      <div className="how-cards">
        {features.map((feature, index) => (
          <div className="how-card" key={index}>
            <div className="how-icon">{feature.icon}</div>
            <h3 className="how-card-title">{feature.title}</h3>
            <p className="how-card-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>


    <section className="testimonials-section">
      <h2>What Our Community Says</h2>
      <p className="subtitle">Join thousands of happy customers and sellers who are part of our growing community.</p>
      <div className="testimonials-container">
        {testimonials.map((item, index) => (
          <div key={index} className="testimonial-card">
            <div className="stars">
              {'★'.repeat(item.rating)}
              {'☆'.repeat(5 - item.rating)}
            </div>
            <p className="testimonial-text">"{item.text}"</p>
            <div className="user-info">
              <div className="avatar">{item.initials}</div>
              <div>
                <div className="user-name">{item.name}</div>
                <div className="user-role">{item.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>


      <div className="seller-section">
      <div className="seller-left">
        <h2>Become a Seller Today</h2>
        <p>
          Share your products with your local community. Whether you're a baker,
          crafter, or service provider, our platform helps you connect with
          customers near you.
        </p>
        <ul className="benefits">
          <li>✅ Free to join, pay only when you sell</li>
          <li>✅ Reach customers within 10 miles of your location</li>
          <li>✅ Simple tools to manage your inventory and orders</li>
        </ul>
        <button className="start-button" onClick={() => navigate('/seller-registration')}>Start Selling</button>
      </div>
      <div className="seller-right">
        <div className="stat-card">
          <h3>1.2M+</h3>
          <p>Earned by local sellers last month</p>
        </div>
        <div className="stats-row">
          <div className="stat-card small">
            <h4>4,500+</h4>
            <p>Active sellers</p>
          </div>
          <div className="stat-card small">
            <h4>92%</h4>
            <p>Seller satisfaction</p>
          </div>
        </div>
      </div>
    </div>

      <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h3>LocalSpot</h3>
          <p>Connecting local sellers with local buyers. Support your community by shopping locally.</p>
          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
          </div>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
          <li onClick={() => scrollToSection('home')}>Home</li>
  <li onClick={() => scrollToSection('browse-categories')}>Browse Categories</li>
        <li onClick={() => navigate('/seller-registration')}>Become a Seller</li>
<li onClick={() => scrollToSection('about')}>About Us</li>
      
          </ul>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li>Help Center</li>
            <li>Safety Center</li>
            <li>Community Guidelines</li>
            <li>Seller Resources</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <p><MdEmail /> ramkante84@gmail.com</p>
          <p><MdPhone /> 7396619889</p>
          <p><MdLocationOn /> 123 Market Street<br />Hyderabad</p>
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        <p>© 2023 QuickMart. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer> 


    </div>
  );
};

export default HomePage;
