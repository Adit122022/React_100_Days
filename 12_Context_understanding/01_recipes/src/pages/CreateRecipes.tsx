import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Bounce, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { useRecipes, type RecipeInterface, } from '../context/RecipeContext';




const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks', 'Drinks']

const labelClass = 'mb-1.5 block text-sm font-semibold text-gray-700'
const fieldClass =
    'w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 ' +
    'transition focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/15'
const errorClass = 'mt-1.5 block text-xs font-medium text-red-500'

const CreateRecipes = () => {
    const { addRecipe } = useRecipes()

    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm<RecipeInterface>();
    const [preview, setPreview] = useState<string | null>(null)
    const fileList = watch('image');

    useEffect(() => {
        const file = fileList && fileList[0];
        if (!file) {
            setPreview(null);
            return;
        }
        console.log("File selected:", file);
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [fileList]);


    const SubmitHandler = (data: RecipeInterface) => {
        data.id = nanoid();
        console.log("Image Preview:", preview);
        console.log("Submitted Data:", data);
        addRecipe({ ...data, image: preview ? new DataTransfer().files : new DataTransfer().files });

        toast.success('Recipe Created Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
        reset();
    }
    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <form onSubmit={handleSubmit(SubmitHandler)}
                className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-xl shadow-gray-200/60 ring-1 ring-gray-200 sm:p-10">
                <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900">
                    Create <span className="text-red-500">Recipe</span>
                </h2>

                {/* Title, Category, Description + Image */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex flex-col gap-5">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className={labelClass}>Title</label>
                            <input {...register('title')}
                                type="text" id="title"
                                placeholder="Enter recipe title"
                                className={fieldClass} />
                            {errors.title && <small className={errorClass}>{errors.title.message as string}</small>}
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category" className={labelClass}>Category</label>
                            <div className="relative">
                                <select {...register('category')}
                                    id="category"
                                    defaultValue=""
                                    className={`${fieldClass} cursor-pointer appearance-none pr-10`}>
                                    <option value="" disabled>Select a category</option>
                                    {categories.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                <svg className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            {errors.category && <small className={errorClass}>{errors.category.message as string}</small>}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className={labelClass}>Description</label>
                            <textarea {...register('description')}
                                id="description"
                                rows={4}
                                placeholder="Enter recipe description"
                                className={`${fieldClass} resize-none`} />
                            {errors.description && <small className={errorClass}>{errors.description.message as string}</small>}
                        </div>
                    </div>

                    {/* Recipe Image */}
                    <div className="flex flex-col">
                        <label htmlFor="img" className={labelClass}>Image</label>

                        <div
                            className={`group relative flex min-h-64 flex-1 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-colors ${errors.image
                                ? 'border-red-400 bg-red-50'
                                : 'border-gray-300 bg-gray-50 hover:border-red-400 hover:bg-red-50/50'
                                }`}
                        >
                            {preview ? (
                                <>
                                    <img src={preview} alt="Preview" className="absolute inset-0 h-full w-full object-cover" />
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
                                        <span className="font-semibold text-red-500">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-400">PNG, JPG or WEBP</p>
                                </div>
                            )}

                            <input
                                {...register('image', { required: 'Image is required' })}
                                type="file"
                                id="img"
                                accept="image/*"
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                            />
                        </div>

                        {errors.image && <small className={errorClass}>{errors.image.message as string}</small>}
                    </div>
                </div>

                {/* Ingredients and Instructions */}
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="ingredients" className={labelClass}>Ingredients</label>
                        <textarea {...register('ingredients')}
                            id="ingredients"
                            rows={6}
                            placeholder="Enter recipe ingredients"
                            className={`${fieldClass} resize-none`} />
                        {errors.ingredients && <small className={errorClass}>{errors.ingredients.message as string}</small>}
                    </div>

                    <div>
                        <label htmlFor="instructions" className={labelClass}>Instructions</label>
                        <textarea {...register('instructions')}
                            id="instructions"
                            rows={6}
                            placeholder="Enter recipe instructions"
                            className={`${fieldClass} resize-none`} />
                        {errors.instructions && <small className={errorClass}>{errors.instructions.message as string}</small>}
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-8 w-full rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-red-500/40 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-red-500/30"
                >
                    Create Recipe
                </button>
            </form>
        </div>
    )
}

export default CreateRecipes