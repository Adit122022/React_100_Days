import React, { useContext, useEffect } from 'react'
import type { RecipeContextType } from '../context/RecipeContext';
import RecipeContext from '../context/RecipeContext';


const Recipes = () => {

    const { recipes } = useContext(RecipeContext) as RecipeContextType;
    useEffect(() => {
        console.log(recipes);
    }, [recipes]);
    return (
        <div>
            Recipes Page
        </div>
    )
}

export default Recipes
