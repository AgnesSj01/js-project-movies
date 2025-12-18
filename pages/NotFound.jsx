import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="text-blue-400 underline">
        Go back to home
      </Link>
    </main>
  );
};

export default NotFound;
