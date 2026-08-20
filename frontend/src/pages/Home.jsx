function Home({ onExplore, onAddRecipe }) {
  return (
    <main className="home-page">

      {/* Hero */}
      <section className="hero-section">

        <div className="hero-content">

          <span className="hero-badge">
            Discover something delicious
          </span>

          <h1>
            Cook something
            <span> amazing.</span>
          </h1>

          <p>
            Explore delicious recipes from different cuisines,
            discover new flavors, and create your own recipes.
          </p>

          <div className="hero-actions">

            <button
              className="primary-button"
              onClick={onExplore}
            >
              Explore Recipes →
            </button>

            <button
              className="secondary-button"
              onClick={onAddRecipe}
            >
              + Create Recipe
            </button>

          </div>

        </div>

        <div className="hero-visual">

          <div className="hero-circle"></div>

          <div className="food-card food-card-main">
            

            <div>
              <strong>Delicious Paneer</strong>
              <span>Indian Cuisine</span>
            </div>
          </div>

          <div className="floating-card floating-card-top">
            
            <span>Pizza</span>
          </div>

          <div className="floating-card floating-card-bottom">
            
            <span>Mutton Biryani</span>
          </div>

        </div>

      </section>

      {/* Stats */}
      <section className="stats-section">

        <div className="stat">
          <strong>10+</strong>
          <span>Recipes</span>
        </div>

        <div className="stat">
          <strong>7+</strong>
          <span>Cuisines</span>
        </div>

        <div className="stat">
          <strong>100%</strong>
          <span>Made with love</span>
        </div>

      </section>

      {/* Features */}
      <section className="features-section">

        <div className="section-heading">
          <span>WHY RECIPE MANAGER?</span>
          <h2>Everything you need to explore food.</h2>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            
            <h3>Discover</h3>
            <p>
              Find recipes quickly using search and cuisine filters.
            </p>
          </div>

          <div className="feature-card">
            
            <h3>Explore</h3>
            <p>
              Browse recipes from different cuisines and discover
              something new.
            </p>
          </div>

          <div className="feature-card">
            
            <h3>Create</h3>
            <p>
              Add your own recipes and organize all their ingredients.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="cta-section">

        <div>
          <span>READY TO COOK?</span>
          <h2>Your next favorite recipe is waiting.</h2>
        </div>

        <button
          className="primary-button"
          onClick={onExplore}
        >
          Explore Recipes →
        </button>

      </section>

    </main>
  )
}

export default Home