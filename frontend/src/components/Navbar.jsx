function Navbar({ currentPage, onNavigate, onAddRecipe }) {
  return (
    <nav className="navbar">

      <button
        className="brand"
        onClick={() => onNavigate('home')}
      >
        <span className="brand-icon">🍴</span>
        <span>RecipeVault</span>
      </button>

      <div className="nav-links">

        <button
          className={currentPage === 'home' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNavigate('home')}
        >
          Home
        </button>

        <button
          className={currentPage === 'explore' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNavigate('explore')}
        >
          Explore
        </button>

        <button
          className="nav-add-button"
          onClick={onAddRecipe}
        >
          + Add Recipe
        </button>

      </div>

    </nav>
  )
}

export default Navbar