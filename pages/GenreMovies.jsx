import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BackButton from "../src/components/BackButtons";
import { useLocation } from "react-router-dom";

const API_KEY = "f4e07b8c3bee08478eb1ddafeed7e326";
const IMG_URL = "https://image.tmdb.org/t/p/w342";

const GenreMovies = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const location = useLocation();
  const from = location.state?.from || "/";

  useEffect(() => {
    const fetchGenreMovies = async () => {
      try {
        setLoading(true);
        setError(false);

        // 1) Hämta genre-namn
        const genreRes = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        const genreData = await genreRes.json();
        const found = genreData.genres?.find(
          (g) => String(g.id) === String(genreId)
        );
        setGenreName(found?.name ?? "");

        // 2) Hämta filmer i genren
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
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreMovies();
  }, [genreId]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6">Something went wrong.</p>;

  return (
    <main className="min-h-screen p-6">
      <div className="px-1 sm:px-8 md:px-8 lg:px-16 pt-1 lg:mb-10">
        <div className="mb-4 sm:mb-3">
          <BackButton to={from} label="Back to movie" />
        </div>
        <h1 className=" text-white text-center text-2xl font-bold mb-6 sm:mb-4 md:mb-8">
          {genreName || genreId}
        </h1>
      </div>

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
