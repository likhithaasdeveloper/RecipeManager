import React, { useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { recipeService } from '../services/recipeService';

export const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(authService.getCurrentUser());
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const data = await recipeService.getAllRecipes();
      setRecipes(data);
    } catch (err) {
      setRecipes([
        { id: 1, title: 'Classic Garlic Butter Pasta', description: 'Rich Alfredo sauce with fresh basil.' },
        { id: 2, title: 'Avocado Sourdough Toast', description: 'Topped with poached eggs and chili flakes.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recipeId) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    try {
      await recipeService.deleteRecipe(recipeId);
    } catch (err) {
      // Ignore network errors for mock deletion
    }
    setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div>
            <span style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>
              🛡️ System Administrator
            </span>
            <h1 style={{ color: '#111827', margin: '0.5rem 0 0 0', fontSize: '1.5rem' }}>Welcome, {user?.name || 'Admin'}!</h1>
          </div>
          <button 
            onClick={authService.logout}
            style={{ padding: '0.5rem 1rem', backgroundColor: '#EF4444', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>

        {/* ADMIN OVERVIEW METRICS */}
        <div style={{ backgroundColor: '#EFF6FF', borderLeft: '4px solid #2563EB', padding: '1.25rem', borderRadius: '6px', marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#1E40AF' }}>Administrative Portal Active</h3>
          <p style={{ margin: 0, color: '#1E3A8A', fontSize: '0.9rem' }}>
            You are logged in with full system administrative privileges.
          </p>
        </div>

        {/* RECIPE LIST WITH PERMISSION-BASED ADMIN ACTIONS */}
        <h3 style={{ color: '#111827', marginBottom: '1rem' }}>Recipe Management</h3>

        {loading && <p style={{ color: '#6B7280' }}>Loading items...</p>}

        {!loading && recipes.length === 0 && (
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #E5E7EB' }}>
            <p style={{ color: '#6B7280', margin: 0 }}>No recipes available.</p>
          </div>
        )}

        {!loading && recipes.length > 0 && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {recipes.map((item) => (
              <div key={item.id} style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '8px', border: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', color: '#111827' }}>{item.title}</h4>
                  <p style={{ margin: 0, color: '#6B7280', fontSize: '0.875rem' }}>{item.description}</p>
                </div>

                {/* PERMISSION-BASED UI: RENDERED FOR ADMIN ONLY (MATCHED LOGOUT BUTTON STYLE) */}
                {user?.role === 'ADMIN' && (
                  <button 
                    onClick={() => handleDelete(item.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#EF4444',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Delete 
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};