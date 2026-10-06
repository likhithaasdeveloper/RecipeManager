import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/navigation';
import { authService } from '../../services/authService';

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const role = (user?.role || 'GUEST').toString().toUpperCase().replace('ROLE_', '');

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      authService.logout();
      alert('You have logged out successfully.');
      navigate('/login');
    }
  };

  const visibleNavItems = NAV_ITEMS.filter((item) => item.roles.includes(role));

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* SIDEBAR NAVIGATION */}
      <aside style={{ width: '250px', backgroundColor: '#1E293B', color: '#FFF', padding: '1.5rem' }}>
        <h3 style={{ marginBottom: '2rem', fontSize: '1.25rem', fontWeight: 'bold' }}>Recipe Portal</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {visibleNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                padding: '0.75rem 1rem',
                borderRadius: '6px',
                color: isActive ? '#FFFFFF' : '#94A3B8',
                backgroundColor: isActive ? '#334155' : 'transparent',
                textDecoration: 'none',
                fontWeight: isActive ? '600' : '400',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* CONTENT AREA & TOPBAR */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC' }}>
        <header style={{ backgroundColor: '#FFF', padding: '1rem 2rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <button 
            onClick={() => navigate('/')} 
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#F3F4F6', 
              color: '#374151', 
              border: '1px solid #D1D5DB', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              fontWeight: '600',
              fontSize: '0.875rem'
            }}
          >
            ← Back to Portal
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#475569', fontSize: '0.9rem' }}>
              Logged in as: <strong>{user?.email}</strong> ({role})
            </span>
            <button 
              onClick={handleLogout} 
              style={{ padding: '0.5rem 1rem', backgroundColor: '#EF4444', color: '#FFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
            >
              Logout
            </button>
          </div>
        </header>

        <main style={{ padding: '2rem', flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};