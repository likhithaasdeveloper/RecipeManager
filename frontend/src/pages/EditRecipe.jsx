import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { recipeService } from '../services/recipeService';
import { SearchableCuisineSelect } from '../components/common/SearchableCuisineSelect';

export const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cuisine, setCuisine] = useState('Italian');
  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQty, setIngredientQty] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const myRecipes = await recipeService.getMyRecipes(user?.email);
        const recipeToEdit = myRecipes.find((r) => r.id === Number(id));

        if (recipeToEdit) {
          setTitle(recipeToEdit.title || '');
          setDescription(recipeToEdit.description || '');
          setCuisine(recipeToEdit.cuisine || 'Italian');

          if (recipeToEdit.ingredients) {
            const items = recipeToEdit.ingredients.split(',').map((str, idx) => ({
              id: Date.now() + idx,
              name: str.trim(),
              quantity: ''
            }));
            setIngredientsList(items);
          }
        } else {
          alert('Recipe not found.');
          navigate('/creator/my-recipes');
        }
      } catch (err) {
        console.error('Failed to load recipe for editing:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchRecipe();
    }
  }, [id, user?.email, navigate]);

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (!ingredientName.trim()) return;
    setIngredientsList([
      ...ingredientsList,
      { id: Date.now(), name: ingredientName.trim(), quantity: ingredientQty.trim() }
    ]);
    setIngredientName('');
    setIngredientQty('');
  };

  const handleRemoveIngredient = (idToRemove) => {
    setIngredientsList(ingredientsList.filter((item) => item.id !== idToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || ingredientsList.length === 0) {
      alert('Please fill out title, description, and at least one ingredient.');
      return;
    }

    const formattedIngredients = ingredientsList
      .map((i) => (i.quantity ? `${i.quantity} ${i.name}`.trim() : i.name))
      .join(', ');

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
      await recipeService.updateRecipe(id, payload);
      alert('Recipe updated successfully and resubmitted for admin review!');
      navigate('/creator/my-recipes');
    } catch (err) {
      alert('Failed to update recipe.');
    }
  };

  if (loading) return <p style={{ color: '#6B7280' }}>Loading recipe details...</p>;

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', width: '100%' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, color: '#111827', fontSize: '1.5rem' }}>Edit Recipe</h2>
          <p style={{ margin: '0.25rem 0 0 0', color: '#6B7280', fontSize: '0.875rem' }}>
            Modify your recipe details and resubmit for approval
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/creator/my-recipes')}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#6B7280', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Cancel
        </button>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', fontSize: '0.875rem' }}>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Recipe Title"
                style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', fontSize: '0.875rem' }}>Cuisine</label>

              {/* SEARCHABLE CUISINE SELECT INTEGRATED HERE */}
              <SearchableCuisineSelect
                value={cuisine}
                onChange={(selected) => setCuisine(selected)}
              />

            </div>
          </div>

          <div style={{ backgroundColor: '#F3F4F6', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.875rem' }}>Ingredients Management</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <input
                type="text"
                placeholder="Ingredient Name"
                value={ingredientName}
                onChange={(e) => setIngredientName(e.target.value)}
                style={{ flex: 2, padding: '0.5rem', borderRadius: '4px', border: '1px solid #D1D5DB' }}
              />
              <input
                type="text"
                placeholder="Quantity / Unit"
                value={ingredientQty}
                onChange={(e) => setIngredientQty(e.target.value)}
                style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #D1D5DB' }}
              />
              <button type="button" onClick={handleAddIngredient} style={{ padding: '0.5rem 1rem', backgroundColor: '#10B981', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                + Add
              </button>
            </div>

            {ingredientsList.length > 0 && (
              <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {ingredientsList.map((item) => (
                  <li key={item.id} style={{ marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                    {item.quantity ? `${item.quantity} ${item.name}` : item.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(item.id)}
                      style={{ marginLeft: '0.5rem', color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', fontSize: '0.875rem' }}>Instructions / Description</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Preparation details..."
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2563EB', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              Save Changes & Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};