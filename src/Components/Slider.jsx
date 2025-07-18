import React, { useEffect, useRef, useState } from "react";
import GlobalApi from "../Services/GlobalApi";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const MAX_VISIBLE = 5;
const SWIPE_THRESHOLD = 50;

function Slider() {
  const [movieList, setMovieList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef(null);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Fetch movies on mount
  useEffect(() => {
    GlobalApi.getTrendingVideos()
      .then((resp) => setMovieList(resp.data.results))
      .catch((err) => console.error("Error fetching trending videos:", err));
  }, []);

  // Live scroll position tracking for dot indicators
  useEffect(() => {
    const slider = sliderRef.current;

    const handleScroll = () => {
      if (!slider) return;
      const containerWidth = slider.offsetWidth;
      const newIndex = Math.round(slider.scrollLeft / containerWidth);
      setCurrentIndex(newIndex);
    };

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToIndex = (index) => {
    if (index < 0 || index >= MAX_VISIBLE) return;

    const containerWidth = sliderRef.current.offsetWidth;
    sliderRef.current.scrollTo({
      left: index * containerWidth,
      behavior: "smooth",
    });
  };

  const handleMouseEnter = () => {
    setShowArrows(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowArrows(false);
    }, 4000);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const difference = touchStartX.current - touchEndX.current;

    if (Math.abs(difference) > SWIPE_THRESHOLD) {
      if (difference > 0) scrollToIndex(currentIndex + 1);
      else scrollToIndex(currentIndex - 1);
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.cursor = "grabbing";
    sliderRef.current.style.scrollBehavior = "auto";
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    sliderRef.current.style.cursor = "grab";
    sliderRef.current.style.scrollBehavior = "smooth";
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      sliderRef.current.style.cursor = "grab";
      sliderRef.current.style.scrollBehavior = "smooth";
    }
  };

  // Resize sync
  useEffect(() => {
    const handleResize = () => {
      scrollToIndex(currentIndex);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  return (
    <div
      className="relative mt-3 px-0 md:px-0 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => {
        clearTimeout(timeoutRef.current);
        setShowArrows(false);
      }}
    >
      <div className="relative h-[300px] sm:h-[380px] md:h-[420px] lg:h-[500px]">
        {/* Left Arrow */}
        {currentIndex > 0 && showArrows && (
          <div
            className="absolute top-1/2 left-[10%] -translate-y-1/2 z-20
              flex bg-black/50 text-white p-2 rounded-full
              backdrop-blur-sm shadow-md cursor-pointer hover:bg-black/70
              transition-colors duration-200"
            onClick={() => scrollToIndex(currentIndex - 1)}
          >
            <GoArrowLeft size={24} />
          </div>
        )}

        {/* Right Arrow */}
        {currentIndex < MAX_VISIBLE - 1 && showArrows && (
          <div
            className="absolute top-1/2 right-[10%] -translate-y-1/2 z-20
              flex bg-black/50 text-white p-2 rounded-full
              backdrop-blur-sm shadow-md cursor-pointer hover:bg-black/70
              transition-colors duration-200"
            onClick={() => scrollToIndex(currentIndex + 1)}
          >
            <GoArrowRight size={24} />
          </div>
        )}

        {/* Scrollable Slider */}
        <div
          ref={sliderRef}
          className="flex snap-x snap-mandatory w-full h-full overflow-x-auto overflow-y-hidden scroll-smooth cursor-grab scrollbar-hide"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {movieList.slice(0, MAX_VISIBLE).map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full flex items-center justify-between px-2 snap-center select-none"
            >
              <div
                className={`w-[10%] ${index === 0 ? "" : "hidden sm:block"}`}
              ></div>

              <div className="relative w-[80%] h-full transform transition-transform duration-500 hover:scale-[1.03]">
                <img
                  src={IMAGE_BASE_URL + item.backdrop_path}
                  alt={item.title || item.name}
                  className="w-full h-full rounded-xl object-cover border-transparent shadow-xl/30 hover:border-white border-4 transition-all duration-500 pointer-events-none"
                  draggable="false"
                />
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

        {/* Indicator Dots */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {movieList.slice(0, MAX_VISIBLE).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex ? "bg-white w-4" : "bg-gray-400"
              }`}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
