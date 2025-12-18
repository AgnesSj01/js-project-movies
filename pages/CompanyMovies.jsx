import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BackButton from "../src/components/BackButtons";
import { useLocation } from "react-router-dom";

const API_KEY = "f4e07b8c3bee08478eb1ddafeed7e326";
const IMG_URL = "https://image.tmdb.org/t/p/w342";

const CompanyMovies = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const location = useLocation();
  const from = location.state?.from || "/";

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError(false);

        // 1) Company details
        const companyRes = await fetch(
          `https://api.themoviedb.org/3/company/${companyId}?api_key=${API_KEY}`
        );
        if (!companyRes.ok) {
          setError(true);
          return;
        }
        const companyData = await companyRes.json();
        setCompany(companyData);

        // 2) Movies by company (discover)
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
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [companyId]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6">Something went wrong.</p>;

  return (
    <main className="min-h-screen p-6">
      <div className="px-4 sm:px-8 md:px-8 lg:px-16 pt-4 mb-2">
        <BackButton to={from} label="Back to movie" />

        <h1 className="text-2xl font-bold mb-3">
          {company?.name ? `Company: ${company.name}` : `Company ${companyId}`}
        </h1>
      </div>

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
