import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieSlider from "../src/components/MovieSlider";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const API_KEY = "f4e07b8c3bee08478eb1ddafeed7e326";
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

  const fetchMovies = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      const movies = result.results;

      console.log("filmerna:", movies);

      setMovies(movies);
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main className="bg-black">
      <MovieSlider movies={movies} />
    </main>
  );
};

export default Home;
