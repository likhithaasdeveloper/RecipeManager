import React from 'react';
import { useNavigate } from 'react-router-dom';

export const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      maxWidth: '500px',
      margin: '5rem auto',
      padding: '2.5rem',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      textAlign: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🚫</div>
      <h1 style={{ color: '#991B1B', margin: '0 0 0.5rem 0' }}>403 - Access Denied</h1>
      <p style={{ color: '#4B5563', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
        You do not have permission to access this page or administrative module.
      </p>
      <button 
        onClick={() => navigate('/')}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#2563EB',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Return to Portal Selection
      </button>
    </div>
  );
};