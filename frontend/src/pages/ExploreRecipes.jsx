import { useEffect, useState } from 'react'
import { getRecipes } from '../services/recipeApi'
import RecipeCard from '../components/RecipeCard'

function ExploreRecipes({ onViewRecipe, onAddRecipe }) {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [cuisine, setCuisine] = useState('')

  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  async function loadRecipes() {
    try {
      setLoading(true)
      setError('')

      const data = await getRecipes(page, 6, cuisine)

      setRecipes(data.content)
      setTotalPages(data.totalPages)

    } catch (err) {
      setError('Failed to load recipes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRecipes()
  }, [page, cuisine])

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="page-state">
        <div className="loading-spinner"></div>
        <p>Loading delicious recipes...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-state">
        <h2>{error}</h2>
      </div>
    )
  }

  return (
    <main className="explore-page">

      {/* Page Header */}
      <section className="explore-header">

        <div>
          <span className="eyebrow">EXPLORE</span>

          <h1>
            Find your next
            <span> favorite recipe.</span>
          </h1>

          <p>
            Browse our collection of delicious recipes and discover
            something worth cooking today.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={onAddRecipe}
        >
          + Add Recipe
        </button>

      </section>

      {/* Search + Filter */}
      <section className="recipe-controls">

        <div className="search-wrapper">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

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

      </section>

      {/* Results */}
      <div className="results-heading">

        <div>
          <h2>All Recipes</h2>

          <span>
            Showing {filteredRecipes.length} recipes
          </span>
        </div>

      </div>

      {/* Recipe Grid */}
      {filteredRecipes.length > 0 ? (

        <div className="recipe-list">

          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onView={() => onViewRecipe(recipe.id)}
            />
          ))}

        </div>

      ) : (

        <div className="empty-state">
          <div>🍳</div>
          <h2>No recipes found</h2>
          <p>Try changing your search or cuisine filter.</p>
        </div>

      )}

      {/* Pagination */}
      {totalPages > 0 && (
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
      )}

    </main>
  )
}

export default ExploreRecipes