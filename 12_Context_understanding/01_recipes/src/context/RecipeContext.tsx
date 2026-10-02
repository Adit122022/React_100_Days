import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export interface RecipeInterface {
    id: string;
    title: string;
    chefName: string;
    description: string;
    category: string;
    ingredients: string;
    instructions: string;
    image: string;
}

export interface RecipeContextType {
    recipes: RecipeInterface[];
    addRecipe: (recipe: RecipeInterface) => void;
    updateRecipe: (id: string, updatedRecipe: RecipeInterface) => void;
    deleteRecipe: (id: string) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined)

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
    const [recipes, setRecipes] = useState<RecipeInterface[]>([])

    useEffect(() => {
        const savedRecipes = localStorage.getItem('recipes');
        if (savedRecipes) {
            setRecipes(JSON.parse(savedRecipes));
        }
    }, []);

    const addRecipe = useCallback((recipe: RecipeInterface) => {
        setRecipes((prev) => {
            const next = [...prev, recipe]
            localStorage.setItem('recipes', JSON.stringify(next))
            return next
        })
    }, [])

    const updateRecipe = useCallback((id: string, updatedRecipe: RecipeInterface) => {
        setRecipes((prev) => {
            const next = prev.map((recipe) => recipe.id === id ? updatedRecipe : recipe)
            localStorage.setItem('recipes', JSON.stringify(next))
            return next
        })
    }, [])

    const deleteRecipe = useCallback((id: string) => {
        setRecipes((prev) => {
            const next = prev.filter((recipe) => recipe.id !== id)
            localStorage.setItem('recipes', JSON.stringify(next))
            return next
        })
    }, [])

    const value = useMemo(
        () => ({ recipes, addRecipe, updateRecipe, deleteRecipe }),
        [recipes, addRecipe, updateRecipe, deleteRecipe]
    )

    return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
}

export const useRecipes = () => {
    const context = useContext(RecipeContext)
    if (!context) {
        throw new Error('useRecipes must be used inside a <RecipeProvider>')
    }
    return context
}
