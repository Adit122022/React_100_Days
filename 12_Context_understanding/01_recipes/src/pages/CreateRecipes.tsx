import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Bounce, toast } from 'react-toastify'
import { nanoid } from 'nanoid'
import { useRecipes, type RecipeInterface } from '../context/RecipeContext'

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks', 'Drinks']
type RecipeFormData = Omit<RecipeInterface, 'image'> & { image: FileList }

const labelClass = 'mb-2 block text-[11px] font-semibold tracking-wide text-stone-700'
const fieldClass = 'w-full rounded-sm border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#718064] focus:ring-2 focus:ring-[#718064]/10'
const errorClass = 'mt-1.5 block text-xs text-rose-600'

const fileToDataUrl = async (file: File) => {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, 1400 / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Could not prepare image')
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    bitmap.close()
    return canvas.toDataURL('image/jpeg', 0.82)
}

const CreateRecipes = () => {
    const { addRecipe } = useRecipes()
    const { register, watch, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<RecipeFormData>()
    const [preview, setPreview] = useState<string | null>(null)
    const fileList = watch('image')

    useEffect(() => {
        const file = fileList?.[0]
        if (!file) {
            setPreview(null)
            return
        }
        const url = URL.createObjectURL(file)
        setPreview(url)
        return () => URL.revokeObjectURL(url)
    }, [fileList])

    const submitHandler = async (data: RecipeFormData) => {
        try {
            const image = await fileToDataUrl(data.image[0])
            const recipe: RecipeInterface = { ...data, id: nanoid(), image }
            addRecipe(recipe)
            toast.success('Recipe created successfully!', { theme: 'colored', transition: Bounce })
            reset()
        } catch {
            toast.error('We couldn’t save that image. Please try another one.', { theme: 'colored' })
        }
    }

    return (
        <main className="create-page">
            <div className="create-shell">
                <div className="create-intro">
                    <span className="create-kicker"><i /> YOUR KITCHEN, YOUR STORY</span>
                    <h1>Share a little<br /><em>something delicious.</em></h1>
                    <p>Pass a favorite around the table. Add the details and a photo, and make it easy for someone else to cook it, too.</p>
                    <div className="create-aside"><span>✳</span><p>Every great recipe has a story.<br /><strong>We can’t wait to hear yours.</strong></p></div>
                </div>

                <form onSubmit={handleSubmit(submitHandler)} className="create-form">
                    <div className="form-heading"><div><span className="create-kicker">A RECIPE TO REMEMBER</span><h2>Recipe details</h2></div><span className="required-note">* Required</span></div>

                    <div className="form-fields">
                        <div>
                            <label htmlFor="title" className={labelClass}>Recipe name <span>*</span></label>
                            <input {...register('title', { required: 'Add a name for your recipe' })} id="title" placeholder="e.g. Sunday lemon cake" className={fieldClass} />
                            {errors.title && <small className={errorClass}>{errors.title.message}</small>}
                        </div>
                        <div className="fields-two">
                            <div>
                                <label htmlFor="chefName" className={labelClass}>Chef name <span>*</span></label>
                                <input {...register('chefName', { required: 'Tell us who made this' })} id="chefName" placeholder="Your name" className={fieldClass} />
                                {errors.chefName && <small className={errorClass}>{errors.chefName.message}</small>}
                            </div>
                            <div>
                                <label htmlFor="category" className={labelClass}>Category <span>*</span></label>
                                <select {...register('category', { required: 'Choose a category' })} id="category" defaultValue="" className={`${fieldClass} ${!watch('category') ? 'text-stone-400' : ''}`}>
                                    <option value="" disabled>Choose one</option>
                                    {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                                </select>
                                {errors.category && <small className={errorClass}>{errors.category.message}</small>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="description" className={labelClass}>A little introduction <span>*</span></label>
                            <textarea {...register('description', { required: 'Add a short introduction' })} id="description" rows={3} placeholder="What makes this one special?" className={`${fieldClass} resize-y`} />
                            {errors.description && <small className={errorClass}>{errors.description.message}</small>}
                        </div>

                        <div>
                            <label htmlFor="img" className={labelClass}>Recipe photo <span>*</span></label>
                            <div className={`upload-area ${errors.image ? 'upload-error' : ''} ${preview ? 'has-preview' : ''}`}>
                                {preview ? <img src={preview} alt="Selected recipe preview" className="upload-preview" /> : <div className="upload-prompt"><span className="upload-icon">↥</span><strong>Choose a photo of your dish</strong><small>JPG, PNG or WEBP · One image</small></div>}
                                <input {...register('image', { required: 'Choose a photo for your recipe' })} type="file" id="img" accept="image/jpeg,image/png,image/webp" className="upload-input" aria-label="Choose recipe photo" />
                                {preview && <span className="change-photo">Click to change photo</span>}
                            </div>
                            {errors.image && <small className={errorClass}>{errors.image.message}</small>}
                        </div>

                        <div className="fields-two">
                            <div>
                                <label htmlFor="ingredients" className={labelClass}>Ingredients <span>*</span></label>
                                <textarea {...register('ingredients', { required: 'List the ingredients' })} id="ingredients" rows={6} placeholder={'2 cups flour\n1 lemon, zested\n…'} className={`${fieldClass} resize-y`} />
                                {errors.ingredients && <small className={errorClass}>{errors.ingredients.message}</small>}
                            </div>
                            <div>
                                <label htmlFor="instructions" className={labelClass}>Method <span>*</span></label>
                                <textarea {...register('instructions', { required: 'Add the cooking steps' })} id="instructions" rows={6} placeholder={'1. Bring everything together…\n2. Cook until golden…'} className={`${fieldClass} resize-y`} />
                                {errors.instructions && <small className={errorClass}>{errors.instructions.message}</small>}
                            </div>
                        </div>
                    </div>
                    <div className="form-submit-row"><p>Thanks for adding something good to the table.</p><button type="submit" disabled={isSubmitting} className="button-primary">{isSubmitting ? 'Saving…' : 'Share recipe'} <span aria-hidden="true">↗</span></button></div>
                </form>
            </div>
        </main>
    )
}

export default CreateRecipes
