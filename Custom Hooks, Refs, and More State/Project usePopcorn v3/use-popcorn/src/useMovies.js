import { useEffect, useState } from "react";

const key = `127a278e`;

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController(); //tworzenie nowego aborta
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

  return { movies, isLoad, isError };
}
