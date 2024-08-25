import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";

const initialState = {
  // tutaj tworzymy nasze state i przypisujemy im domyslna wartosc
  questions: [],
  status: "loading",
};

function reducer(state, action) {
  // tutaj tworzymy reducer ktory odbiera wszystkie state i action
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" }; // jesli dostaniemy dane z naszego api to przypisze dane ktore dostniamy do tabeli i nada status ready

    case "dataFailed": // jesli nie uda sie otrzymac danych z api to po prostu odesle wszystkie state i ustawi status error
      return { ...state, status: "error" };

    default:
      throw new Error("ERROR");
  }
}

export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();

        dispatch({ type: "dataRecived", payload: data }); // uzywamy reducera i wysylamy dane z api
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
      </Main>
    </div>
  );
}
