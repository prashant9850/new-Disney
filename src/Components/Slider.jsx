import React, { useEffect, useRef, useState } from "react";
import GlobalApi from "../Services/GlobalApi";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const MAX_VISIBLE = 5;

function Slider() {
  const [movieList, setMovieList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = () => {
    GlobalApi.getTrendingVideos()
      .then((resp) => {
        console.log("All trending results (20):", resp.data.results);
        setMovieList(resp.data.results); // Store full list
      })
      .catch((err) => {
        console.error("Error fetching trending videos:", err);
      });
  };

  const scrollToIndex = (index) => {
    const containerWidth = sliderRef.current.offsetWidth;
    sliderRef.current.scrollTo({
      left: index * containerWidth,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    const visibleCount = Math.min(movieList.length, MAX_VISIBLE);
    const newIndex = (currentIndex - 1 + visibleCount) % visibleCount;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const visibleCount = Math.min(movieList.length, MAX_VISIBLE);
    const newIndex = (currentIndex + 1) % visibleCount;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  return (
    <div className="relative mt-6 px-4 md:px-10 overflow-hidden">
      <div className="relative h-[300px] sm:h-[380px] md:h-[420px] lg:h-[500px]">
        {/* Left Arrow */}
        <button
          className="absolute top-1/2 left-2 md:left-6 -translate-y-1/2 z-10
                     bg-black/40 hover:bg-black/60 text-white
                     p-3 rounded-full backdrop-blur-sm shadow-md transition-all duration-300"
          onClick={scrollLeft}
        >
          <GoArrowLeft size={28} />
        </button>

        {/* Right Arrow */}
        <button
          className="absolute top-1/2 right-2 md:right-6 -translate-y-1/2 z-10
                     bg-black/40 hover:bg-black/60 text-white
                     p-3 rounded-full backdrop-blur-sm shadow-md transition-all duration-300"
          onClick={scrollRight}
        >
          <GoArrowRight size={28} />
        </button>

        {/* Image Slider */}
        <div
          ref={sliderRef}
          className="flex snap-x snap-mandatory space-x-4 w-full h-full
                     overflow-x-hidden overflow-y-hidden scroll-smooth"
        >
          {movieList.slice(0, MAX_VISIBLE).map((item, index) => (
            <img
              key={index}
              src={IMAGE_BASE_URL + item.backdrop_path}
              alt={item.title}
              className="min-w-full snap-center rounded-xl shadow-lg
                         hover:border border-white transition-transform duration-300
                         object-cover h-full"
            />
          ))}
        </div>
      </div>

      {/* Movie Title with Slide-Fade Animation */}
      <div className="mt-4 mb-10 flex justify-center items-center text-center">
        <div
          key={currentIndex} // key ensures re-render
          className="text-xl md:text-2xl font-semibold text-white transition-all duration-500 ease-in-out transform opacity-0 animate-fadeInSlide"
        >
          {movieList[currentIndex]?.title ||
            movieList[currentIndex]?.name ||
            "Loading..."}
        </div>
      </div>
    </div>
  );
}

export default Slider;
