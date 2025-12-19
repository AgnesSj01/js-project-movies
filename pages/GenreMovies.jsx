import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BackButton from "../src/components/BackButtons";
import { useLocation } from "react-router-dom";

// TMDB configuration
const API_KEY = "f4e07b8c3bee08478eb1ddafeed7e326";
const IMG_URL = "https://image.tmdb.org/t/p/w342";

// Displays movies filtered by a specific genre
const GenreMovies = () => {
  // Read genre ID from the URL
  const { genreId } = useParams();
  // State for fetched movies
  const [movies, setMovies] = useState([]);
  // State for storing the genre name
  const [genreName, setGenreName] = useState("");
  // Loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // Used to navigate back to the previous page
  const location = useLocation();
  const from = location.state?.from || "/";

  useEffect(() => {
    // Fetch genre name and movies for the selected genre
    const fetchGenreMovies = async () => {
      try {
        setLoading(true);
        setError(false);

        // Fetch all available genres to find the genre name
        const genreRes = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        const genreData = await genreRes.json();
        const found = genreData.genres?.find(
          (g) => String(g.id) === String(genreId)
        );
        setGenreName(found?.name ?? "");

        //  Fetch movies that belong to the selected genre
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&sort_by=popularity.desc`
        );

        if (!res.ok) {
          setError(true);
          return;
        }

        const data = await res.json();
        setMovies(data.results ?? []);
      } catch (e) {
        // Handle unexpected errors
        setError(true);
      } finally {
        // Stop loading once fetch is complete
        setLoading(false);
      }
    };

    fetchGenreMovies();
  }, [genreId]);

  // Loading state
  if (loading) return <p className="p-6">Loading...</p>;
  // Error state
  if (error) return <p className="p-6">Something went wrong.</p>;

  return (
    <main className="min-h-screen p-6">
      {/* Page header with back navigation and genre title */}
      <div className="px-1 sm:px-8 md:px-8 lg:px-16 pt-1 lg:mb-10">
        <div className="mb-4 sm:mb-3">
          <BackButton to={from} label="Back to movie" />
        </div>
        <h1 className=" text-white text-center text-2xl font-bold mb-6 sm:mb-4 md:mb-8">
          {genreName || genreId}
        </h1>
      </div>

      {/* Movie grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4 sm:px-8 md:px-8 lg:px-16">
        {movies.map((m) => (
          <Link key={m.id} to={`/movies/${m.id}`} className="block">
            {m.poster_path ? (
              <img
                src={`${IMG_URL}${m.poster_path}`}
                alt={m.title}
                className="w-full aspect-[2/3] object-cover rounded-lg"
                loading="lazy"
              />
            ) : (
              // Fallback when no poster is available
              <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center text-sm">
                No image
              </div>
            )}
            <p className="mt-2 text-sm font-semibold">{m.title}</p>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default GenreMovies;
