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
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: movie.backdrop_path
          ? `url(${BACKDROP_URL}${movie.backdrop_path})`
          : "none",
        // backgroundSize: "cover",
        //backgroundPosition: "center",
      }}

      // https://tailwindcss.com/docs/min-height
    >
      <Link to="/">Go back</Link>
      {/* {movie.backdrop_path && (
        <img
          src={`${BACKDROP_URL}${movie.backdrop_path}`}
          alt={movie.title}
          // style={{ width: "200px" }}
          className="w-full h-full absolute z-0 left-0 right-0 top-0 bottom-0 cover"
        />
      )} */}
      {movie.poster_path && (
        <img
          src={`${IMG_URL}${movie.poster_path}`}
          alt={movie.title}
          // style={{ width: "200px" }}
          className="w-[200px]"
          // https://tailwindcss.com/docs/width
        />
      )}
      {/* Title */}
      <p className="text-white text-xl font-bold">{movie.original_title}</p>

      {/* Rating */}
      <p className="text-white mt-2">
        <strong>Rating:</strong> {movie.vote_average}
      </p>

      {/* Description */}
      <p className="text-white mt-2 max-w-xl">
        <strong>Description:</strong> {movie.overview}
      </p>
    </main>
  );
};

export default MovieInfo;

//Jag har använt useParams för att hämta filmens id från URL:en och sedan fetch:ar jag rätt film från TMDB i useEffect.
//När datan kommer sparas filmen i state och visas på sidan, annars visas “Loading…” medan vi väntar.
