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
      <Link
        to="/"
        className="relative z-10 inline-flex items-center gap-3 px-16 mt-4 text-white font-bold text-lg group"
      >
        {/* Mindre vit cirkel */}
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/90">
          <ChevronLeftIcon
            className="w-5 h-5 text-black"
            strokeWidth={5} // ← ca 50 % tjockare
          />
        </span>

        {/* Texten som glider */}
        <span className="transition-transform duration-200 group-hover:translate-x-2">
          Movies
        </span>
      </Link>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/30" />

      {/* Content */}
      <div className="relative min-h-screen flex items-end pb-24 px-16">
        <div className="flex items-end gap-10">
          {/*POSTER*/}
          {movie.poster_path && (
            <img
              src={`${IMG_URL}${movie.poster_path}`}
              alt={movie.title}
              // style={{ width: "200px" }}
              className="w-[350px] border-4 border-white"
              // https://tailwindcss.com/docs/width
            />
          )}

          {/* TEXT (höger) */}
          <div className="text-white max-w-xl">
            {/*TITLE */}
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-white text-3xl font-bold ">
                {movie.original_title}
              </h1>

              {/* Rating */}
              {/* toFixed(1) för att avrunda uppåt 1 decimal*/}
              <span className="inline-flex items-center gap-2 bg-white/95 text-black px-3 py-1.5 rounded-lg shadow-md">
                <span className="text-yellow-600 text-3xl">★</span>
                <span className="text-3xl font-bold">
                  {movie.vote_average.toFixed(1)}
                </span>
              </span>
            </div>

            {/* Description */}
            <p className="text-lg leading-relaxed">{movie.overview}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieInfo;
