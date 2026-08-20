const API_URL = 'http://localhost:8080'

export async function getRecipes(page = 0, size = 10, cuisine = '') {
  let url = `${API_URL}/recipes?page=${page}&size=${size}`

  if (cuisine) {
    url += `&cuisine=${encodeURIComponent(cuisine)}`
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch recipes')
  }

  return response.json()
}

export async function getRecipeById(id) {
  const response = await fetch(`${API_URL}/recipes/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch recipe')
  }

  return response.json()
}

export async function getIngredientsByRecipeId(recipeId) {
  const response = await fetch(
    `${API_URL}/ingredients/recipe/${recipeId}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch ingredients')
  }

  return response.json()
}

// Create a new recipe
export async function createRecipe(recipe) {
  const response = await fetch(`${API_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  })

  if (!response.ok) {
    throw new Error('Failed to create recipe')
  }

  return response.json()
}

// Create an ingredient for a recipe
export async function createIngredient(ingredient) {
  const response = await fetch(`${API_URL}/ingredients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ingredient),
  })

  if (!response.ok) {
    throw new Error('Failed to create ingredient')
  }

  return response.json()
}
export async function updateRecipe(id, recipe) {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  })

  if (!response.ok) {
    throw new Error('Failed to update recipe')
  }

  return response.json()
}

export async function deleteRecipe(id) {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete recipe')
  }
}

export async function updateIngredient(id, ingredient) {
  const response = await fetch(`${API_URL}/ingredients/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ingredient),
  })

  if (!response.ok) {
    throw new Error('Failed to update ingredient')
  }

  return response.json()
}

export async function deleteIngredient(id) {
  const response = await fetch(`${API_URL}/ingredients/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete ingredient')
  }
}