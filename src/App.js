import { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import searchIcon from "../src/searchIcon.svg";

const API_KEY = "http://www.omdbapi.com?apikey=4af54742";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const res = await fetch(`${API_KEY}&s=${title}`);
    const data = await res.json();
    console.log(data.Search);
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies("papa love you");
  }, []);

  return (
    <div className="app">
      <h1>Best Movies Sites</h1>

      <form
        className="search"
        onSubmit={(e) => {
          e.preventDefault();
          searchMovies(searchTerm);
        }}
      >
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
          required
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </form>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
