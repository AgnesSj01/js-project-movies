import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MovieInfo from "../pages/MovieInfo";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<MovieInfo />} />
      </Routes>
    </BrowserRouter>
  );
};
//Bytte till id, tydligen någon standard
