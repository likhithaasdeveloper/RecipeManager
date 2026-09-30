import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigate = useNavigate();

  const cardStyle = {
    flex: '1',
    minWidth: '220px',
    padding: '2rem 1.5rem',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    border: '1px solid #E5E7EB'
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.65rem',
    marginTop: '1rem',
    backgroundColor: '#2563EB',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer'
  };

  return (
    <div style={{ maxWidth: '900px', margin: '4rem auto', padding: '0 1rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#111827', marginBottom: '0.5rem' }}>Welcome to Recipe Manager</h1>
      <p style={{ textAlign: 'center', color: '#4B5563', marginBottom: '3rem' }}>Select your entry portal to continue</p>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        
        {/* 1. ADMIN CARD */}
        <div style={cardStyle}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
          <h2 style={{ fontSize: '1.25rem', color: '#111827' }}>System Admin</h2>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', height: '40px' }}>Review & approve recipes submitted by creators.</p>
          <button style={buttonStyle} onClick={() => navigate('/login?role=admin')}>
            Admin Login
          </button>
        </div>

        {/* 2. CREATOR CARD */}
        <div style={cardStyle}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👨‍🍳</div>
          <h2 style={{ fontSize: '1.25rem', color: '#111827' }}>Recipe Creator</h2>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', height: '40px' }}>Create and publish your own culinary recipes.</p>
          <button style={buttonStyle} onClick={() => navigate('/login')}>
            Login
          </button>
          <button 
            style={{ ...buttonStyle, backgroundColor: '#4B5563', marginTop: '0.5rem' }} 
            onClick={() => navigate('/register')}
          >
            Register as Creator
          </button>
        </div>

        {/* 3. END USER CARD */}
        <div style={cardStyle}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍴</div>
          <h2 style={{ fontSize: '1.25rem', color: '#111827' }}>End User</h2>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', height: '40px' }}>Browse approved recipes or log in for saved favorites.</p>
          <button style={buttonStyle} onClick={() => navigate('/recipes')}>
            Browse Recipes
          </button>
          <button 
            style={{ ...buttonStyle, backgroundColor: '#059669', marginTop: '0.5rem' }} 
            onClick={() => navigate('/login')}
          >
            Login / Register
          </button>
        </div>

      </div>
    </div>
  );
};