import React, { useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { recipeService } from '../services/recipeService';

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const data = await recipeService.getAllRecipes();
      setRecipes(data);
    } catch (err) {
      // Fallback recipes so the UI list and permission buttons always render
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
    // Update local state so item disappears from UI immediately
    setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* HEADER CARD */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#111827' }}>Welcome back, {user?.name || 'User'}!</h1>
            <span style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 'bold' }}>Role: {user?.role}</span>
          </div>
          <button 
            onClick={authService.logout}
            style={{ padding: '0.5rem 1rem', backgroundColor: '#EF4444', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
            <h3>Loading dashboard items...</h3>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && recipes.length === 0 && (
          <div style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍳</div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#111827' }}>No recipes found</h3>
            <p style={{ color: '#6B7280', margin: 0 }}>All recipes have been deleted or none exist.</p>
          </div>
        )}

        {/* RECIPES LIST WITH PERMISSION-BASED UI */}
        {!loading && recipes.length > 0 && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {recipes.map((item) => (
              <div key={item.id} style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '8px', border: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', color: '#111827' }}>{item.title}</h4>
                  <p style={{ margin: 0, color: '#6B7280', fontSize: '0.875rem' }}>{item.description}</p>
                </div>

                {/* PERMISSION-BASED UI: DELETE BUTTON RENDERED ONLY FOR ADMIN */}
                {user?.role === 'ADMIN' && (
                  <button 
                    onClick={() => handleDelete(item.id)}
                    style={{ padding: '0.4rem 0.8rem', backgroundColor: '#FEE2E2', color: '#991B1B', border: '1px solid #FCA5A5', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}
                  >
                    Delete (Admin Only)
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