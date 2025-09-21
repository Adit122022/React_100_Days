

import  { Suspense, lazy, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";


// Enhanced Splash Screen with Cinematic Animation
const ElegantGlowLoader = () => (
  <div className="w-full h-screen flex flex-col justify-center items-center bg-[#1F1E24] relative overflow-hidden">
    {/* Subtle Gradient Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#1F1E24] via-[#2a2833] to-[#1F1E24] opacity-80"></div>
    {/* Animated Logo/Icon */}
    <div className="relative z-10 flex flex-col items-center">
      <i className="ri-tv-fill text-6xl sm:text-7xl md:text-8xl text-[#6556CD] animate-pulse-glow mb-4"></i>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wider animate-fade-rise">
        StarStream
      </h1>
      <p className="text-zinc-400 text-sm sm:text-base mt-3 animate-fade-in animation-delay-300">
        Your gateway to movies, shows, and stars
      </p>
    </div>
    {/* Loading Bar */}
    <div className="absolute bottom-10 w-64 h-1 bg-zinc-700 rounded-full overflow-hidden">
      <div className="h-full bg-[#6556CD] animate-loading-bar"></div>
    </div>
  </div>
);

// Route Transition Loader with Subtle Animation
const RouteTransitionLoader = () => (
  <div className="w-full h-screen flex justify-center items-center bg-[#1F1E24]">
    <div className="flex items-center gap-3">
      <i className="ri-loader-4-line text-3xl text-[#6556CD] animate-spin"></i>
      <span className="text-zinc-200 text-lg font-medium">Loading...</span>
    </div>
  </div>
);

// Lazy load route components
const SideBar = lazy(() => import("./components/templates/SideBar"));
const Home = lazy(() => import("./components/Home"));
const Trending = lazy(() => import("./components/Trending"));
const Popular = lazy(() => import("./components/Popular"));
const Movie = lazy(() => import("./components/Movie"));
const TvShows = lazy(() => import("./components/TvShows"));
const People = lazy(() => import("./components/People"));
const Moviedetails = lazy(() => import("./components/Moviedetails"));
const TvShowsDetails = lazy(() => import("./components/TvShowsDetails"));
const PersonDetails = lazy(() => import("./components/PersonDetails"));
const Trailer = lazy(() => import("./components/templates/Trailer"));
const Notfound = lazy(() => import("./components/Notfound"));

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Show splash for 2 seconds to allow animations to complete
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <ElegantGlowLoader />;
  }

  return (
    <div className="w-screen h-screen bg-[#1F1E24] md:flex">
      <SideBar />
      <Suspense fallback={<RouteTransitionLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/movie/details/:id" element={<Moviedetails />}>
            <Route path="trailer" element={<Trailer />} />
          </Route>
          <Route path="/tvshows" element={<TvShows />} />
          <Route path="/tv/details/:id" element={<TvShowsDetails />}>
            <Route path="trailer" element={<Trailer />} />
          </Route>
          <Route path="/people" element={<People />} />
          <Route path="/person/details/:id" element={<PersonDetails />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;