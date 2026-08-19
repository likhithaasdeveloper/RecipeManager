function RecipeCard({ recipe, onView }) {
  return (
    <div className="recipe-card">
      <h2>{recipe.name}</h2>

      <p>
        <strong>Cuisine:</strong> {recipe.cuisine}
      </p>

      <p>
        <strong>Prep Time:</strong> {recipe.prepTime} minutes
      </p>

      <p>
        <strong>Servings:</strong> {recipe.servings}
      </p>

      <button onClick={onView}>
        View Recipe
      </button>
    </div>
  )
}

export default RecipeCard