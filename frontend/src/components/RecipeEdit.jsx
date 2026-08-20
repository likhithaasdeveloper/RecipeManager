import { useEffect, useState } from 'react'
import { getRecipeById, updateRecipe } from '../services/recipeApi'

function RecipeEdit({ recipeId, onCancel, onUpdated }) {
  const [name, setName] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [prepTime, setPrepTime] = useState('')
  const [servings, setServings] = useState('')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [instructions, setInstructions] = useState('')

  useEffect(() => {
    async function loadRecipe() {
      try {
        const data = await getRecipeById(recipeId)

        setName(data.name)
        setCuisine(data.cuisine)
        setPrepTime(data.prepTime)
        setServings(data.servings)
        setInstructions(data.instructions || '')
      } catch (err) {
        setError('Failed to load recipe')
      } finally {
        setLoading(false)
      }
    }

    loadRecipe()
  }, [recipeId])

  async function handleSubmit(e) {
    e.preventDefault()

    if (!name || !cuisine || !prepTime || !servings || !instructions) {
      setError('Please fill in all fields')
      return
    }

    try {
      setSaving(true)
      setError('')

      const updatedRecipe = {
        name,
        cuisine,
        prepTime: Number(prepTime),
        servings: Number(servings),
        instructions,
      }

      await updateRecipe(recipeId, updatedRecipe)

      onUpdated()
    } catch (err) {
      setError('Failed to update recipe')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="page-state">
        <div className="loading-spinner"></div>
        <p>Loading recipe...</p>
      </div>
    )
  }

  return (
    <div className="recipe-form">

      <button
        type="button"
        className="back-button"
        onClick={onCancel}
      >
        ← Back to Recipe
      </button>

      <h1>Edit Recipe</h1>

      <p>
        Update the information for your recipe.
      </p>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Recipe Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Cuisine</label>

          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          >
            <option value="">Select cuisine</option>
            <option value="Italian">Italian</option>
            <option value="Indian">Indian</option>
            <option value="American">American</option>
            <option value="Chinese">Chinese</option>
            <option value="Mexican">Mexican</option>
            <option value="Japanese">Japanese</option>
            <option value="Greek">Greek</option>
          </select>
        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Prep Time (minutes)</label>

            <input
              type="number"
              min="1"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Servings</label>

            <input
              type="number"
              min="1"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
            />
          </div>

          <div className="form-group">

            <label>How to Make It</label>

                <textarea
                    rows="7"
                    placeholder="Write the cooking process step by step..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}/>

         </div>

        </div>

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

        <div className="form-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="submit-button"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>

        </div>

      </form>
    </div>
  )
}

export default RecipeEdit