import React, { createContext } from 'react'


export interface RecipeContextType {
  recipes: any[];
  addRecipe: (recipe: any) => void;
  updateRecipe: (id: string, updatedRecipe: any) => void;
  deleteRecipe: (id: string) => void;
}

export const CreateRecipeContext = createContext<RecipeContextType | undefined>(undefined);


const RecipeContext = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = React.useState<RecipeContextType>({
        recipes: [],
        addRecipe: (recipe: any) => {
            setData((prev) => ({
                ...prev,
                recipes: [...prev.recipes, recipe]
            }));
        },
        updateRecipe: (id: string, updatedRecipe: any) => {
            setData((prev) => ({
                ...prev,
                recipes: prev.recipes.map((r) => r.id === id ? updatedRecipe : r)
            }));
        },
        deleteRecipe: (id: string) => {
            setData((prev) => ({
                ...prev,
                recipes: prev.recipes.filter((r) => r.id !== id)
            }));
        }
    });

    return (
        <CreateRecipeContext.Provider value={data}>
            {children}
        </CreateRecipeContext.Provider>
    )
}

export default RecipeContext
