import { useState } from 'react'
import { createRecipe, createIngredient } from '../services/recipeApi'

function RecipeForm({ onRecipeAdded, onCancel }) {
    const [name, setName] = useState('')
    const [cuisine, setCuisine] = useState('')
    const [prepTime, setPrepTime] = useState('')
    const [servings, setServings] = useState('')

    const [ingredients, setIngredients] = useState([
        {
            name: '',
            quantity: '',
            unit: '',
        },
    ])

    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)

    const [instructions, setInstructions] = useState('')

    function addIngredient() {
        setIngredients([
            ...ingredients,
            {
                name: '',
                quantity: '',
                unit: '',
            },
        ])
    }

    function removeIngredient(index) {
        if (ingredients.length === 1) {
            return
        }

        setIngredients(
            ingredients.filter((_, ingredientIndex) => ingredientIndex !== index)
        )
    }

    function updateIngredient(index, field, value) {
        const updatedIngredients = [...ingredients]

        updatedIngredients[index][field] = value

        setIngredients(updatedIngredients)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        setError('')

        if (!name || !cuisine || !prepTime || !servings || !instructions) {
            setError('Please fill in all recipe fields')
            return
        }

        const incompleteIngredient = ingredients.some(
            (ingredient) =>
                !ingredient.name ||
                !ingredient.quantity ||
                !ingredient.unit
        )

        if (incompleteIngredient) {
            setError('Please complete all ingredient fields')
            return
        }

        try {
            setSaving(true)

            // 1. Create the recipe
            const newRecipe = await createRecipe({
                name,
                cuisine,
                prepTime: Number(prepTime),
                servings: Number(servings),
                instructions,
            })

            // 2. Create all ingredients and link them to the recipe
            for (const ingredient of ingredients) {
                await createIngredient({
                    name: ingredient.name,
                    quantity: Number(ingredient.quantity),
                    unit: ingredient.unit,
                    recipe: {
                        id: newRecipe.id,
                    },
                })
            }

            // 3. Tell App.jsx that everything was created successfully
            onRecipeAdded(newRecipe)

        } catch (err) {
            setError('Failed to create recipe and ingredients')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="recipe-form">

            <button
                type="button"
                className="back-button"
                onClick={onCancel}
            >
                ← Back to Recipes
            </button>

            <h1>Add New Recipe</h1>

            <p>
                Create a recipe and add all its ingredients.
            </p>

            <form onSubmit={handleSubmit}>

                {/* Recipe Name */}
                <div className="form-group">
                    <label>Recipe Name</label>

                    <input
                        type="text"
                        placeholder="e.g. Egg Biryani"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Cuisine */}
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

                {/* Prep Time + Servings */}
                <div className="form-row">

                    <div className="form-group">
                        <label>Prep Time (minutes)</label>

                        <input
                            type="number"
                            min="1"
                            placeholder="30"
                            value={prepTime}
                            onChange={(e) => setPrepTime(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Servings</label>

                        <input
                            type="number"
                            min="1"
                            placeholder="4"
                            value={servings}
                            onChange={(e) => setServings(e.target.value)}
                        />
                    </div>

                </div>

                {/* Instructions */}
                <div className="form-group">

                    <label>How to Make It</label>

                    <textarea
                        rows="7"
                        placeholder={`Example:

                                1. Boil the eggs until fully cooked.
                                2. Heat oil in a pan.
                                3. Add onions and sauté until golden.
                                4. Add spices and tomatoes.
                                5. Add cooked rice and eggs.
                                6. Mix well and serve hot.`}
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                    />

                </div>

                {/* Ingredients */}
                <div className="ingredients-section">

                    <div className="ingredients-header">
                        <h2>Ingredients</h2>

                        <button
                            type="button"
                            className="add-ingredient-button"
                            onClick={addIngredient}
                        >
                            + Add Ingredient
                        </button>
                    </div>

                    {ingredients.map((ingredient, index) => (
                        <div
                            className="ingredient-row"
                            key={index}
                        >

                            <input
                                type="text"
                                placeholder="Ingredient name"
                                value={ingredient.name}
                                onChange={(e) =>
                                    updateIngredient(
                                        index,
                                        'name',
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                type="number"
                                min="1"
                                placeholder="Quantity"
                                value={ingredient.quantity}
                                onChange={(e) =>
                                    updateIngredient(
                                        index,
                                        'quantity',
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                type="text"
                                placeholder="Unit"
                                value={ingredient.unit}
                                onChange={(e) =>
                                    updateIngredient(
                                        index,
                                        'unit',
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                type="button"
                                className="remove-ingredient-button"
                                onClick={() => removeIngredient(index)}
                            >
                                ×
                            </button>

                        </div>
                    ))}

                </div>

                {/* Error */}
                {error && (
                    <p className="form-error">
                        {error}
                    </p>
                )}

                {/* Actions */}
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
                        {saving ? 'Creating...' : 'Create Recipe'}
                    </button>

                </div>

            </form>

        </div>
    )
}

export default RecipeForm