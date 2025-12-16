import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home";
import MovieInfo from "../pages/MovieInfo";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieInfo />} />
        <Route path="/movies/:movie" element={<MovieInfo />} />
      </Routes>
    </BrowserRouter>
  );
};
