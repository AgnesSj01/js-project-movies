import { useState, useEffect } from "react";
import MovieSlide from "./MovieSlide";
import ThumbnailSlide from "./ThumbnailSlide";

const MovieSlider = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  }

  const goToSlide = (index) => {
    setCurrentIndex(index);
  }

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying])

  if (!movies || movies.length === 0) return <div>Loading...</div>;

  return (
    <div className="flex w-full h-screen">
      <div
        className="w-4/5 h-full relative overflow-hidden group"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div
          className="flex h-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {movies.map((movie) => (
            <MovieSlide key={movie?.id} movie={movie} />
          ))}
        </div>

        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 flex items-center justify-center cursor-pointer"
        >
          ←
        </button>

        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 flex items-center justify-center cursor-pointer"
        >
          →
        </button>

      </div>

      <div className="w-1/5 h-full overflow-y-auto pl-0">
        <div className="space-y-0">
          {movies.map((movie, index) => 
            <div
              key={movie.id}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer transition-all duration-300 ${index === currentIndex ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-70'}`}
            >
              <ThumbnailSlide movie={movie} />
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default MovieSlider;