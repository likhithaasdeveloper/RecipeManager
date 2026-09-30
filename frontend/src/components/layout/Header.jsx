import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';

export const Header = () => {
  return (
    <header style={{
      padding: '1rem 2rem',
      backgroundColor: '#1f2937',
      color: '#ffffff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Recipe Manager</h2>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link 
          to={ROUTES.LOGIN} 
          style={{ 
            color: '#ffffff', 
            textDecoration: 'none',
            fontWeight: '500',
            padding: '0.4rem 0.8rem',
            borderRadius: '4px'
          }}
        >
          Login
        </Link>
        <Link 
          to={ROUTES.REGISTER} 
          style={{ 
            color: '#ffffff', 
            backgroundColor: '#3b82f6', 
            textDecoration: 'none',
            fontWeight: '500',
            padding: '0.4rem 0.8rem',
            borderRadius: '4px'
          }}
        >
          Register
        </Link>
      </nav>
    </header>
  );
};