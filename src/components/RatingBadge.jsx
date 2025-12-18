const RatingBadge = ({ rating }) => {
  return (
    <span
      className="inline-flex items-center gap-1.5
                 bg-white/80 text-black
                 px-2 py-1
                 rounded-lg shadow-md"
    >
      <span className="text-yellow-600 text-xl md:text-3xl">★</span>
      <span className="text-xl md:text-3xl font-bold">{rating.toFixed(1)}</span>
    </span>
  );
};

export default RatingBadge;
