import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SplashScreen from './components/SplashScreen';
import LoginSignup from './components/LoginSignup';
import HomePage from './components/HomePage';
import AddProduct from './components/AddProduct';
import ProductsPage from './components/ProductsPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import ServicesPage from './components/ServicesPage';
import BookingPage from './components/BookingPage';
import AlertsPage from './components/AlertsPage';
import MyOrders from './components/MyOrders';
import ProfilePage from './components/ProfilePage';
import SellerRegistration from './components/SellerRegistration';
import Dashboard from './components/Dashboard';
import EditSellerProfile from './components/EditSellerProfile';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import OrderTrackingPage from './components/OrderTrackingPage';
import SellerProducts from './components/SellerProducts';
import SellerOrders from './components/SellerOrders';
import PaymentMethods from './components/PaymentMethods';
import BookingSuccess from './components/BookingSuccess';
import MyServices from './components/MyServices';



import Topbar from './components/Topbar'; // ✅ Import your Topbar

const Layout = ({ children }) => (
  <>
    <Topbar />
    <div>{children}</div>
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages without Topbar */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginSignup />} />

        {/* Pages with persistent Topbar */}
        <Route path="/home" element={<Layout><HomePage /></Layout>} />
        <Route path="/add-product" element={<Layout><AddProduct /></Layout>} />
        <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
        <Route path="/cart" element={<Layout><CartPage /></Layout>} />
        <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
        <Route path="/order-confirmation" element={<Layout><OrderConfirmationPage /></Layout>} />
        <Route path="/order-tracking/:orderId" element={<Layout><OrderTrackingPage /></Layout>} />
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/book-service/:id" element={<Layout><BookingPage /></Layout>} />
        <Route path="/alerts" element={<Layout><AlertsPage /></Layout>} />
        <Route path="/orders" element={<Layout><MyOrders /></Layout>} />
        <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
        <Route path="/seller-registration" element={<Layout><SellerRegistration /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/sellerProducts" element={<Layout><SellerProducts /></Layout>} />
        <Route path="/edit-seller-profile" element={<Layout><EditSellerProfile /></Layout>} />
        <Route path="/seller-orders" element={<Layout><SellerOrders /></Layout>} />
        <Route path="/payments" element={<Layout><PaymentMethods /></Layout>} />
          <Route path="/booking-success" element={<Layout><BookingSuccess /></Layout>} />
          <Route path="/my-services" element={<Layout>{<MyServices />} </Layout>}/>

      </Routes>
    </Router>
  );
}

export default App;
