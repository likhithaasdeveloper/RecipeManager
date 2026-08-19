import { useEffect, useState } from 'react'
import './App.css'
import { getRecipes } from './services/recipeApi'
import RecipeCard from './components/RecipeCard'
import RecipeDetails from './components/RecipeDetails'
import RecipeForm from './components/RecipeForm'

function App() {
  const [recipes, setRecipes] = useState([])
  const [selectedRecipeId, setSelectedRecipeId] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [cuisine, setCuisine] = useState('')

  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const [showForm, setShowForm] = useState(false)

  // Fetch recipes from backend
  async function loadRecipes() {
    try {
      setLoading(true)
      setError('')

      const data = await getRecipes(page, 5, cuisine)

      setRecipes(data.content)
      setTotalPages(data.totalPages)
    } catch (err) {
      setError('Failed to load recipes')
    } finally {
      setLoading(false)
    }
  }

  // Fetch recipes whenever page or cuisine changes
  useEffect(() => {
    loadRecipes()
  }, [page, cuisine])

  // Loading state
  if (loading) {
    return <h2>Loading recipes...</h2>
  }

  // Error state
  if (error) {
    return <h2>{error}</h2>
  }

  // Show recipe details
  if (selectedRecipeId !== null) {
    return (
      <RecipeDetails
        recipeId={selectedRecipeId}
        onBack={() => setSelectedRecipeId(null)}
      />
    )
  }

  // Show Add Recipe form
  if (showForm) {
    return (
      <RecipeForm
        onCancel={() => setShowForm(false)}
        onRecipeAdded={async () => {
          setShowForm(false)

          // Refresh recipes after creating a new recipe
          await loadRecipes()
        }}
      />
    )
  }

  // Search recipes by name
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app">

      {/* Add Recipe Button */}
      <button
        className="add-recipe-button"
        onClick={() => setShowForm(true)}
      >
        + Add Recipe
      </button>

      {/* Header */}
      <h1>Recipe Manager</h1>

      <p>
        Discover, manage and explore your favorite recipes
      </p>

      {/* Search and Cuisine Filter */}
      <div className="filters">

        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={cuisine}
          onChange={(e) => {
            setCuisine(e.target.value)
            setPage(0)
          }}
        >
          <option value="">All cuisines</option>
          <option value="Italian">Italian</option>
          <option value="Indian">Indian</option>
          <option value="American">American</option>
          <option value="Chinese">Chinese</option>
          <option value="Mexican">Mexican</option>
          <option value="Japanese">Japanese</option>
          <option value="Greek">Greek</option>
        </select>

      </div>

      {/* Recipe Cards */}
      <div className="recipe-list">

        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onView={() => setSelectedRecipeId(recipe.id)}
          />
        ))}

      </div>

      {/* Pagination */}
      <div className="pagination">

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          ← Previous
        </button>

        <span>
          Page {page + 1} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages - 1}
        >
          Next →
        </button>

      </div>

    </div>
  )
}

export default App