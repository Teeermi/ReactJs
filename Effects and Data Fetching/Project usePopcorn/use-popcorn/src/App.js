import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const key = `127a278e`;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  function handleSelect(id) {
    setSelected(id);
  }

  function handleCloseMovie() {
    setSelected(null);
  }

  function handleAddWatch(movie) {
    setWatched([...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((e) => e.imdbID !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchData() {
        try {
          setIsLoad(true);
          setIsError("");
          const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`, { signal: controller.signal });

          if (!res.ok) throw new Error("NO CONNECTION");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found!");
          setMovies(data.Search);
          setIsLoad(false);
        } catch (error) {
          if (error.name !== "AbortError") {
            setIsError(error.message);
          }
        } finally {
          setIsLoad(false);
        }
      }

      if (query.length < 3) setMovies([]);
      setIsError("");
      fetchData();
      return function () {
        controller.abort(); //usuwanie nowego requesta kiedy nowy przyjdzie
      };
    },
    [query]
  );

  return (
    <>
      <Nav movies={movies} query={query} setQuery={setQuery} />

      <main className="main">
        {isError ? <ErrorMessage message={isError} /> : isLoad ? <Loader /> : <Box movies={movies} handleSelect={handleSelect} />}

        {selected ? (
          <SelectedMovie selected={selected} handleCloseMovie={handleCloseMovie} handleAddWatch={handleAddWatch} watched={watched} />
        ) : (
          <BoxMain watched={watched} handleDeleteWatched={handleDeleteWatched} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className="loader">LOADING</p>;
}

function ErrorMessage({ message }) {
  return <p className="error">{message}</p>;
}

function Nav({ movies, query, setQuery }) {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input className="search" type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  );
}

function Box({ movies, handleSelect }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen1((open) => !open)}>
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && (
        <ul className="list list-movies">
          {movies?.map((movie) => (
            <ListItem handleSelect={handleSelect} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
}

function ListItem({ movie, handleSelect }) {
  return (
    <li onClick={() => handleSelect(movie.imdbID)} key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function SelectedMovie({ selected, handleCloseMovie, handleAddWatch, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const [userRate, setUserRate] = useState(0);

  const watchedUserRating = watched.find((e) => e.imdbID === selected)?.userRate;

  function handleAll() {
    const newWatchedMovie = {
      imdbID: selected,
      title,
      year,
      poster,
      imdbRating: +imdbRating,
      runtime: +runtime.split(" ").at(0),
      userRate,
    };
    handleAddWatch(newWatchedMovie);
    handleCloseMovie();
  }

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          handleCloseMovie();
        }
      }

      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [handleCloseMovie]
  );

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function () {
      async function fetchData() {
        setIsLoad(true);
        const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${selected}`);
        const data = await res.json();
        setMovie(data);
        setIsLoad(false);
      }
      fetchData();
    },
    [selected]
  );

  useEffect(
    function () {
      document.title = `Movie | ${title}`;

      return function () {
        document.title = `usePopcorn v2`;
      };
    },
    [title]
  );

  return (
    <div className="detail">
      {isLoad ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovie} />
            <img src={poster} alt="Poster of sth"></img>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>{imdbRating}</p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!watched.find((x) => x.imdbID === selected) && <StarRating setMovieRating={setUserRate} />}
              {userRate ? (
                <button className="btn-add" onClick={handleAll}>
                  Add
                </button>
              ) : (
                <p>{!watchedUserRating ? "You dont rate this movie" : `You rate this movie ${watchedUserRating} stars`}</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>{actors}</p>
            <p>{director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function BoxMain({ watched, handleDeleteWatched }) {
  const [isOpen2, setIsOpen2] = useState(true);
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRate));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen2((open) => !open)}>
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <div className="summary">
            <h2>Movies you watched</h2>
            <div>
              <p>
                <span>#️⃣</span>
                <span>{watched.length} movies</span>
              </p>
              <p>
                <span>⭐️</span>
                <span>{avgImdbRating.toFixed(2)}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{avgUserRating.toFixed(2)}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{avgRuntime} min</span>
              </p>
            </div>
          </div>

          <List watched={watched} handleDeleteWatched={handleDeleteWatched} />
        </>
      )}
    </div>
  );
}

function List({ watched, handleDeleteWatched }) {
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <ListItemTwo movie={movie} handleDeleteWatched={handleDeleteWatched} />
      ))}
    </ul>
  );
}

function ListItemTwo({ movie, handleDeleteWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRate}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={(e) => handleDeleteWatched(movie.imdbID)}>
          X
        </button>
      </div>
    </li>
  );
}
