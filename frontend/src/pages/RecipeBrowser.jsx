import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { recipeService } from '../services/recipeService';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export const RecipeBrowser = ({ showSavedOnly = false, readOnly = false }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [savedRecipeIds, setSavedRecipeIds] = useState([]);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user && user.email) {
      setCurrentUser(user);
      const savedKey = `saved_recipes_${user.email}`;
      const saved = localStorage.getItem(savedKey);
      if (saved) setSavedRecipeIds(JSON.parse(saved));
    } else {
      setCurrentUser(null);
      setSavedRecipeIds([]);
    }

    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const data = await recipeService.getApprovedRecipes();
      setRecipes(data || []);
    } catch (err) {
      console.error('Failed to load recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = [...recipes];

    if (searchQuery) {
      result = result.filter((r) =>
        r.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.ingredients?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCuisine !== 'All') {
      result = result.filter((r) => r.cuisine?.toLowerCase() === selectedCuisine.toLowerCase());
    }

    if (showSavedOnly) {
      result = result.filter((r) => savedRecipeIds.includes(r.id));
    }

    setFilteredRecipes(result);
  }, [searchQuery, selectedCuisine, showSavedOnly, recipes, savedRecipeIds]);

  const toggleSaveRecipe = (id) => {
    // 1. IF GUEST USER -> ALERT AND REDIRECT
    if (!currentUser) {
      alert('Please log in or register to save recipes to your profile!');
      navigate('/login');
      return;
    }

    // 2. IF LOGGED IN END-USER -> SAVE
    let updatedSaved;
    if (savedRecipeIds.includes(id)) {
      updatedSaved = savedRecipeIds.filter((item) => item !== id);
      alert('Recipe removed from saved list.');
    } else {
      updatedSaved = [...savedRecipeIds, id];
      alert('Recipe saved to your favorites successfully!');
    }

    setSavedRecipeIds(updatedSaved);
    localStorage.setItem(`saved_recipes_${currentUser.email}`, JSON.stringify(updatedSaved));
  };

  const handleDeleteAdminRecipe = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe permanently?')) return;
    try {
      await recipeService.deleteRecipe(id);
      alert('Recipe deleted successfully!');
      fetchRecipes();
    } catch (err) {
      alert('Failed to delete recipe.');
    }
  };

  const userRole = (currentUser?.role || '').toUpperCase().replace('ROLE_', '');
  const isAdmin = userRole === 'ADMIN';

  const content = (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto', padding: currentUser ? '0' : '2rem 1rem' }}>
      
      {/* HEADER BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', color: '#111827' }}>
            {showSavedOnly ? 'Saved Recipes' : 'Approved Recipes'}
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', color: '#6B7280', fontSize: '0.875rem' }}>
            {showSavedOnly ? 'Your bookmarked dishes' : 'Browse through community-approved dishes'}
          </p>
        </div>

        {/* GUEST VIEW CONTROLS */}
        {!currentUser && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
            <Link 
              to="/login" 
              style={{ padding: '0.5rem 1rem', backgroundColor: '#2563EB', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.875rem' }}
            >
              Log In
            </Link>
            <Link 
              to="/register" 
              style={{ padding: '0.5rem 1rem', backgroundColor: '#10B981', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.875rem' }}
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* SEARCH & FILTER BAR */}
      <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px', border: '1px solid #E5E7EB', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="Search title or ingredients..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 2, padding: '0.65rem', borderRadius: '6px', border: '1px solid #D1D5DB', minWidth: '200px', outline: 'none' }}
        />

        <select 
          value={selectedCuisine} 
          onChange={(e) => setSelectedCuisine(e.target.value)}
          style={{ flex: 1, padding: '0.65rem', borderRadius: '6px', border: '1px solid #D1D5DB', minWidth: '150px', outline: 'none' }}
        >
          <option value="All">All Cuisines</option>
          <option value="Italian">Italian</option>
          <option value="Indian">Indian</option>
          <option value="Mexican">Mexican</option>
          <option value="Asian">Asian</option>
          <option value="American">American</option>
        </select>
      </div>

      {loading && <p style={{ color: '#6B7280', textAlign: 'center' }}>Loading recipes...</p>}

      {!loading && filteredRecipes.length === 0 && (
        <div style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #E5E7EB' }}>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '1rem' }}>
            {showSavedOnly ? 'You have no saved recipes yet.' : 'No matching recipes found.'}
          </p>
        </div>
      )}

      {!loading && filteredRecipes.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {filteredRecipes.map((item) => {
            const isSaved = savedRecipeIds.includes(item.id);
            return (
              <div 
                key={item.id} 
                style={{ 
                  backgroundColor: '#fff', 
                  padding: '1.25rem', 
                  borderRadius: '8px', 
                  border: '1px solid #E5E7EB', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justify: 'space-between',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', fontSize: '0.75rem', fontWeight: 'bold', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                      {item.cuisine || 'Approved'}
                    </span>

                    {/* SAVE BUTTON (SHOWN FOR GUESTS AND END USERS) */}
                    {!readOnly && (
                      <button 
                        onClick={() => toggleSaveRecipe(item.id)}
                        style={{ 
                          border: '1px solid ' + (isSaved ? '#D97706' : '#D1D5DB'), 
                          backgroundColor: isSaved ? '#FEF3C7' : '#FFF', 
                          cursor: 'pointer', 
                          padding: '0.25rem 0.6rem',
                          borderRadius: '4px',
                          fontSize: '0.8rem', 
                          color: isSaved ? '#B45309' : '#4B5563', 
                          fontWeight: '600' 
                        }}
                      >
                        {isSaved ? ' Saved' : 'Save'}
                      </button>
                    )}

                    {/* DELETE BUTTON FOR ADMINS */}
                    {isAdmin && readOnly && (
                      <button
                        onClick={() => handleDeleteAdminRecipe(item.id)}
                        style={{
                          backgroundColor: '#EF4444',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '0.25rem 0.6rem',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  <h3 style={{ margin: '0 0 0.4rem 0', color: '#111827', fontSize: '1.1rem' }}>{item.title}</h3>
                  <p style={{ margin: '0 0 0.5rem 0', color: '#059669', fontSize: '0.8rem', fontWeight: '600' }}>
                    Author: {item.creatorName || item.creatorEmail || 'Community Chef'}
                  </p>
                  <p style={{ margin: '0 0 0.5rem 0', color: '#374151', fontSize: '0.85rem' }}>
                    <strong>Ingredients:</strong> {item.ingredients}
                  </p>
                  <p style={{ margin: 0, color: '#6B7280', fontSize: '0.85rem', lineHeight: '1.4' }}>
                    {item.description || item.instructions}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );

  // If user is logged in, DashboardLayout renders it automatically via Outlet or parent. 
  // Returning content directly works cleanly for both guests and authenticated shells!
  return content;
};