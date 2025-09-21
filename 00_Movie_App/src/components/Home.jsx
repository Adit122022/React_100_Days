import React, { useEffect, useState } from "react";
import SideBar from "./templates/SideBar";
import TopNav from "./templates/TopNav";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";
import Loader from "./templates/Loader";
import instance from "../../src/utils/Axios";

const Home = () => {
  document.title = "StarStream | Home";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await instance.get(`/trending/all/day`);
      setWallpaper(data.results[Math.floor(Math.random() * data.results.length)]);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await instance.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  useEffect(() => {
    GetTrending();
    if (!wallpaper) GetHeaderWallpaper();
  }, [category]);

  if (!wallpaper || !trending) return <Loader />;

  return (
    <div className="flex w-screen h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Sidebar (collapsible on mobile handled inside component) */}
      {/* <SideBar /> */}

      {/* Main Content */}
      <main className="flex-1 h-full w-screen overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
        <div className="  mx-auto w-screen px-4 sm:px-6 lg:px-8">
          {/* Top Search Navigation */}
          <div className="sticky top-0 bg-zinc-950/80 backdrop-blur-md z-30 py-4">
            <TopNav />
          </div>

          {/* Hero Header Banner */}
          <section className="mt-4">
            <Header data={wallpaper} />
          </section>

          {/* Trending Section */}
          <section className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-300 tracking-wide">
                🔥 Trending
              </h1>
              <Dropdown
                title="Filter"
                options={["tv", "movie", "all"]}
                func={setCategory}
              />
            </div>

            <HorizontalCards data={trending} />
          </section>

          {/* Optional Footer */}
          <footer className="text-center text-zinc-600 text-sm py-10">
            © {new Date().getFullYear()} StarStream. All rights reserved.
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Home;
