import { NavLink } from 'react-router-dom'

const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/recipes', label: 'Recipes' },
]

const Navbar = () => {
    return (
        <header className="site-header">
            <div className="site-nav">
                <NavLink to="/" className="site-brand">
                    good<span>table</span><i>✳</i>
                </NavLink>

                <nav className="site-links" aria-label="Main navigation">
                    {links.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) => isActive ? 'site-link active' : 'site-link'}
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>
                <NavLink to="/create-recipes" className="nav-cta">
                    <span aria-hidden="true">+</span> Share a recipe
                </NavLink>
            </div>
        </header>
    )
}

export default Navbar
