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
    setCurrentIndex(index);
    // 👇 Do NOT reset arrow timeout here — keep arrows visible only by hover
  };

  const handleMouseEnter = () => {
    setShowArrows(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowArrows(false);
    }, 4000); // Show for 4 seconds only
  };

  return (
    <div
      className="relative mt-3 px-0 md:px-0 overflow-hidden"
      onMouseEnter={handleMouseEnter}
    >
      <div className="relative h-[300px] sm:h-[380px] md:h-[420px] lg:h-[500px]">
        {/* Left Arrow - only show if not first */}
        {currentIndex > 0 && showArrows && (
          <div
            className="absolute top-1/2 left-[10%] -translate-y-1/2 z-20
              flex bg-black/50 text-white p-2 rounded-full
              backdrop-blur-sm shadow-md cursor-pointer"
            onClick={() => scrollToIndex(currentIndex - 1)}
          >
            <GoArrowLeft size={24} />
          </div>
        )}

        {/* Right Arrow - only show if not last */}
        {currentIndex < MAX_VISIBLE - 1 && showArrows && (
          <div
            className="absolute top-1/2 right-[10%] -translate-y-1/2 z-20
              flex bg-black/50 text-white p-2 rounded-full
              backdrop-blur-sm shadow-md cursor-pointer"
            onClick={() => scrollToIndex(currentIndex + 1)}
          >
            <GoArrowRight size={24} />
          </div>
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

              {/* Image Container */}
              <div className="relative w-[80%] h-full transform transition-transform duration-300 hover:scale-[1.03]">
                <img
                  src={IMAGE_BASE_URL + item.backdrop_path}
                  alt={item.title}
                  className="w-full h-full rounded-xl object-cover border-transparent shadow-xl/30 hover:border-white border-4 transition-all duration-300"
                />
                {/* Title */}
                {index === currentIndex && (
                  <div className="absolute bottom-4 right-4 text-white text-xl md:text-3xl font-bold bg-black/40 px-4 py-2 rounded-lg shadow-lg">
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
