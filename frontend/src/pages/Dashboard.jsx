import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '2rem' }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '2.5rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 'bold' }}>
              Recipe Creator
            </span>
            <h1 style={{ color: '#111827', margin: '0.5rem 0 0 0' }}>Welcome back, {user?.name || 'Creator'}!</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              onClick={() => navigate('/recipes')}
              style={{ padding: '0.6rem 1.25rem', backgroundColor: '#2563EB', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
            >
              Browse Gallery
            </button>
            <button 
              onClick={authService.logout}
              style={{ padding: '0.6rem 1.25rem', backgroundColor: '#EF4444', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
        </div>

        <div style={{ backgroundColor: '#ECFDF5', borderLeft: '4px solid #10B981', padding: '1.25rem', borderRadius: '6px', marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#065F46' }}>You have done a great job logging in!</h3>
          <p style={{ margin: 0, color: '#047857', fontSize: '0.95rem' }}>
            Ready to share your culinary genius with the world? You can draft new recipes, submit them for admin review, and inspire food enthusiasts everywhere!
          </p>
        </div>

        <div style={{ padding: '1.5rem', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
          <h3 style={{ color: '#111827', marginTop: 0 }}>Create a New Recipe</h3>
          <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Share step-by-step cooking instructions, ingredients, and photos.</p>
          <button 
            onClick={() => alert('Recipe creation form feature coming up next!')}
            style={{ padding: '0.75rem 1.5rem', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            + Submit New Recipe
          </button>
        </div>
      </div>
    </div>
  );
};