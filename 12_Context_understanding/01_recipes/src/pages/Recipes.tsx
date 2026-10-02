// import { useEffect } from 'react'
import { useRecipes } from '../context/RecipeContext';


const Recipes = () => {
    const { recipes, updateRecipe, deleteRecipe } = useRecipes();
    console.log(recipes);
    return (
        <div>
            {recipes.map((recipe, id) => (
                <div key={id}>
                    {/* <button onClick={() => updateRecipe(recipe.id, { title: 'Updated Title' })}>Update</button> */}
                    <button className="px-5 py-2 bg-rose-500" onClick={() => deleteRecipe(recipe.id)}>Delete</button>
                    {/* <img src={recipe.image[0]} alt={recipe.title} /> */}
                    <h3>{recipe.title}</h3>
                    <p>{recipe.description}</p>
                    <p>{recipe.category}</p>
                    <p>{recipe.ingredients}</p>
                    <p>{recipe.instructions}</p>
                </div>
            ))}
            Recipes Page
        </div>
    )
}

export default Recipes
