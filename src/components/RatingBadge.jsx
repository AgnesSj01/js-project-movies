// Displays a movie rating as a small badge with a star icon
// Used across the app to keep rating UI consistent
const RatingBadge = ({ rating }) => {
  return (
    <span
      className="inline-flex items-center gap-1.5
                 bg-white/80 text-black
                 px-2 py-1
                 rounded-lg shadow-md"
    >
      {/* Star icon */}
      <span className="text-yellow-600 text-xl md:text-3xl">★</span>

      {/* Rating value formatted to one decimal */}
      <span className="text-xl md:text-3xl font-bold">{rating.toFixed(1)}</span>
    </span>
  );
};

export default RatingBadge;
