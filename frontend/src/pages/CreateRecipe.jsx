import React, { useState } from 'react';
import { authService } from '../services/authService';
import { recipeService } from '../services/recipeService';

export const CreateRecipe = () => {
  const user = authService.getCurrentUser();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cuisine, setCuisine] = useState('Italian');

  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQty, setIngredientQty] = useState('');

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
      await recipeService.createRecipe(payload);
      alert('Recipe created and submitted for approval successfully!');
      setTitle('');
      setDescription('');
      setCuisine('Italian');
      setIngredientsList([]);
    } catch (err) {
      alert('Failed to create recipe.');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, color: '#111827', fontSize: '1.5rem' }}>Create New Recipe</h2>
        <p style={{ margin: '0.25rem 0 0 0', color: '#6B7280', fontSize: '0.875rem' }}>
          Fill out the details below to submit a recipe for admin review
        </p>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
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

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', fontSize: '0.875rem' }}>Instructions</label>
            <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Preparation details..." style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }} />
          </div>

          <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2563EB', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Submit for Approval
          </button>
        </form>
      </div>
    </div>
  );
};