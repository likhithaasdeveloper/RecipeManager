import React, { useEffect, useState } from 'react';
import { authService } from '../services/authService';

export const AdminDashboard = () => {
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
            <span style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 'bold' }}>
              System Administrator
            </span>
            <h1 style={{ color: '#111827', margin: '0.5rem 0 0 0' }}>Welcome, {user?.name || 'Admin'}!</h1>
          </div>
          <button 
            onClick={authService.logout}
            style={{ padding: '0.6rem 1.25rem', backgroundColor: '#EF4444', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>

        <div style={{ backgroundColor: '#EFF6FF', borderLeft: '4px solid #2563EB', padding: '1.25rem', borderRadius: '6px', marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#1E40AF' }}>Administrative Portal Active</h3>
          <p style={{ margin: 0, color: '#1E3A8A', fontSize: '0.95rem' }}>
            You have successfully authenticated as a System Administrator. Here you can review, approve, or manage pending recipe submissions from creators.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>Pending Approvals</h4>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563EB' }}>0</span>
            <p style={{ margin: '0.5rem 0 0 0', color: '#6B7280', fontSize: '0.85rem' }}>Recipes awaiting your review</p>
          </div>
          <div style={{ padding: '1.5rem', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>Total Creators</h4>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#059669' }}>Active</span>
            <p style={{ margin: '0.5rem 0 0 0', color: '#6B7280', fontSize: '0.85rem' }}>System users registered</p>
          </div>
        </div>
      </div>
    </div>
  );
};