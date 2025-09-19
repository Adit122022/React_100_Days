// src/components/templates/MoviedetailsSkeleton.jsx
import React from "react";

const ShimmerBlock = ({ height = "h-6", width = "w-full", className = "" }) => (
  <div
    className={`bg-gray-700 animate-pulse rounded ${height} ${width} ${className}`}
  ></div>
);

const MoviedetailsSkeleton = () => {
  return (
    <div className="w-full min-h-[160vh] bg-[#1F1E24] px-[5%] relative overflow-hidden"> {/* Add overflow-hidden for shimmer */}
      {/* Navigation bar Skeleton */}
      <nav className="flex items-center py-5 text-zinc-300 text-2xl">
        <ShimmerBlock height="h-8" width="w-8" className="mr-2" />
        <ShimmerBlock height="h-8" width="w-8" className="mr-2" />
        <ShimmerBlock height="h-8" width="w-8" className="mr-2" />
        <ShimmerBlock height="h-8" width="w-20" />
      </nav>

      {/* Poster and details Skeleton */}
      <div className="w-full flex flex-col md:flex-row">
        {/* Poster Skeleton */}
        <ShimmerBlock
          height="h-[50vh] md:h-[55vh]"
          width="w-full md:w-auto md:max-w-[250px]"
          className="mb-5 md:mb-0"
        />

        {/* Details Skeleton */}
        <div className="w-full md:w-[70%] md:ml-10">
          {/* Title Skeleton */}
          <ShimmerBlock height="h-10 sm:h-12 md:h-14" width="w-3/4" className="mb-3 md:ml-3" />
          <ShimmerBlock height="h-6 sm:h-7" width="w-1/4" className="mb-4 md:ml-3" /> {/* Year */}


          {/* Meta Info Skeleton (Rating, Release, Genres, Runtime) */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 p-1 mt-2 mb-4 md:ml-3">
            <ShimmerBlock height="h-[5vh] sm:h-[6vh]" width="w-[5vh] sm:w-[6vh]" className="rounded-full" /> {/* Rating Circle */}
            <ShimmerBlock height="h-6" width="w-20" /> {/* Rating Text */}
            <ShimmerBlock height="h-6" width="w-28" /> {/* Release Date */}
            <ShimmerBlock height="h-6" width="w-36" /> {/* Genres */}
            <ShimmerBlock height="h-6" width="w-24" /> {/* Runtime */}
          </div>

          {/* Tagline Skeleton */}
          <ShimmerBlock height="h-6 sm:h-7" width="w-2/3" className="my-4 md:ml-2" />

          {/* Overview Title Skeleton */}
          <ShimmerBlock height="h-7 sm:h-8" width="w-1/3" className="mt-4 mb-2 md:ml-2" />
          {/* Overview Text Skeleton */}
          <ShimmerBlock height="h-4" width="w-full" className="mb-1 md:ml-2" />
          <ShimmerBlock height="h-4" width="w-full" className="mb-1 md:ml-2" />
          <ShimmerBlock height="h-4" width="w-5/6" className="mb-4 md:ml-2" />


          {/* Translations Title Skeleton */}
          <ShimmerBlock height="h-7 sm:h-8" width="w-1/4" className="mt-6 mb-2 md:ml-2" />
          {/* Translations Text Skeleton */}
          <ShimmerBlock height="h-4" width="w-full" className="mb-1 md:ml-2" />
          <ShimmerBlock height="h-4" width="w-3/4" className="mb-5 md:ml-2" />


          {/* Play Trailer Button Skeleton */}
          <ShimmerBlock height="h-10" width="w-36" className="mt-6 md:ml-2" />
        </div>
      </div>

      {/* Available on platforms Skeleton */}
      <div className="w-full md:w-[90%] flex flex-col gap-y-6 mt-10">
        {[1, 2, 3].map((_, index) => ( // Simulate 3 platform sections
          <div key={index}>
            <ShimmerBlock height="h-6" width="w-1/3" className="mb-2" />
            <div className="flex flex-wrap items-center gap-x-2">
              {[1, 2, 3, 4].map((_, logoIndex) => ( // Simulate 4 logos per section
                <ShimmerBlock key={logoIndex} height="h-7" width="w-7" className="m-1 rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <hr className="mt-12 mb-5 border-gray-700" />

      {/* Recommendations and similar stuff Skeleton */}
      <div className="mt-5">
        <ShimmerBlock height="h-8" width="w-1/2" className="mb-4" />
        <div className="flex space-x-4 overflow-hidden"> {/* For HorizontalCards */}
          {[1, 2, 3, 4, 5].map((_, index) => ( // Simulate 5 recommendation cards
            <div key={index} className="flex-shrink-0">
              <ShimmerBlock height="h-60" width="w-40" className="mb-2" />
              <ShimmerBlock height="h-4" width="w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviedetailsSkeleton;