import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BackButton from "../src/components/BackButtons";
import { useLocation } from "react-router-dom";

// TMDB configuration
const API_KEY = "f4e07b8c3bee08478eb1ddafeed7e326";
const IMG_URL = "https://image.tmdb.org/t/p/w342";

// Displays movies filtered by a specific production company
const CompanyMovies = () => {
  // Read company ID from the URL
  const { companyId } = useParams();
  // State for company details (name, logo, etc.)
  const [company, setCompany] = useState(null);
  // State for fetched movies
  const [movies, setMovies] = useState([]);
  // Loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // Used to navigate back to the previous page
  const location = useLocation();
  const from = location.state?.from || "/";

  useEffect(() => {
    // Fetch company details + movies from TMDB
    const run = async () => {
      try {
        setLoading(true);
        setError(false);

        // Fetch company details to display the company name
        const companyRes = await fetch(
          `https://api.themoviedb.org/3/company/${companyId}?api_key=${API_KEY}`
        );
        if (!companyRes.ok) {
          setError(true);
          return;
        }
        const companyData = await companyRes.json();
        setCompany(companyData);

        //Fetch movies produced by the company (TMDB discover endpoint)
        const moviesRes = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_companies=${companyId}&sort_by=popularity.desc`
        );
        if (!moviesRes.ok) {
          setError(true);
          return;
        }
        const moviesData = await moviesRes.json();
        setMovies(moviesData.results ?? []);
      } catch {
        // Handle unexpected errors
        setError(true);
      } finally {
        // Stop loading once requests are complete
        setLoading(false);
      }
    };

    run();
  }, [companyId]);

  // Loading state
  if (loading) return <p className="p-6">Loading...</p>;
  // Error state
  if (error) return <p className="p-6">Something went wrong.</p>;

  return (
    <main className="min-h-screen p-6">
      {/* Page header with back navigation and company title */}
      <div className="px-1 sm:px-8 md:px-8 lg:px-16 pt-1 lg:mb-10">
        <div className="mb-4 sm:mb-3">
          <BackButton to={from} label="Back to movie" />
        </div>
        <h1 className=" text-white text-center text-2xl font-bold mb-6 sm:mb-4 md:mb-8">
          {company?.name
            ? `Movies from ${company.name}`
            : `Company ${companyId}`}
        </h1>
      </div>

      {/* Movie grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4 sm:px-8 md:px-8 lg:px-16">
        {movies.map((m) => (
          <Link key={m.id} to={`/movies/${m.id}`} className="block">
            {m.poster_path ? (
              <img
                src={`${IMG_URL}${m.poster_path}`}
                alt={m.title}
                className="w-full aspect-[2/3] object-cover rounded-lg"
                loading="lazy"
              />
            ) : (
              // Fallback when no poster is available
              <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center text-sm">
                No image
              </div>
            )}
            <p className="mt-2 text-sm font-semibold">{m.title}</p>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default CompanyMovies;
