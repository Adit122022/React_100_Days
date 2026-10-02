// import { useEffect } from 'react'
import { useRecipes } from '../context/RecipeContext';


const Recipes = () => {
    const { recipes, deleteRecipe } = useRecipes();
    console.log(recipes);
    return (
        <div>
            {recipes.map((recipe, id) => (
                <article key={id} className="saved-recipe-card">
                    {/* <button onClick={() => updateRecipe(recipe.id, { title: 'Updated Title' })}>Update</button> */}
                    {typeof recipe.image === 'string' && <img src={recipe.image} alt={recipe.title} className="saved-recipe-image" />}
                    <div className="saved-recipe-copy">
                        <div className="saved-recipe-top"><span>{recipe.category}</span><button className="saved-recipe-delete" onClick={() => deleteRecipe(recipe.id)}>Delete</button></div>
                        <h3>{recipe.title}</h3>
                        <p className="saved-recipe-chef">By {recipe.chefName || 'A goodtable cook'}</p>
                        <p>{recipe.description}</p>
                        <h4>Ingredients</h4><p>{recipe.ingredients}</p>
                        <h4>Method</h4><p>{recipe.instructions}</p>
                    </div>
                </article>
            ))}
            {!recipes.length && <div className="saved-recipes-empty"><span>✳</span><h2>Your recipe box is waiting.</h2><p>Share the first recipe and start filling it with good things.</p></div>}
        </div>
    )
}

export default Recipes
