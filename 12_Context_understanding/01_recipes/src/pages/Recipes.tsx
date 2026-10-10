import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useRecipes, type RecipeInterface } from '../context/RecipeContext'
import RecipeCard from '../components/RecipeCard'

const Recipes = () => {
    const { recipes, deleteRecipe, updateRecipe } = useRecipes()
    const [editingRecipe, setEditingRecipe] = useState<RecipeInterface | null>(null)

    const saveRecipe = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!editingRecipe) return
        const formData = new FormData(event.currentTarget)
        const updatedRecipe: RecipeInterface = {
            ...editingRecipe,
            title: String(formData.get('title') ?? '').trim(),
            chefName: String(formData.get('chefName') ?? '').trim(),
            category: String(formData.get('category') ?? ''),
            description: String(formData.get('description') ?? '').trim(),
            image: String(formData.get('image') ?? '').trim(),
            ingredients: String(formData.get('ingredients') ?? '').trim(),
            instructions: String(formData.get('instructions') ?? '').trim(),
        }
        updateRecipe(editingRecipe.id, updatedRecipe)
        setEditingRecipe(null)
    }

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
                    {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} onDelete={deleteRecipe} onUpdate={setEditingRecipe} />)}
                </section>
            ) : (
                <section className="saved-recipes-empty">
                    <span aria-hidden="true">✳</span>
                    <h2>Your recipe box is waiting.</h2>
                    <p>Share the first recipe and start filling it with good things.</p>
                    <Link className="button-primary" to="/create-recipes">Share a recipe <span aria-hidden="true">↗</span></Link>
                </section>
            )}
            {editingRecipe && (
                <div className="recipe-edit-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setEditingRecipe(null) }}>
                    <section className="recipe-edit-modal" role="dialog" aria-modal="true" aria-labelledby="recipe-edit-title">
                        <div className="recipe-edit-heading">
                            <div><span className="create-kicker"><i /> MAKE IT YOUR OWN</span><h2 id="recipe-edit-title">Edit recipe</h2></div>
                            <button type="button" className="recipe-edit-close" onClick={() => setEditingRecipe(null)} aria-label="Close edit form">×</button>
                        </div>
                        <form onSubmit={saveRecipe} className="recipe-edit-form">
                            <label>Recipe name<input name="title" defaultValue={editingRecipe.title} required /></label>
                            <div className="recipe-edit-two">
                                <label>Chef name<input name="chefName" defaultValue={editingRecipe.chefName} required /></label>
                                <label>Category<select name="category" defaultValue={editingRecipe.category} required>{['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks', 'Drinks'].map((category) => <option key={category}>{category}</option>)}</select></label>
                            </div>
                            <label>Introduction<textarea name="description" rows={3} defaultValue={editingRecipe.description} required /></label>

                            <div className="recipe-edit-two">
                                <label>Ingredients<textarea name="ingredients" rows={6} defaultValue={editingRecipe.ingredients} required /></label>
                                <label>Method<textarea name="instructions" rows={6} defaultValue={editingRecipe.instructions} required /></label>
                            </div>
                            <div className="recipe-edit-actions"><button type="button" className="recipe-edit-cancel" onClick={() => setEditingRecipe(null)}>Cancel</button><button type="submit" className="button-primary">Save changes</button></div>
                        </form>
                    </section>
                </div>
            )}
        </main>
    )
}

export default Recipes
