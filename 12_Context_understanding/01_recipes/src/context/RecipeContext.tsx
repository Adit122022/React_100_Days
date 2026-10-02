import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

export interface Recipe {
    id: string;
    title: string;
    description: string;
    category: string;
    ingredients: string;
    instructions: string;
    image: FileList;
}

export interface RecipeContextType {
    recipes: Recipe[];
    addRecipe: (recipe: Recipe) => void;
    updateRecipe: (id: string, updatedRecipe: Recipe) => void;
    deleteRecipe: (id: string) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined)

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([])

    const addRecipe = useCallback((recipe: Recipe) => {
        setRecipes((prev) => [...prev, recipe])
    }, [])

    const updateRecipe = useCallback((id: string, updatedRecipe: Recipe) => {
        setRecipes((prev) => prev.map((r) => (r.id === id ? updatedRecipe : r)))
    }, [])

    const deleteRecipe = useCallback((id: string) => {
        setRecipes((prev) => prev.filter((r) => r.id !== id))
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