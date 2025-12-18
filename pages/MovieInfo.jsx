import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const API_KEY = "f4e07b8c3bee08478eb1ddafeed7e326";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";

const MovieInfo = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      const result = await response.json();
      setMovie(result);
    };
    fetchMovie();
  }, [id]);
  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    //https://tailwindcss.com/docs/min-height
    <main
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: movie.backdrop_path
          ? `url(${BACKDROP_URL}${movie.backdrop_path})`
          : "none",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <Link
          to="/"
          className="inline-flex items-center gap-3
             px-4 md:px-6
             mt-6 sm:mt-8 md:mt-6
             mb-6 md:mb-10
             text-white font-bold text-lg md:text-xl
             group"
        >
          {/* Mindre vit cirkel */}
          <span
            className="flex items-center justify-center
                 w-7 h-7 md:w-9 md:h-9
                 rounded-full bg-white/90"
          >
            <ChevronLeftIcon
              className="w-5 h-5 md:w-6 md:h-6 text-black"
              strokeWidth={5}
            />
          </span>

          {/* Texten som glider */}
          <span className="transition-transform duration-200 group-hover:translate-x-2">
            Movies
          </span>
        </Link>

        {/* Content */}
        <div className="flex-1 flex items-start md:items-center lg:items-end pb-12 md:pb-16 px-4 sm:px-8 md:px-16">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10">
            {/*POSTER*/}
            {movie.poster_path && (
              <img
                src={`${IMG_URL}${movie.poster_path}`}
                alt={movie.title}
                // style={{ width: "200px" }}
                className="w-full max-w-[260px] md:max-w-[350px] border-4 border-white"
                // https://tailwindcss.com/docs/width
              />
            )}

            {/* TEXT (höger) */}
            <div className="text-white max-w-xl">
              {/*TITLE */}
              <div className="flex items-center justify-between md:justify-start gap-4 mb-3">
                <h1 className="text-white text-xl md:text-3xl font-bold">
                  {movie.original_title}
                </h1>

                {/* Rating */}
                {/* toFixed(1) för att avrunda uppåt 1 decimal*/}
                <span className="inline-flex items-center gap-1.5 bg-white/95 text-black px-2 py-1 rounded-lg shadow-md">
                  <span className="text-yellow-600 text-xl md:text-3xl">★</span>
                  <span className="text-xl md:text-3xl font-bold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </span>
              </div>

              {/* Description */}
              <p className="text-sm md:text-lg leading-relaxed">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieInfo;
