import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
    <main
      style={{
        minHeight: "100vh",
        backgroundImage: movie.backdrop_path
          ? `url(${BACKDROP_URL}${movie.backdrop_path})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1>Movie detail</h1>
      {movie.poster_path && (
        <img
          src={`${IMG_URL}${movie.poster_path}`}
          alt={movie.title}
          style={{ width: "200px" }}
        />
      )}
      <p style={{ color: "white" }}>
        <strong>Rating:</strong> {movie.vote_average}
      </p>
      <p style={{ color: "white" }}>
        <strong>Description:</strong> {movie.overview}
      </p>
      <Link to="/">Go back</Link>
    </main>
  );
};

export default MovieInfo;

//Jag har använt useParams för att hämta filmens id från URL:en och sedan fetch:ar jag rätt film från TMDB i useEffect.
//När datan kommer sparas filmen i state och visas på sidan, annars visas “Loading…” medan vi väntar.
