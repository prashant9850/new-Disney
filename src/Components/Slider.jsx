import React, { useEffect, useRef, useState } from "react";
import GlobalApi from "../Services/GlobalApi";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const MAX_VISIBLE = 5;

function Slider() {
  const [movieList, setMovieList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    getTrendingMovies();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".arrow-button") && !e.target.closest("img")) {
        setShowArrows(false);
        clearTimeout(timeoutRef.current);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const getTrendingMovies = () => {
    GlobalApi.getTrendingVideos()
      .then((resp) => {
        setMovieList(resp.data.results);
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
    const newIndex = (currentIndex - 1 + MAX_VISIBLE) % MAX_VISIBLE;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
    keepArrowsVisible(8000);
  };

  const scrollRight = () => {
    const newIndex = (currentIndex + 1) % MAX_VISIBLE;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
    keepArrowsVisible(8000);
  };

  const handleMouseEnter = () => {
    setShowArrows(true);
    keepArrowsVisible(3000);
  };

  const keepArrowsVisible = (duration) => {
    setShowArrows(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowArrows(false);
    }, duration);
  };

  return (
    <div
      className="relative mt-6 px-0 md:px-0 overflow-hidden"
      onMouseEnter={handleMouseEnter}
    >
      <div className="relative h-[300px] sm:h-[380px] md:h-[420px] lg:h-[500px]">
        {/* Fixed Arrows */}
        {currentIndex > 0 && (
          <button
            className={`arrow-button absolute top-1/2 left-[10%] -translate-y-1/2 z-20 
              ${showArrows ? "sm:flex" : "sm:hidden"} flex
              bg-black/50 hover:bg-black/70 text-white
              p-2 rounded-full backdrop-blur-sm shadow-md transition-all duration-300`}
            onClick={(e) => {
              e.stopPropagation();
              scrollLeft();
            }}
          >
            <GoArrowLeft size={24} />
          </button>
        )}

        {currentIndex < MAX_VISIBLE - 1 && (
          <button
            className={`arrow-button absolute top-1/2 right-[10%] -translate-y-1/2 z-20 
              ${showArrows ? "sm:flex" : "sm:hidden"} flex
              bg-black/50 hover:bg-black/70 text-white
              p-2 rounded-full backdrop-blur-sm shadow-md transition-all duration-300`}
            onClick={(e) => {
              e.stopPropagation();
              scrollRight();
            }}
          >
            <GoArrowRight size={24} />
          </button>
        )}

        {/* Image Slider */}
        <div
          ref={sliderRef}
          className="flex snap-x snap-mandatory w-full h-full overflow-x-hidden overflow-y-hidden scroll-smooth"
        >
          {movieList.slice(0, MAX_VISIBLE).map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full flex items-center justify-between px-2 snap-center"
            >
              <div
                className={`w-[10%] ${index === 0 ? "" : "hidden sm:block"}`}
              ></div>

              {/* Image */}
              <div className="relative w-[80%] h-full">
                <img
                  src={IMAGE_BASE_URL + item.backdrop_path}
                  alt={item.title}
                  className="w-full h-full rounded-xl object-cover border-transparent shadow-xl/30 hover:border-white border-4 transition-all duration-300"
                />

                {/* Title Inside Image */}
                {index === currentIndex && (
                  <div
                    className="absolute bottom-4 right-4 text-white text-xl md:text-3xl font-bold bg-black/40 px-4 py-2 rounded-lg shadow-lg
                    animate-[fadeInSlide_0.5s_ease-in-out]"
                  >
                    {item.title || item.name}
                  </div>
                )}
              </div>

              <div
                className={`w-[10%] ${
                  index === MAX_VISIBLE - 1 ? "" : "hidden sm:block"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
