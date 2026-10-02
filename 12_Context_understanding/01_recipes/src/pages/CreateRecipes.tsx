import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

interface RecipeFormData {
    title: string;
    description: string;
    ingredients: string;
    image: FileList;
    instructions: string;
}
const CreateRecipes = () => {
    const { register, watch, handleSubmit, formState: { errors }, } = useForm<RecipeFormData>();
    const [preview, setPreview] = useState<string | null>(null)
    const fileList = watch('image');
    useEffect(() => {
        const file = fileList && fileList[0];
        if (!file) {
            setPreview(null);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [fileList]);

    return (
        <div className="min-h-screen bg-gray-200 p-4">
            <form className="max-w-screen mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Create Recipe</h2>

                {/*  Title and Description */}
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Title */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
                        <input {...register("title")}
                            type="text" id="title"
                            placeholder="Enter recipe title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" />
                        {errors.title && <small className="text-red-500 text-sm">{errors.title.message as string}</small>}
                    </div>
                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea {...register("description")}
                            id="description"
                            placeholder="Enter recipe description"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" />
                        {errors.description && <small className="text-red-500 text-sm">{errors.description.message as string}</small>}
                    </div>
                </div>
                {/*  Ingredients and Instructions */}
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Ingredients */}
                    <div className="mb-4">
                        <label htmlFor="ingredients" className="block text-gray-700 font-medium mb-2">Ingredients</label>
                        <textarea {...register("ingredients")}
                            id="ingredients"
                            placeholder="Enter recipe ingredients"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" />
                        {errors.ingredients && <small className="text-red-500 text-sm">{errors.ingredients.message as string}</small>}
                    </div>
                    {/* Instructions */}
                    <div className="mb-4">
                        <label htmlFor="instructions" className="block text-gray-700 font-medium mb-2">Instructions</label>
                        <textarea {...register("instructions")}
                            id="instructions"
                            placeholder="Enter recipe instructions"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" />
                        {errors.instructions && <small className="text-red-500 text-sm">{errors.instructions.message as string}</small>}
                    </div>
                </div>

                {/*  Recipe Image */}
                <div className="mt-4">
                    <label htmlFor="img" className="mb-2 block text-sm font-medium text-gray-700">
                        Image
                    </label>

                    <div
                        className={`group relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-colors ${errors.image
                            ? 'border-red-400 bg-red-50'
                            : 'border-gray-300 bg-gray-50 hover:border-red-400 hover:bg-red-50/50'
                            }`}
                    >
                        {preview ? (
                            <>
                                <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                                    Click or drop to change
                                </div>
                            </>
                        ) : (
                            <div className="pointer-events-none flex flex-col items-center gap-2 text-center">
                                <svg className="h-10 w-10 text-gray-400 transition-colors group-hover:text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium text-red-500">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-400">PNG, JPG or WEBP</p>
                            </div>
                        )}

                        {/* invisible input covers the whole zone, so click and drag-drop both work */}
                        <input
                            {...register('image', { required: 'Image is required' })}
                            type="file"
                            id="img"
                            accept="image/*"
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        />
                    </div>

                    {errors.image && (
                        <p className="mt-1.5 text-sm text-red-500">{errors.image.message as string}</p>
                    )}
                </div>

                <button type="submit" className="mt-4 w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-600">
                    Create Recipe
                </button>
            </form>
        </div>
    )
}

export default CreateRecipes
