import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

export const RecipeBrowser = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if a user session exists in localStorage
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      
      {/* HEADER / NAVIGATION BAR */}
      <header style={{
        backgroundColor: '#ffffff',
        padding: '1rem 2rem',
        borderBottom: '1px solid #E5E7EB',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#6B7280', fontSize: '0.875rem' }}>
            ← Portals
          </Link>
          <h2 style={{ margin: 0, color: '#111827', fontSize: '1.25rem' }}>🍴 Public Recipe Gallery</h2>
        </div>

        {/* DYNAMIC HEADER BUTTONS */}
        <div>
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: '#374151' }}>
                Logged in as <strong>{currentUser.name}</strong> ({currentUser.role})
              </span>
              <button 
                onClick={authService.logout}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#EF4444',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={() => navigate('/login')}
                style={{
                  padding: '0.5rem 1.25rem',
                  backgroundColor: '#2563EB',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/register')}
                style={{
                  padding: '0.5rem 1.25rem',
                  backgroundColor: '#059669',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </header>

      {/* RECIPE CONTENT AREA */}
      <main style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
        <div style={{
          backgroundColor: '#ffffff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ color: '#111827', marginTop: 0 }}>Available Recipes</h3>
          <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>
            {currentUser 
              ? 'Welcome back! You have full access to view and save public recipes.' 
              : 'You are browsing as a guest. Want to create or save recipes? Log in or register using the buttons above!'}
          </p>
        </div>

        {/* DEMO RECIPE CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#059669', backgroundColor: '#D1FAE5', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>APPROVED</span>
            <h4 style={{ margin: '0.75rem 0 0.5rem 0', color: '#111827' }}>Classic Italian Pasta</h4>
            <p style={{ color: '#6B7280', fontSize: '0.85rem' }}>A delicious traditional garlic and olive oil spaghetti pasta recipe.</p>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#059669', backgroundColor: '#D1FAE5', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>APPROVED</span>
            <h4 style={{ margin: '0.75rem 0 0.5rem 0', color: '#111827' }}>Avocado Toast Delight</h4>
            <p style={{ color: '#6B7280', fontSize: '0.85rem' }}>Fresh sourdough topped with mashed avocado, poached egg, and chili flakes.</p>
          </div>
        </div>
      </main>

    </div>
  );
};