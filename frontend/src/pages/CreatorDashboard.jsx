import React, { useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { recipeService } from '../services/recipeService';

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [myRecipes, setMyRecipes] = useState([]);
  const [communityRecipes, setCommunityRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cuisine, setCuisine] = useState('Italian');

  // Ingredient List CRUD
  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQty, setIngredientQty] = useState('');

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    if (currentUser) loadCreatorData(currentUser.email);
  }, []);

  const loadCreatorData = async (email) => {
    setLoading(true);
    try {
      const [mine, publicFeed] = await Promise.all([
        recipeService.getMyRecipes(email),
        recipeService.getApprovedRecipes()
      ]);
      setMyRecipes(mine || []);
      setCommunityRecipes((publicFeed || []).filter(r => r.creatorEmail !== email));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (!ingredientName.trim()) return;
    setIngredientsList([...ingredientsList, { id: Date.now(), name: ingredientName.trim(), quantity: ingredientQty.trim() }]);
    setIngredientName('');
    setIngredientQty('');
  };

  const handleRemoveIngredient = (id) => {
    setIngredientsList(ingredientsList.filter((item) => item.id !== id));
  };

  const handleSubmitRecipe = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || ingredientsList.length === 0) {
      alert('Please fill out title, description, and at least one ingredient.');
      return;
    }

    const formattedIngredients = ingredientsList.map(i => `${i.quantity} ${i.name}`.trim()).join(', ');

    const payload = {
      title,
      description,
      cuisine,
      ingredients: formattedIngredients,
      creatorName: user?.name || user?.email,
      creatorEmail: user?.email,
      status: 'PENDING'
    };

    try {
      if (editingId) {
        await recipeService.updateRecipe(editingId, payload);
        alert('Recipe updated successfully!');
      } else {
        await recipeService.createRecipe(payload);
        alert('Recipe submitted for approval!');
      }
      resetForm();
      loadCreatorData(user.email);
    } catch (err) {
      alert('Failed to save recipe.');
    }
  };

  const handleEditRecipe = (recipe) => {
    setEditingId(recipe.id);
    setTitle(recipe.title);
    setDescription(recipe.description);
    setCuisine(recipe.cuisine || 'Italian');

    if (recipe.ingredients) {
      const parsed = recipe.ingredients.split(',').map((item, idx) => ({
        id: Date.now() + idx,
        name: item.trim(),
        quantity: ''
      }));
      setIngredientsList(parsed);
    } else {
      setIngredientsList([]);
    }
  };

  const handleDeleteRecipe = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    try {
      await recipeService.deleteRecipe(id);
      alert('Recipe deleted successfully!');
      loadCreatorData(user.email);
    } catch (err) {
      alert('Failed to delete recipe.');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setCuisine('Italian');
    setIngredientsList([]);
    setIngredientName('');
    setIngredientQty('');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#111827' }}>Creator Dashboard</h1>
            <p style={{ margin: 0, color: '#6B7280', fontSize: '0.875rem' }}>Author: {user?.name || user?.email}</p>
          </div>
          <button onClick={authService.logout} style={{ padding: '0.5rem 1rem', backgroundColor: '#EF4444', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Logout
          </button>
        </div>

        {/* CREATE / EDIT FORM */}
        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #E5E7EB', marginBottom: '2rem' }}>
          <h2 style={{ marginTop: 0, color: '#111827', fontSize: '1.25rem' }}>{editingId ? 'Edit Recipe' : 'Create New Recipe'}</h2>

          <form onSubmit={handleSubmitRecipe}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', fontSize: '0.875rem' }}>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Recipe Title" style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', fontSize: '0.875rem' }}>Cuisine</label>
                <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }}>
                  <option value="Italian">Italian</option>
                  <option value="Indian">Indian</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Asian">Asian</option>
                  <option value="American">American</option>
                </select>
              </div>
            </div>

            {/* INGREDIENT LIST CRUD */}
            <div style={{ backgroundColor: '#F3F4F6', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.875rem' }}>Ingredients Management</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <input type="text" placeholder="Ingredient Name" value={ingredientName} onChange={(e) => setIngredientName(e.target.value)} style={{ flex: 2, padding: '0.5rem', borderRadius: '4px', border: '1px solid #D1D5DB' }} />
                <input type="text" placeholder="Quantity / Unit" value={ingredientQty} onChange={(e) => setIngredientQty(e.target.value)} style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #D1D5DB' }} />
                <button type="button" onClick={handleAddIngredient} style={{ padding: '0.5rem 1rem', backgroundColor: '#10B981', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>+ Add</button>
              </div>

              {ingredientsList.length > 0 && (
                <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                  {ingredientsList.map((item) => (
                    <li key={item.id} style={{ marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                      {item.quantity} {item.name}
                      <button type="button" onClick={() => handleRemoveIngredient(item.id)} style={{ marginLeft: '0.5rem', color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Remove</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', fontSize: '0.875rem' }}>Instructions</label>
              <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Preparation details..." style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" style={{ padding: '0.6rem 1.2rem', backgroundColor: editingId ? '#059669' : '#2563EB', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                {editingId ? 'Update Recipe' : 'Submit for Approval'}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#6B7280', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
              )}
            </div>
          </form>
        </div>

        {/* MY SUBMISSIONS */}
        <h2 style={{ color: '#111827', fontSize: '1.25rem', marginBottom: '1rem' }}>My Recipes</h2>
        {loading && <p>Loading recipes...</p>}
        {!loading && myRecipes.length === 0 && <p style={{ color: '#6B7280' }}>No recipes created yet.</p>}

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
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
                    Recipe was rejected. Better luck next time! Modify and click Re-create.
                  </p>
                )}

                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', color: '#374151' }}><strong>Ingredients:</strong> {item.ingredients}</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>{item.description}</p>
              </div>

              {/* CAN ONLY EDIT OR DELETE OWN RECIPES */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleEditRecipe(item)} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#2563EB', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  {item.status === 'REJECTED' ? 'Re-create / Edit' : 'Edit'}
                </button>
                <button onClick={() => handleDeleteRecipe(item.id)} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#EF4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* COMMUNITY RECIPES (READ ONLY - NO EDIT OR DELETE BUTTONS) */}
        <h2 style={{ color: '#111827', fontSize: '1.25rem', marginBottom: '1rem' }}>Recipes by other Creators</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {communityRecipes.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', color: '#111827' }}>{item.title}</h3>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#059669', fontWeight: 'bold' }}>Author: {item.creatorName}</p>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', color: '#374151' }}><strong>Ingredients:</strong> {item.ingredients}</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};