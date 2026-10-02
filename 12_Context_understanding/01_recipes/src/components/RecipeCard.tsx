import type { RecipeInterface } from '../context/RecipeContext'

interface RecipeCardProps {
    recipe: RecipeInterface
    onDelete: (id: string) => void
}

const RecipeCard = ({ recipe, onDelete }: RecipeCardProps) => (
    <article className="recipe-box-card">
        <div className="recipe-box-image-wrap">
            {typeof recipe.image === 'string' && recipe.image ? (
                <img className="recipe-box-image" src={recipe.image} alt={recipe.title} loading="lazy" />
            ) : (
                <div className="recipe-box-image-placeholder" aria-label="No recipe photo">✳</div>
            )}
            <span className="recipe-box-category">{recipe.category}</span>
        </div>
        <div className="recipe-box-content">
            <div className="recipe-box-byline">A GOODTABLE RECIPE <span>·</span> BY {recipe.chefName || 'A GOODTABLE COOK'}</div>
            <h2>{recipe.title}</h2>
            <p className="recipe-box-description">{recipe.description}</p>
            <details className="recipe-box-details">
                <summary><span>View ingredients &amp; method</span><span className="recipe-box-toggle" aria-hidden="true">＋</span></summary>
                <div className="recipe-box-full-details">
                    <section><h3>Ingredients</h3><p>{recipe.ingredients}</p></section>
                    <section><h3>Method</h3><p>{recipe.instructions}</p></section>
                </div>
            </details>
            <div className="recipe-box-footer"><span>Made with a little love <i>✳</i></span><button type="button" className="recipe-box-delete" onClick={() => onDelete(recipe.id)} aria-label={`Delete ${recipe.title}`}>Delete recipe</button></div>
        </div>
    </article>
)

export default RecipeCard
