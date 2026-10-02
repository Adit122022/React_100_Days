import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const recipes = [
    { title: 'Creamy Tuscan Pasta', category: 'Dinner', time: '25 min', rating: '4.9', image: 'photo-1473093295043-cdd812d0e601', tag: 'Reader favorite' },
    { title: 'Avocado Garden Toast', category: 'Breakfast', time: '10 min', rating: '4.8', image: 'photo-1525351484163-7529414344d8', tag: 'Quick & easy' },
    { title: 'Rainbow Nourish Bowl', category: 'Lunch', time: '20 min', rating: '5.0', image: 'photo-1512621776951-a57141f2eefd', tag: 'Fresh pick' },
]

const categories = ['All recipes', 'Breakfast', 'Lunch', 'Dinner', 'Dessert']
const photo = (id: string, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

function SearchIcon() {
    return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5"><circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" /><path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
}

const Home = () => {
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('All recipes')
    const filteredRecipes = useMemo(() => recipes.filter((recipe) => {
        const matchesSearch = recipe.title.toLowerCase().includes(query.toLowerCase()) || recipe.category.toLowerCase().includes(query.toLowerCase())
        return matchesSearch && (category === 'All recipes' || recipe.category === category)
    }), [query, category])

    return (
        <main className="recipe-home">
            <section className="home-hero">
                <div className="hero-copy">
                    <div className="eyebrow"><span className="eyebrow-line" /> GOOD FOOD, GOOD MOOD</div>
                    <h1>Make something<br /><span>delicious.</span></h1>
                    <p className="hero-description">A little inspiration for whatever’s in your fridge. Find feel-good recipes, simple ingredients, and new favorites to bring to your table.</p>
                    <div className="hero-actions">
                        <a href="#discover" className="button-primary">Explore recipes <span aria-hidden="true">↗</span></a>
                        <Link to="/create-recipes" className="button-text">Share your recipe <span aria-hidden="true">→</span></Link>
                    </div>
                    <div className="hero-note"><div className="avatar-stack"><span>🥑</span><span>🍋</span><span>🍅</span></div><span><strong>Made for real life</strong><br />Simple recipes, lovely results</span></div>
                </div>
                <div className="hero-visual">
                    <img className="hero-image" src={photo('photo-1547592180-85f173990554', 1300)} alt="A colorful, fresh salad with greens and seasonal ingredients" />
                    <div className="image-caption"><span className="caption-sparkle">✳</span><span><strong>Fresh from the kitchen</strong><small>Seasonal, simple, so good.</small></span></div>
                    <div className="hero-stamp"><span>COOK</span><span>·</span><span>SHARE</span><span>·</span><span>ENJOY</span></div>
                </div>
                <span className="hero-decoration" aria-hidden="true">✳</span>
            </section>

            <section className="ingredient-strip" aria-label="Our approach to cooking">
                <span>GOOD FOOD STARTS HERE</span><i>✳</i><span>FRESH, EVERYDAY INGREDIENTS</span><i>✳</i><span>MADE TO BE SHARED</span><i>✳</i><span>ALWAYS ROOM FOR SECONDS</span>
            </section>

            <section className="discover-section" id="discover">
                <div className="section-heading">
                    <div><div className="eyebrow"><span className="eyebrow-line" /> FIND YOUR NEXT FAVORITE</div><h2>A good place to <em>start.</em></h2><p>Easy, delicious ideas for whatever sounds good today.</p></div>
                    <Link to="/recipes" className="all-recipes-link">Browse all recipes <span aria-hidden="true">↗</span></Link>
                </div>
                <div className="recipe-tools">
                    <div className="category-tabs" role="group" aria-label="Filter recipes by category">{categories.map((item) => <button key={item} className={category === item ? 'category-tab active' : 'category-tab'} onClick={() => setCategory(item)}>{item}</button>)}</div>
                    <label className="search-field"><SearchIcon /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a recipe..." aria-label="Search recipes" /></label>
                </div>
                {filteredRecipes.length ? <div className="recipe-grid">{filteredRecipes.map((recipe) => <article className="recipe-card" key={recipe.title}><Link to="/recipes" className="recipe-image-link" aria-label={`Explore ${recipe.title}`}><img src={photo(recipe.image)} alt={recipe.title} loading="lazy" /><span className="recipe-tag">{recipe.tag}</span><span className="recipe-arrow" aria-hidden="true">↗</span></Link><div className="recipe-card-content"><div className="recipe-meta"><span>{recipe.category}</span><span>·</span><span>{recipe.time}</span><span className="recipe-rating">★ {recipe.rating}</span></div><h3>{recipe.title}</h3></div></article>)}</div> : <p className="empty-recipes">No recipes match that search yet. Try another dish or category.</p>}
            </section>

            <section className="pantry-banner"><div className="pantry-photo"><img src={photo('photo-1490645935967-10de6ba17061', 1000)} alt="Fresh vegetables and ingredients ready to cook" loading="lazy" /></div><div className="pantry-copy"><div className="eyebrow"><span className="eyebrow-line" /> A LITTLE KITCHEN INSPIRATION</div><h2>Great meals begin<br />with <em>what you have.</em></h2><p>Turn everyday ingredients into something worth gathering around. Save a favorite, try something new, and make it your own.</p><Link to="/recipes" className="button-primary">Find your next meal <span aria-hidden="true">↗</span></Link></div></section>

            <footer className="home-footer"><Link to="/" className="footer-brand">good<span>table</span><i>✳</i></Link><p>A little more joy in every bite.</p><Link to="/create-recipes">Have a recipe to share? <span>Let’s see it →</span></Link></footer>
        </main>
    )
}

export default Home
