import React from 'react'
import { NavLink } from 'react-router-dom'

const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/recipes', label: 'Recipes' },
]

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <NavLink to="/" className="text-2xl font-bold tracking-tight text-gray-900">
                    Recipe<span className="text-red-500">App</span>
                </NavLink>

                <nav className="flex items-center gap-8">
                    {links.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                [
                                    // base
                                    'relative py-1 text-sm font-medium transition-colors duration-300',
                                    // underline (pseudo-element)
                                    'after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full',
                                    'after:rounded-full after:bg-red-500',
                                    'after:transition-transform after:duration-300 after:ease-out',
                                    isActive
                                        ? 'text-red-600 after:origin-left after:scale-x-100'
                                        : // enters from the left, exits to the right
                                        'text-gray-600 hover:text-gray-900 after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100',
                                ].join(' ')
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>
                <NavLink to="/create-recipes" className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-600">
                    Add Recipe
                </NavLink>
            </div>
        </header>
    )
}

export default Navbar