import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import ExploreRecipes from './pages/ExploreRecipes'

import RecipeDetails from './components/RecipeDetails'
import RecipeForm from './components/RecipeForm'

import RecipeEdit from './components/RecipeEdit'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const [selectedRecipeId, setSelectedRecipeId] = useState(null)

  const [showForm, setShowForm] = useState(false)

  const [showEdit, setShowEdit] = useState(false)

  function goHome() {
    setSelectedRecipeId(null)
    setShowForm(false)
    setCurrentPage('home')
  }

  function goExplore() {
    setSelectedRecipeId(null)
    setShowForm(false)
    setCurrentPage('explore')
  }

  function openRecipe(recipeId) {
    setSelectedRecipeId(recipeId)
  }

  function openAddRecipe() {
    setSelectedRecipeId(null)
    setShowForm(true)
  }

  function closeRecipeDetails() {
    setSelectedRecipeId(null)
  }

  function closeForm() {
    setShowForm(false)
  }

  function openEdit() {
    setShowEdit(true)
  }

  function closeEdit() {
    setShowEdit(false)
  }

  return (
    <div className="app">

      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => {
          if (page === 'home') {
            goHome()
          } else if (page === 'explore') {
            goExplore()
          }
        }}
        onAddRecipe={openAddRecipe}
      />

      {selectedRecipeId !== null && showEdit ? (

        <RecipeEdit
          recipeId={selectedRecipeId}
          onCancel={closeEdit}
          onUpdated={() => {
            setShowEdit(false)
          }}
        />

      ) : selectedRecipeId !== null ? (

        <RecipeDetails
          recipeId={selectedRecipeId}
          onBack={closeRecipeDetails}
          onEdit={openEdit}
        />

      ) : showForm ? (

        <RecipeForm
          onCancel={closeForm}
          onRecipeAdded={() => {
            setShowForm(false)
            setCurrentPage('explore')
          }}
        />

      ) : currentPage === 'home' ? (

        <Home
          onExplore={goExplore}
          onAddRecipe={openAddRecipe}
        />

      ) : (

        <ExploreRecipes
          onViewRecipe={openRecipe}
          onAddRecipe={openAddRecipe}
        />

      )}

    </div>
  )
}

export default App