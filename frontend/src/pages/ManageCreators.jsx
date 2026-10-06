import React, { useEffect, useState } from 'react';
import { authService } from '../services/authService';

export const ManageCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    setLoading(true);
    try {
      const data = await authService.getCreators();
      setCreators(data || []);
    } catch (err) {
      console.error('Failed to load creators:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (creator) => {
    const isCurrentlyEnabled = creator.enabled !== false;
    const actionText = isCurrentlyEnabled ? 'disable' : 'enable';

    if (!window.confirm(`Are you sure you want to ${actionText} creator "${creator.name || creator.email}"?`)) {
      return;
    }

    try {
      await authService.toggleCreatorStatus(creator.id);
      alert(`Creator has been ${actionText}d successfully.`);
      fetchCreators();
    } catch (err) {
      alert(`Failed to ${actionText} creator.`);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '1000px', width: '100%' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, color: '#111827', fontSize: '1.5rem' }}>
          All Creators ({creators.length})
        </h2>
        <p style={{ margin: '0.25rem 0 0 0', color: '#6B7280', fontSize: '0.875rem' }}>
          Manage creator accounts, view details, or enable/disable account permissions
        </p>
      </div>

      {loading && <p style={{ color: '#6B7280' }}>Loading creators list...</p>}

      {!loading && creators.length === 0 && (
        <div style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #E5E7EB' }}>
          <p style={{ color: '#6B7280', margin: 0 }}>No creator accounts found in database.</p>
        </div>
      )}

      {!loading && creators.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          {creators.map((creator) => {
            const isEnabled = creator.enabled !== false;
            return (
              <div
                key={creator.id}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              >
                {/* LEFT TEXT CONTAINER TAKES ALL AVAILABLE FLEX SPACE */}
                <div style={{ flex: 1, paddingRight: '1.5rem' }}>
                  <h3 style={{ margin: '0 0 0.25rem 0', color: '#111827', fontSize: '1.1rem' }}>
                    {creator.name || 'Creator User'}
                  </h3>
                  <p style={{ margin: 0, color: '#4B5563', fontSize: '0.875rem' }}>
                    <strong>Email:</strong> {creator.email}
                  </p>
                </div>

                {/* RIGHT ACTION CONTROLS STAY ANCHORED AT FAR EDGE */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '4px',
                      backgroundColor: isEnabled ? '#D1FAE5' : '#FEE2E2',
                      color: isEnabled ? '#065F46' : '#991B1B'
                    }}
                  >
                    {isEnabled ? 'Active' : 'Disabled'}
                  </span>

                  <button
                    onClick={() => handleToggleStatus(creator)}
                    style={{
                      padding: '0.55rem 1.25rem',
                      backgroundColor: isEnabled ? '#EF4444' : '#10B981',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {isEnabled ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};