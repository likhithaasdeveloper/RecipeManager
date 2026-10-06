import React, { useEffect, useState, useCallback } from 'react';
import { authService } from '../services/authService';
import { recipeService } from '../services/recipeService';

export const MyRecipes = () => {
  const user = authService.getCurrentUser();
  const userEmail = user?.email;

  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cuisine, setCuisine] = useState('Italian');
  const [ingredients, setIngredients] = useState('');

  const fetchMyRecipes = useCallback(async () => {
    if (!userEmail) return;
    setLoading(true);
    try {
      const mine = await recipeService.getMyRecipes(userEmail);
      setMyRecipes(mine || []);
    } catch (err) {
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  // DEPEND ONLY ON userEmail primitive string to stop the infinite loop
  useEffect(() => {
    fetchMyRecipes();
  }, [fetchMyRecipes]);

  const handleEditClick = (recipe) => {
    setEditingId(recipe.id);
    setTitle(recipe.title);
    setDescription(recipe.description);
    setCuisine(recipe.cuisine || 'Italian');
    setIngredients(recipe.ingredients || '');
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await recipeService.updateRecipe(editingId, {
        title,
        description,
        cuisine,
        ingredients,
        creatorName: user?.name || userEmail,
        creatorEmail: userEmail,
        status: 'PENDING'
      });
      alert('Recipe updated and resubmitted for approval!');
      setEditingId(null);
      fetchMyRecipes();
    } catch (err) {
      alert('Failed to update recipe');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    try {
      await recipeService.deleteRecipe(id);
      alert('Recipe deleted successfully!');
      fetchMyRecipes();
    } catch (err) {
      alert('Failed to delete recipe');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '850px' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, color: '#111827', fontSize: '1.5rem' }}>My Recipes</h2>
        <p style={{ margin: '0.25rem 0 0 0', color: '#6B7280', fontSize: '0.875rem' }}>
          Manage your submitted recipes, view approval status, or edit rejected dishes
        </p>
      </div>

      {/* EDIT MODAL / FORM INLINE */}
      {editingId && (
        <div style={{ backgroundColor: '#FEF3C7', padding: '1.25rem', borderRadius: '8px', border: '1px solid #F59E0B', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#92400E' }}>Edit Recipe</h3>
          <form onSubmit={handleUpdateSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '4px', border: '1px solid #D1D5DB' }} />
            <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients" style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '4px', border: '1px solid #D1D5DB' }} />
            <textarea rows="2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Instructions" style={{ width: '100%', padding: '0.5rem', marginBottom: '0.75rem', borderRadius: '4px', border: '1px solid #D1D5DB' }} />
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Save Changes</button>
              <button type="button" onClick={() => setEditingId(null)} style={{ padding: '0.5rem 1rem', backgroundColor: '#6B7280', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading && <p style={{ color: '#6B7280' }}>Loading your recipes...</p>}

      {!loading && myRecipes.length === 0 && (
        <div style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #E5E7EB' }}>
          <p style={{ color: '#6B7280', margin: 0 }}>You haven't created any recipes yet.</p>
        </div>
      )}

      {!loading && myRecipes.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {myRecipes.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '8px', border: item.status === 'REJECTED' ? '1px solid #FCA5A5' : '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#111827' }}>{item.title}</h3>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 'bold', 
                    padding: '0.2rem 0.5rem', 
                    borderRadius: '4px',
                    backgroundColor: item.status === 'APPROVED' ? '#D1FAE5' : item.status === 'REJECTED' ? '#FEE2E2' : '#FEF3C7',
                    color: item.status === 'APPROVED' ? '#065F46' : item.status === 'REJECTED' ? '#991B1B' : '#92400E'
                  }}>
                    {item.status === 'APPROVED' ? 'Approved' : item.status === 'REJECTED' ? 'Rejected' : 'Pending Approval'}
                  </span>
                </div>

                {item.status === 'REJECTED' && (
                  <p style={{ margin: '0.25rem 0', color: '#DC2626', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    Recipe was rejected by admin. Modify details and resubmit!
                  </p>
                )}

                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', color: '#374151' }}><strong>Ingredients:</strong> {item.ingredients}</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>{item.description}</p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleEditClick(item)} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#2563EB', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  {item.status === 'REJECTED' ? 'Re-create / Edit' : 'Edit'}
                </button>
                <button onClick={() => handleDelete(item.id)} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#EF4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};