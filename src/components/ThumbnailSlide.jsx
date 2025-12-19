// Renders a thumbnail version of a movie poster
// Used for navigation inside the MovieSlider component
const ThumbnailSlide = ({ movie }) => {
  // Build thumbnail image URL (smaller size for performance)
  const imageUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

  return (
    <div className="relative aspect-[2/3] min-h-[140px] max-h-[240px] lg:min-h-[260px] lg:max-h-[460px] bg-neutral-900 overflow-hidden bg-black">
      {/* Movie poster image */}
      <img
        src={imageUrl}
        alt={movie.title}
        role="img"
        aria-label={`Movie poster for ${movie.title}`}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Title overlay with gradient for readability */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
        <p className="text-white text-xs truncate">{movie.title}</p>
      </div>
    </div>
  );
};

export default ThumbnailSlide;
