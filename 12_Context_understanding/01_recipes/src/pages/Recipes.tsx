import { Link } from 'react-router-dom'
import { useRecipes } from '../context/RecipeContext'
import RecipeCard from '../components/RecipeCard'

const Recipes = () => {
    const { recipes, deleteRecipe } = useRecipes()

    return (
        <main className="recipe-box-page">
            <header className="recipe-box-heading">
                <span className="create-kicker"><i /> FROM OUR KITCHENS TO YOURS</span>
                <h1>The recipe <em>box.</em></h1>
                <p>Good things are better shared. Here are the recipes you’ve gathered around the table.</p>
                <span className="recipe-box-count">{recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}</span>
            </header>
            {recipes.length ? (
                <section className="recipe-box-grid" aria-label="Saved recipes">
                    {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} onDelete={deleteRecipe} />)}
                </section>
            ) : (
                <section className="saved-recipes-empty">
                    <span aria-hidden="true">✳</span>
                    <h2>Your recipe box is waiting.</h2>
                    <p>Share the first recipe and start filling it with good things.</p>
                    <Link className="button-primary" to="/create-recipes">Share a recipe <span aria-hidden="true">↗</span></Link>
                </section>
            )}
        </main>
    )
}

export default Recipes
