import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MovieInfo from "../pages/MovieInfo";
import NotFound from "../pages/NotFound";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<MovieInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
