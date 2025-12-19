import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

// Presentational back button component
// Navigation logic is handled by the parent page
const BackButton = ({ to, label }) => {
  return (
    // React Router link for client-side navigation
    <Link
      to={to}
      className="inline-flex items-center gap-3
                 text-white font-bold text-lg md:text-xl
                 group"
    >
      {/* Icon container */}
      <span
        className="flex items-center justify-center
                       w-7 h-7 md:w-9 md:h-9
                       rounded-full bg-white/90"
      >
        <ChevronLeftIcon
          className="w-5 h-5 md:w-6 md:h-6 text-black"
          strokeWidth={5}
        />
      </span>

      {/* Button label with subtle hover animation */}
      <span className="transition-transform duration-200 group-hover:translate-x-2">
        {label}
      </span>
    </Link>
  );
};

export default BackButton;
