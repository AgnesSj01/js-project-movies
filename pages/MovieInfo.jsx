import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "../pages/NotFound";
import BackButton from "../src/components/BackButtons";
import RatingBadge from "../src/components/RatingBadge";
import TagSection from "../src/components/TagSection";

// TMDB configuration
const API_KEY = "f4e07b8c3bee08478eb1ddafeed7e326";
const IMG_URL = "https://image.tmdb.org/t/p/w342";

// Movie details page (dynamic route: /movies/:id)
const MovieInfo = () => {
  // Read movie ID from the URL
  const { id } = useParams();
  // Movie data (null is used as the loading state)
  const [movie, setMovie] = useState(null);
  // Boolean error flag (used to show NotFound)
  const [error, setError] = useState(false);
  // Used to pass the current path into links (so we can navigate back)
  const location = useLocation();
  const from = location.state?.from || "/";

  // Build a responsive backdrop image URL depending on screen width
  const getBackdropSrc = (path) => {
    if (!path) return "";
    const size = window.innerWidth < 768 ? "w780" : "w1280";
    return `https://image.tmdb.org/t/p/${size}${path}`;
  };

  useEffect(() => {
    // Fetch movie details from TMDB using the movie ID
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
        // Handle unexpected errors
        setError(true);
      }
    };

    fetchMovie();
  }, [id]);
  // Error state: show 404 page if movie can't be fetched
  if (error) {
    return <NotFound />;
  }
  // Loading state: show placeholder while movie is null
  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Backdrop image (full screen background) */}
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

      {/* Dark gradient overlay to make text readable on top of the image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top navigation */}
        <div className="px-4 md:px-6 mt-6 sm:mt-8 md:mt-6 mb-6 md:mb-10">
          <BackButton to={from} label="Movies" />
        </div>

        {/* Main content layout */}
        <div className="flex-1 flex justify-center lg:justify-start items-start lg:items-end pb-12 md:pb-16 px-4 sm:px-8 md:px-8 lg:px-16">
          <div className="flex flex-col items-center lg:flex-row lg:items-end gap-6 lg:gap-10">
            {/*Poster*/}
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

            {/* Text Content */}
            <div className="text-white max-w-sm md:max-w-lg lg:max-w-xl min-h-[120px] lg:min-h-[200px] text-center lg:text-left mx-auto lg:mx-0">
              <div className="min-h-[56px] md:min-h-[72px] mb-1">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  {/* Movie title */}
                  <h1 className="text-white text-xl md:text-3xl font-bold leading-tight max-w-[18ch]">
                    {movie.original_title}
                  </h1>

                  {/* Rating component */}
                  <RatingBadge rating={movie.vote_average} />
                </div>
              </div>

              {/* Movie description */}
              <p className="text-sm md:text-lg leading-relaxed min-h-[80px] max-w-none">
                {movie.overview}
              </p>

              {/*Links to GenreMovies page */}
              <TagSection title="Genre">
                {movie.genres.map((g) => (
                  <Link
                    key={g.id}
                    to={`/genres/${g.id}`}
                    state={{ from: location.pathname }}
                    className="px-3 py-1.5 rounded-full bg-white/80 text-black text-xs font-medium hover:bg-white"
                  >
                    {g.name}
                  </Link>
                ))}
              </TagSection>

              {/* Links to CompanyMovies page */}
              <TagSection title="Production companies">
                {movie.production_companies.map((c) => (
                  <Link
                    key={c.id}
                    to={`/companies/${c.id}`}
                    state={{ from: location.pathname }}
                    className="inline-flex items-center gap-2
                 px-3 py-1.5
                 rounded-full
                 bg-white/80 text-black
                 text-xs font-medium
                 hover:bg-white"
                    title={c.name}
                  >
                    {/* Optional company logo */}
                    {c.logo_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${c.logo_path}`}
                        alt={c.name}
                        className="h-4 object-contain"
                        loading="lazy"
                      />
                    )}
                    <span className="whitespace-nowrap">{c.name}</span>
                  </Link>
                ))}
              </TagSection>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default MovieInfo;
