import React from 'react';
import './PaymentMethods.css';

const PaymentMethods = () => {
  return (
    <div className="payment-page-container">
      <h1 className="payment-heading">Payment Methods at QuickMart</h1>
      
      <p className="payment-intro">
        At <strong>QuickMart</strong>, we prioritize your convenience and trust.  
        Enjoy lightning-fast delivery within <strong>1 hour</strong> straight to your doorstep!
      </p>

      <section className="payment-feature">
        <h2>Cash on Delivery (COD) – Shop with Confidence</h2>
        <p>
          We understand how important it is to trust where your money goes.  
          That’s why we offer <strong>Cash on Delivery</strong> — pay only when your order arrives.  
          If you’re not satisfied, you can reject the order with a valid reason. No upfront payments, no worries!
        </p>
      </section>

      <section className="payment-feature">
        <h2>Why Choose COD at QuickMart?</h2>
        <ul>
          <li>Buy with peace of mind — pay only after you receive your order</li>
          <li>Support local sellers directly, helping grow your community</li>
          <li>Simple, hassle-free returns or rejections if the product doesn’t meet expectations</li>
          <li>Secure and transparent payment process, ensuring your trust</li>
        </ul>
      </section>

      <section className="payment-feature">
        <h2>Our Commitment to You</h2>
        <p>
          We aim to build a trusted platform where quality meets convenience.  
          Your satisfaction is our top priority, and our payment methods are designed to protect you every step of the way.
        </p>
      </section>

      <div className="cod-support-image">
        {/* You can replace the src below with a real COD or trusted payment image */}
        <img 
          src="/assets/cod.jpg" 
          alt="Cash on Delivery Supported" 
        />
      </div>
    </div>
  );
};

export default PaymentMethods;
