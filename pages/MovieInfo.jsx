import { Link, useParams } from "react-router";

const MovieInfo = () => {
  const { movie } = useParams();

  return (
    <main>
      {movie ? (
        <p>Movie id: {movie}</p>
      ) : (
        <>
          <h1>All movies</h1>
        </>
      )}

      <Link to="/">Go back to Movie list</Link>
    </main>
  );
};

export default MovieInfo;
