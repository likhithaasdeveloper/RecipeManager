import React, { useEffect, useState } from 'react';
import { recipeService } from '../services/recipeService';

export const AdminDashboard = () => {
  const [pendingRecipes, setPendingRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPendingRecipes();
  }, []);

  const loadPendingRecipes = async () => {
    setLoading(true);
    try {
      const pendingData = await recipeService.getPendingRecipes();
      setPendingRecipes(pendingData || []);
    } catch (err) {
      setError('Failed to fetch pending recipes.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await recipeService.approveRecipe(id);
      alert('Recipe approved successfully!');
      loadPendingRecipes();
    } catch (err) {
      alert('Failed to approve recipe.');
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Are you sure you want to reject this recipe?')) return;
    try {
      await recipeService.rejectRecipe(id);
      alert('Recipe rejected successfully.');
      loadPendingRecipes();
    } catch (err) {
      alert('Failed to reject recipe.');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '1000px', width: '100%' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, color: '#111827', fontSize: '1.5rem' }}>
          Pending Approvals ({pendingRecipes.length})
        </h2>
        <p style={{ margin: '0.25rem 0 0 0', color: '#6B7280', fontSize: '0.875rem' }}>
          Review and approve or reject community recipe submissions
        </p>
      </div>

      {error && (
        <div style={{ padding: '0.75rem', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: '6px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {loading && <p style={{ color: '#6B7280' }}>Loading pending approvals...</p>}

      {!loading && pendingRecipes.length === 0 && (
        <div style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #E5E7EB' }}>
          <p style={{ color: '#6B7280', margin: 0 }}>No pending recipes awaiting approval.</p>
        </div>
      )}

      {!loading && pendingRecipes.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          {pendingRecipes.map((item) => (
            <div 
              key={item.id} 
              style={{ 
                backgroundColor: '#fff', 
                padding: '1.25rem 1.5rem', 
                borderRadius: '8px', 
                border: '1px solid #FCD34D', 
                display: 'flex', 
                justify: 'space-between', 
                alignItems: 'center',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              {/* LEFT CONTENT CONTAINER */}
              <div style={{ flex: 1, paddingRight: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.25rem 0', color: '#111827', fontSize: '1.1rem' }}>{item.title}</h3>
                <p style={{ margin: '0 0 0.5rem 0', color: '#2563EB', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  Submitted by: {item.creatorName || item.creatorEmail || 'Unknown'}
                </p>
                <p style={{ margin: '0 0 0.25rem 0', color: '#374151', fontSize: '0.85rem' }}>
                  <strong>Ingredients:</strong> {item.ingredients}
                </p>
                <p style={{ margin: 0, color: '#6B7280', fontSize: '0.85rem' }}>{item.description || item.instructions}</p>
              </div>

              {/* RIGHT ACTION BUTTONS ANCHORED AT FAR EDGE */}
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <button
                  onClick={() => handleApprove(item.id)}
                  style={{
                    padding: '0.55rem 1.2rem',
                    backgroundColor: '#10B981',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(item.id)}
                  style={{
                    padding: '0.55rem 1.2rem',
                    backgroundColor: '#EF4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};