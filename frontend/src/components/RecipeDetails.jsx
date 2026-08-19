import { useEffect, useState } from 'react'
import {
  getRecipeById,
  getIngredientsByRecipeId,
} from '../services/recipeApi'

function RecipeDetails({ recipeId, onBack }) {
  const [recipe, setRecipe] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadRecipeDetails() {
      try {
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

  if (loading) {
    return <h2>Loading recipe...</h2>
  }

  if (error) {
    return <h2>{error}</h2>
  }

  return (
    <div className="recipe-details">
      <button onClick={onBack}>← Back to Recipes</button>

      <h1>{recipe.name}</h1>

      <p>
        <strong>Cuisine:</strong> {recipe.cuisine}
      </p>

      <p>
        <strong>Prep Time:</strong> {recipe.prepTime} minutes
      </p>

      <p>
        <strong>Servings:</strong> {recipe.servings}
      </p>

      <h2>Ingredients</h2>

      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name} — {ingredient.quantity}{' '}
            {ingredient.unit}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecipeDetails