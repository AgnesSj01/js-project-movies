import { Link } from "react-router-dom";

const MovieSlide = ({ movie, isActive }) => {
  const imageUrl = `https://image.tmdb.org/t/p/original${movie.poster_path || movie.poster_path}`;

  return (
    <div className="min-w-full h-full relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})`}}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

      <div className="absolute bottom-0 left-0 w-full lg:w-1/2 p-16 flex flex-col gap-8 text-white">
        <div class="flex flex-col gap-2 lg:gap-4">
          <h1 className="text-white text-xl lg:text-3xl font-bold">{movie?.title}</h1>
          <p className="text-sm lg:text-lg leading-relaxed">
            {movie.overview}
          </p>
        </div>
        <Link
          className="w-fit border-2 px-8 py-2 text-md border-2 px-6 py-2 font-normal rounded-full hover:bg-white hover:text-black hover:border-white transition"
          to={`/movies/${movie.id}`}
        >View</Link>
      </div>
    </div>
  );
};

export default MovieSlide;