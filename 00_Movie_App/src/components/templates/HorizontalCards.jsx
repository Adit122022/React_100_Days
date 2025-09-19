import React from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import noimage from '../../assets/noimage.jpg'
import { LazyLoadImage } from "react-lazy-load-image-component";

const HorizontalCards = ({ data  ,setCategory}) => {
  // console.log(data); // Optional: Log data to the console for debugging

  return (

     <div className="w-full flex h-[55vh] overflow-x-auto overflow-y-hidden hide-scrollbar">
  {data.map((d, i) => (
    <Link
      to={`/${d.media_type}/details/${d.id}`}
      key={i}
      className="min-w-[20%] h-[95%] mr-3 bg-zinc-900 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
    >
      <LazyLoadImage
        className="w-full h-[55%] object-cover rounded-t-lg"
        src={`https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path}` || noimage}
        alt={d.title || d.original_name || d.original_title || "No title"}
        // effect="blur"
      />
      <div className="p-3 flex flex-col justify-between h-[45%]">
        <h1 className="text-lg font-semibold text-white text-center line-clamp-2 hover:text-blue-400 transition-colors duration-200">
          {d.title || d.original_name || d.original_title || "Untitled"}
        </h1>
        <p className="mt-2 text-zinc-300 text-sm font-light text-center line-clamp-3">
          {d.overview?.slice(0, 80) || "No description available."}...
          <span className="text-blue-400 font-medium cursor-pointer"> more</span>
        </p>
      </div>
    </Link>
  ))}
</div>

  );
};

export default HorizontalCards;
