import { useRef, useState, useEffect } from "react";
import MovieSlide from "./MovieSlide";
import ThumbnailSlide from "./ThumbnailSlide";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const MovieSlider = ({ movies }) => {
  // State: slider position + UX
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  // Progress bar value (0–100) synced with autoplay timer
  const [progress, setProgress] = useState(0);

  // Refs: thumbnail scrolling
  const thumbnailContainerRef = useRef(null);
  const thumbnailRefs = useRef([]);

  // Go to next slide (wrap around to start)
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Go to previous slide (wrap around to end)
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  // Jump directly to a specific slide by index
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Autoplay: advance slide on a timer
  // Pauses when user hovers the main slider
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  // Keep the active thumbnail in view
  // Scrolls horizontally/vertically depending on layout
  useEffect(() => {
    const activeThumbnail = thumbnailRefs.current[currentIndex];

    if (activeThumbnail) {
      activeThumbnail.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  // Progress bar: increments smoothly while autoplay is on
  // Resets when autoplay stops or when slide changes
  useEffect(() => {
    if (!isAutoPlaying) {
      setProgress(0);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(progressInterval);
  }, [isAutoPlaying, currentIndex]);

  // Guard: avoid rendering slider until movies exist
  if (!movies || movies.length === 0) return <div>Loading...</div>;

  return (
    <>
      {/* Top progress bar (shows time until next autoplay slide) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/20 z-50">
        <div
          className="h-full bg-white ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex flex-col lg:flex-row w-full h-[calc(100dvh-140px)] flex-shrink-0 lg:h-screen">
        {/* Main slider area */}
        <div
          className="w-full h-full relative overflow-hidden group flex-shrink-0 lg:flex-shrink-1"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Slides wrapper: translateX creates the carousel effect */}
          <div
            className="flex h-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {movies.map((movie) => (
              <MovieSlide key={movie?.id} movie={movie} />
            ))}
          </div>

          {/* Navigation controls */}
          <button
            onClick={prevSlide}
            aria-label="Previous movie"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 flex items-center justify-center cursor-pointer"
          >
            <ChevronLeftIcon
              className="w-5 h-5 md:w-6 md:h-6 text-black"
              strokeWidth={5}
            />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next movie"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 flex items-center justify-center cursor-pointer"
          >
            <ChevronRightIcon
              className="w-5 h-5 md:w-6 md:h-6 text-black"
              strokeWidth={5}
            />
          </button>
        </div>

        {/* Thumbnail rail (click to jump to a movie) */}
        <div
          ref={thumbnailContainerRef}
          className="h-screen overflow-y-auto overscroll-contain flex-shrink-0"
        >
          <div className="space-y-0 flex lg:block overflow-hidden overflow-x-scroll">
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                onClick={() => goToSlide(index)}
                ref={(el) => (thumbnailRefs.current[index] = el)}
                className={`cursor-pointer transition-all duration-300 ${
                  index === currentIndex
                    ? "opacity-100 scale-105"
                    : "opacity-40 hover:opacity-70"
                }`}
              >
                <ThumbnailSlide movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieSlider;
