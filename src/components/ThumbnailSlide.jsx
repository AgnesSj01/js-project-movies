  const ThumbnailSlide = ({ movie }) => {
    const imageUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

    return (
      <div className="relative h-24 bg-gray-800 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
          <p className="text-white text-xs truncate">{movie.title}</p>
        </div>
      </div>
    );
  };

  export default ThumbnailSlide;