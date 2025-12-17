import { Link } from "react-router-dom";

const MovieSlide = ({ movie, isActive }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path || movie.poster_path}`;

  return (
    <div className="min-w-full h-full relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})`}}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

      <div className="absolute top-[40%] left-0 w-1/2 pl-[5%] text-white">
        <h2 className="text-5xl font-bold mb-8">{movie?.title}</h2>
        <p className={`text-sm leading-relaxed transition-all duration-700 ${isActive ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
          {movie.overview}
        </p>
        <Link to={`/movies/${movie.id}`}>View</Link>
      </div>
    </div>
  );
};

export default MovieSlide;