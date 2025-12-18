import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import NotFound from "../pages/NotFound";

const API_KEY = "f4e07b8c3bee08478eb1ddafeed7e326";
const IMG_URL = "https://image.tmdb.org/t/p/w342";

const MovieInfo = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);

  const getBackdropSrc = (path) => {
    if (!path) return "";
    const size = window.innerWidth < 768 ? "w780" : "w1280";
    return `https://image.tmdb.org/t/p/${size}${path}`;
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setError(false);
        setMovie(null);

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );

        if (!response.ok) {
          setError(true);
          return;
        }

        const result = await response.json();
        setMovie(result);
      } catch {
        setError(true);
      }
    };

    fetchMovie();
  }, [id]);
  if (error) {
    return <NotFound />;
  }
  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    //https://tailwindcss.com/docs/min-height
    <main className="min-h-screen relative overflow-hidden">
      {/* Backdrop as IMG (snabbare LCP än CSS background) */}
      {movie.backdrop_path && (
        <img
          src={getBackdropSrc(movie.backdrop_path)}
          alt=""
          width="1280"
          height="720"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      )}

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
        <div className="flex-1 flex justify-center lg:justify-start items-start lg:items-end pb-12 md:pb-16 px-4 sm:px-8 md:px-8 lg:px-16">
          <div className="flex flex-col items-center lg:flex-row lg:items-end gap-6 lg:gap-10">
            {/*POSTER*/}
            {movie.poster_path && (
              <div className="w-full max-w-[260px] md:w-[350px] md:max-w-none">
                <img
                  src={`${IMG_URL}${movie.poster_path}`}
                  alt={movie.title}
                  width="350"
                  height="525"
                  loading="eager"
                  fetchPriority="high"
                  className="w-full aspect-[2/3] object-cover border-4 border-white"
                />
              </div>
            )}
            {/* TEXT (höger) */}
            <div className="text-white max-w-sm md:max-w-lg lg:max-w-xl min-h-[120px] lg:min-h-[200px] text-center lg:text-left mx-auto lg:mx-0">
              <div className="min-h-[56px] md:min-h-[72px] mb-1">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <h1 className="text-white text-xl md:text-3xl font-bold leading-tight max-w-[18ch]">
                    {movie.original_title}
                  </h1>

                  <span className="inline-flex items-center gap-1.5 bg-white/95 text-black px-2 py-1 rounded-lg shadow-md">
                    <span className="text-yellow-600 text-xl md:text-3xl">
                      ★
                    </span>
                    <span className="text-xl md:text-3xl font-bold">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm md:text-lg leading-relaxed min-h-[80px] max-w-none">
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
