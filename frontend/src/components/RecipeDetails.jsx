import { useEffect, useState } from 'react'
import {
  getRecipeById,
  getIngredientsByRecipeId,
  deleteRecipe,
  updateIngredient,
  deleteIngredient,
} from '../services/recipeApi'

function RecipeDetails({
  recipeId,
  onBack,
  onEdit,
}) {
  const [recipe, setRecipe] = useState(null)
  const [ingredients, setIngredients] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [deleting, setDeleting] = useState(false)

  // Ingredient editing
  const [editingIngredientId, setEditingIngredientId] = useState(null)
  const [ingredientName, setIngredientName] = useState('')
  const [ingredientQuantity, setIngredientQuantity] = useState('')
  const [ingredientUnit, setIngredientUnit] = useState('')

  const [savingIngredient, setSavingIngredient] = useState(false)
  const [deletingIngredientId, setDeletingIngredientId] = useState(null)

  useEffect(() => {
    async function loadRecipeDetails() {
      try {
        setLoading(true)
        setError('')

        const recipeData = await getRecipeById(recipeId)

        const ingredientData =
          await getIngredientsByRecipeId(recipeId)

        setRecipe(recipeData)
        setIngredients(ingredientData)

      } catch (err) {
        setError('Failed to load recipe details')
      } finally {
        setLoading(false)
      }
    }

    loadRecipeDetails()
  }, [recipeId])

  // =========================
  // DELETE RECIPE
  // =========================

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${recipe.name}"?`
    )

    if (!confirmed) {
      return
    }

    try {
      setDeleting(true)
      setError('')

      await deleteRecipe(recipeId)

      onBack()

    } catch (err) {
      setError('Failed to delete recipe')
      setDeleting(false)
    }
  }

  // =========================
  // START INGREDIENT EDIT
  // =========================

  function startIngredientEdit(ingredient) {
    setEditingIngredientId(ingredient.id)

    setIngredientName(ingredient.name)
    setIngredientQuantity(ingredient.quantity)
    setIngredientUnit(ingredient.unit)

    setError('')
  }

  // =========================
  // CANCEL INGREDIENT EDIT
  // =========================

  function cancelIngredientEdit() {
    setEditingIngredientId(null)

    setIngredientName('')
    setIngredientQuantity('')
    setIngredientUnit('')
  }

  // =========================
  // SAVE INGREDIENT
  // =========================

  async function handleIngredientUpdate(ingredientId) {
    if (!ingredientName || !ingredientQuantity || !ingredientUnit) {
      setError('Please fill in all ingredient fields')
      return
    }

    try {
      setSavingIngredient(true)
      setError('')

      const updatedIngredient = await updateIngredient(
        ingredientId,
        {
          name: ingredientName,
          quantity: Number(ingredientQuantity),
          unit: ingredientUnit,
          recipe: recipe,
        }
      )

      setIngredients((currentIngredients) =>
        currentIngredients.map((ingredient) =>
          ingredient.id === ingredientId
            ? updatedIngredient
            : ingredient
        )
      )

      cancelIngredientEdit()

    } catch (err) {
      setError('Failed to update ingredient')
    } finally {
      setSavingIngredient(false)
    }
  }

  // =========================
  // DELETE INGREDIENT
  // =========================

  async function handleIngredientDelete(ingredient) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${ingredient.name}"?`
    )

    if (!confirmed) {
      return
    }

    try {
      setDeletingIngredientId(ingredient.id)
      setError('')

      await deleteIngredient(ingredient.id)

      setIngredients((currentIngredients) =>
        currentIngredients.filter(
          (item) => item.id !== ingredient.id
        )
      )

    } catch (err) {
      setError('Failed to delete ingredient')
    } finally {
      setDeletingIngredientId(null)
    }
  }

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="page-state">
        <div className="loading-spinner"></div>
        <p>Loading recipe...</p>
      </div>
    )
  }

  // =========================
  // ERROR
  // =========================

  if (error && !recipe) {
    return (
      <div className="page-state">
        <h2>{error}</h2>
      </div>
    )
  }

  return (
    <main className="recipe-details-page">

      {/* Back */}
      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to Recipes
      </button>

      {/* Recipe Header */}
      <section className="recipe-details-header">

        <div>

          <span className="eyebrow">
            {recipe.cuisine.toUpperCase()} CUISINE
          </span>

          <h1>{recipe.name}</h1>

          <p>
            A delicious recipe ready to be explored.
          </p>

        </div>

        {/* Recipe Actions */}
        <div className="recipe-actions">

          <button
            className="edit-button"
            onClick={onEdit}
          >
            ✏️ Edit
          </button>

          <button
            className="delete-button"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : '🗑️ Delete'}
          </button>

        </div>

      </section>

      {/* Recipe Information */}
      <section className="recipe-info-grid">

        <div className="recipe-info-card">
          <span>⏱️</span>

          <div>
            <small>Prep Time</small>
            <strong>{recipe.prepTime} minutes</strong>
          </div>
        </div>

        <div className="recipe-info-card">
          <span>👥</span>

          <div>
            <small>Servings</small>
            <strong>{recipe.servings} people</strong>
          </div>
        </div>

        <div className="recipe-info-card">
          <span>🥘</span>

          <div>
            <small>Ingredients</small>
            <strong>{ingredients.length} items</strong>
          </div>
        </div>

      </section>

      {/* =========================
          INGREDIENTS
          ========================= */}

      <section className="ingredients-list-section">

        <div className="ingredients-title">

          <div>
            <span className="eyebrow">
              WHAT YOU NEED
            </span>

            <h2>Ingredients</h2>
          </div>

          <span className="ingredient-count">
            {ingredients.length} items
          </span>

        </div>

        {ingredients.length > 0 ? (

          <div className="ingredients-grid">

            {ingredients.map((ingredient) => (

              <div
                className="ingredient-card"
                key={ingredient.id}
              >

                {editingIngredientId === ingredient.id ? (

                  /* =========================
                     EDIT INGREDIENT
                     ========================= */

                  <div className="ingredient-edit-form">

                    <input
                      type="text"
                      value={ingredientName}
                      onChange={(e) =>
                        setIngredientName(e.target.value)
                      }
                      placeholder="Ingredient name"
                    />

                    <input
                      type="number"
                      min="1"
                      value={ingredientQuantity}
                      onChange={(e) =>
                        setIngredientQuantity(e.target.value)
                      }
                      placeholder="Quantity"
                    />

                    <input
                      type="text"
                      value={ingredientUnit}
                      onChange={(e) =>
                        setIngredientUnit(e.target.value)
                      }
                      placeholder="Unit"
                    />

                    <div className="ingredient-edit-actions">

                      <button
                        className="cancel-ingredient-button"
                        onClick={cancelIngredientEdit}
                      >
                        Cancel
                      </button>

                      <button
                        className="save-ingredient-button"
                        onClick={() =>
                          handleIngredientUpdate(ingredient.id)
                        }
                        disabled={savingIngredient}
                      >
                        {savingIngredient
                          ? 'Saving...'
                          : 'Save'}
                      </button>

                    </div>

                  </div>

                ) : (

                  /* =========================
                     NORMAL INGREDIENT
                     ========================= */

                  <>

                    <div className="ingredient-icon">
                      🥄
                    </div>

                    <div className="ingredient-content">

                      <strong>
                        {ingredient.name}
                      </strong>

                      <span>
                        {ingredient.quantity}{' '}
                        {ingredient.unit}
                      </span>

                    </div>

                    <div className="ingredient-actions">

                      <button
                        className="ingredient-edit-button"
                        onClick={() =>
                          startIngredientEdit(ingredient)
                        }
                      >
                        ✏️
                      </button>

                      <button
                        className="ingredient-delete-button"
                        onClick={() =>
                          handleIngredientDelete(ingredient)
                        }
                        disabled={
                          deletingIngredientId === ingredient.id
                        }
                      >
                        {deletingIngredientId === ingredient.id
                          ? '...'
                          : '🗑️'}
                      </button>

                    </div>

                  </>

                )}

              </div>

            ))}

          </div>

        ) : (

          <div className="empty-state">

            <div>🥄</div>

            <h2>No ingredients yet</h2>

            <p>
              This recipe doesn't have any ingredients added yet.
            </p>

          </div>

        )}

      </section>

      {/* =========================
          COOKING INSTRUCTIONS
          ========================= */}

      <section className="instructions-section">

        <div className="instructions-title">

          <div>
            <span className="eyebrow">
              STEP BY STEP
            </span>

            <h2>How to Make It</h2>
          </div>

        </div>

        {recipe.instructions ? (

          <div className="instructions-list">

            {recipe.instructions
              .split('\n')
              .filter((step) => step.trim() !== '')
              .map((step, index) => (

                <div
                  className="instruction-step"
                  key={index}
                >

                  <div className="step-number">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="step-content">
                    <p>
                      {step.replace(/^\d+\.\s*/, '')}
                    </p>
                  </div>

                </div>

              ))}

          </div>

        ) : (

          <div className="empty-state">

            <div>👨‍🍳</div>

            <h2>No instructions yet</h2>

            <p>
              This recipe doesn't have cooking instructions yet.
            </p>

          </div>

        )}

      </section>

      {/* Error */}
      {error && (
        <p className="form-error">
          {error}
        </p>
      )}

    </main>
  )
}

export default RecipeDetails