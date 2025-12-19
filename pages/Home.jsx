import { useEffect, useState } from "react";
import MovieSlider from "../src/components/MovieSlider";

const Home = () => {
  // State for storing fetched movies
  const [movies, setMovies] = useState([]);
  // State for handling errors during fetch
  const [error, setError] = useState(null);
  // State to control loading indicator
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TMDB API configuration
    const API_KEY = "f4e07b8c3bee08478eb1ddafeed7e326";
    const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    // Fetch popular movies from TMDB
    const fetchMovies = async () => {
      try {
        // Fetch movies and add an artificial delay for smoother UX
        const [response] = await Promise.all([
          await fetch(API_URL),
          new Promise((resolve) => setTimeout(resolve, 3000)),
        ]);
        const result = await response.json();
        const movies = result.results;

        // Update movie state with fetched data
        setMovies(movies);
      } catch (err) {
        // Handle and log fetch errors
        setError(err.message);
        console.error(err);
      } finally {
        // Stop loading indicator once fetch is complete
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Display loading screen while data is being fetched
  if (loading)
    return (
      <div className="text-white bg-rgba(0,0,0,0.3) h-screen w-screen flex justify-center align-center items-center">
        <span className="typewriter">Loading...</span>
      </div>
    );
  // Display error message if fetch fails
  if (error)
    return (
      <div className="text-red-500 bg-rgba(0,0,0,0.3) h-screen w-screen flex justify-center align-center items-center">
        <span className="typewriter">{error}</span>
      </div>
    );

  return (
    <main className="bg-black">
      {/* Pass fetched movies to the MovieSlider component */}
      <MovieSlider movies={movies} />
    </main>
  );
};

export default Home;
