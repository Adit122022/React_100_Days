
import { Route, Routes } from 'react-router-dom';
import Recipes from '../pages/Recipes';
import Home from '../pages/Home';
import About from '../pages/About';
import CreateRecipes from '../pages/CreateRecipes';
import RecipeDetails from '../pages/RecipeDetails';

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/create-recipes" element={<CreateRecipes />} />
        </Routes>
    )
}

export default MainRoutes
