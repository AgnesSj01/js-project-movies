import { useEffect, useState } from "react";
import MovieSlider from "../src/components/MovieSlider";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const API_KEY = "f4e07b8c3bee08478eb1ddafeed7e326";
    const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    const fetchMovies = async () => {
      try {
        const [response] = await Promise.all([
          await fetch(API_URL),
          new Promise(resolve => setTimeout(resolve, 3000))
        ]);
        const result = await response.json();
        const movies = result.results;

        setMovies(movies);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, []);

  if (loading) return <div className="text-white bg-rgba(0,0,0,0.3) h-screen w-screen flex justify-center align-center items-center"><span className="typewriter">Loading...</span></div>;
  if (error) return <div className="text-red-500 bg-rgba(0,0,0,0.3) h-screen w-screen flex justify-center align-center items-center"><span className="typewriter">{error}</span></div>;

  return (
    <main className="bg-black">
      <MovieSlider movies={movies} />
    </main>
  );
};

export default Home;
