import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export interface RecipeInterface {
    id: string;
    title: string;
    description: string;
    category: string;
    ingredients: string;
    instructions: string;
    image: FileList;
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
        setRecipes((prev) => [...prev, recipe])
        localStorage.setItem('recipes', JSON.stringify([...recipes, recipe]));
    }, [])

    const updateRecipe = useCallback((id: string, updatedRecipe: RecipeInterface) => {
        setRecipes((prev) => prev.map((r) => (r.id === id ? updatedRecipe : r)))
        localStorage.setItem('recipes', JSON.stringify(recipes.map((r) => (r.id === id ? updatedRecipe : r))));
    }, [])

    const deleteRecipe = useCallback((id: string) => {
        setRecipes((prev) => prev.filter((r) => r.id !== id))
        localStorage.setItem('recipes', JSON.stringify(recipes.filter((r) => r.id !== id)));
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