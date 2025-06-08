import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

const LoginSignup = () => {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  // Form state
  const [loginEmailOrPhone, setLoginEmailOrPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupFullName, setSignupFullName] = useState('');
  const [signupEmailOrPhone, setSignupEmailOrPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Handle login
 // Handle login
const handleLogin = async () => {
  setError('');
  if (!loginEmailOrPhone || !loginPassword) {
    setError('Please fill in all login fields');
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailOrPhone: loginEmailOrPhone,
        password: loginPassword,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Save token to localStorage
      localStorage.setItem('userToken', data.token);

      navigate('/home'); // Navigate to homepage
    } else {
      setError(data.message || 'Login failed');
    }
  } catch (err) {
    setError('Server error during login');
  }
};


  // Handle signup
  const handleSignup = async () => {
    setError('');
    if (
      !signupFullName ||
      !signupEmailOrPhone ||
      !signupPassword ||
      !signupConfirmPassword
    ) {
      setError('Please fill in all signup fields');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: signupFullName,          // <-- changed from 'name' to 'fullName'
          emailOrPhone: signupEmailOrPhone,
          password: signupPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Optionally clear signup fields here
        navigate('/home'); // Navigate to homepage
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Server error during signup');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-heading">Welcome to QuickMart</h1>
        <p className="login-subheading">Sign in or create your account</p>

        <div className="login-tabs">
          <button
            onClick={() => setActiveTab('login')}
            className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`}
          >
            Signup
          </button>
        </div>

        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

        {activeTab === 'login' ? (
          <>
            <div className="form-group">
              <label>Email / Phone</label>
              <input
                type="text"
                placeholder="Enter your email or phone"
                value={loginEmailOrPhone}
                onChange={(e) => setLoginEmailOrPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                
              </div>
            </div>
        
            <button
              className="submit-button"
              onClick={handleLogin}
              type="button"
            >
              Login
            </button>
          </>
        ) : (
          <>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={signupFullName}
                onChange={(e) => setSignupFullName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email / Phone</label>
              <input
                type="text"
                placeholder="Enter your email or phone"
                value={signupEmailOrPhone}
                onChange={(e) => setSignupEmailOrPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="Create a password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
               
              </div>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                />
                <span className="toggle-eye">👁️</span>
              </div>
            </div>
            <button
              className="submit-button"
              onClick={handleSignup}
              type="button"
            >
              Create Account
            </button>
          </>
        )}

  
      </div>
    </div>
  );
};

export default LoginSignup;
