import { Link, useParams } from 'react-router-dom'
import { useRecipes } from '../context/RecipeContext'

const RecipeDetails = () => {
    const { id } = useParams()
    const { recipes } = useRecipes()
    const recipe = recipes.find((item) => item.id === id)

    if (!recipe) {
        return (
            <main className="recipe-detail-page">
                <section className="recipe-detail-empty">
                    <span aria-hidden="true">✳</span>
                    <h1>We couldn’t find that recipe.</h1>
                    <p>It may have been removed, or the link may be out of date.</p>
                    <Link to="/recipes" className="button-primary">Back to recipes <span aria-hidden="true">↗</span></Link>
                </section>
            </main>
        )
    }

    return (
        <main className="recipe-detail-page">
            <div className="recipe-detail-wrap">
                <Link className="recipe-detail-back" to="/recipes"><span aria-hidden="true">←</span> Back to all recipes</Link>
                <article className="recipe-detail-card">
                    <div className="recipe-detail-photo-wrap">
                        {recipe.image ? <img src={recipe.image} alt={recipe.title} className="recipe-detail-photo" /> : <div className="recipe-box-image-placeholder">✳</div>}
                        <span className="recipe-box-category">{recipe.category}</span>
                    </div>
                    <div className="recipe-detail-content">
                        <span className="create-kicker"><i /> FROM OUR KITCHEN</span>
                        <h1>{recipe.title}</h1>
                        <p className="recipe-detail-chef">A recipe by <strong>{recipe.chefName || 'A goodtable cook'}</strong></p>
                        <p className="recipe-detail-description">{recipe.description}</p>
                        <div className="recipe-detail-rule" />
                        <section className="recipe-detail-section">
                            <span className="recipe-detail-number">01</span>
                            <div><h2>Gather your ingredients</h2><p>{recipe.ingredients}</p></div>
                        </section>
                        <section className="recipe-detail-section">
                            <span className="recipe-detail-number">02</span>
                            <div><h2>Let’s make it</h2><p>{recipe.instructions}</p></div>
                        </section>
                        <div className="recipe-detail-endnote"><span>✳</span> Made to be shared. Enjoy every bite.</div>
                    </div>
                </article>
            </div>
        </main>
    )
}

export default RecipeDetails
