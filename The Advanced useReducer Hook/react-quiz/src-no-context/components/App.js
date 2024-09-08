import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  // tutaj tworzymy nasze state i przypisujemy im domyslna wartosc
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  time: 300,
};

function reducer(state, action) {
  // tutaj tworzymy reducer ktory odbiera wszystkie state i action
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" }; // jesli dostaniemy dane z naszego api to przypisze dane ktore dostniamy do tabeli i nada status ready

    case "dataFailed": // jesli nie uda sie otrzymac danych z api to po prostu odesle wszystkie state i ustawi status error
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return { ...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return { ...state, status: "finished", highscore: state.points > state.highscore ? state.points : state.highscore };
    case "restart":
      return { ...state, status: "ready", index: 0, answer: null, points: 0 };

    case "tick":
      return { ...state, time: state.time - 1, status: state.time === 0 ? "finished" : state.status };

    default:
      throw new Error("ERROR");
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore, time }, dispatch] = useReducer(reducer, initialState);

  const numQue = questions.length;

  const maxPoints = questions.map((e) => e.points).reduce((accu, val) => (accu += val), 0);

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
        {status === "ready" && <StartScreen numQue={numQue} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progress index={index} numQue={numQue} points={points} maxPoints={maxPoints} answer={answer} />
            <Question questions={questions[index]} dispatch={dispatch} answer={answer} />{" "}
            <Footer>
              <Timer time={time} dispatch={dispatch} />
              <NextButton dispatch={dispatch} answer={answer} index={index} numQue={numQue} />{" "}
            </Footer>
          </>
        )}

        {status === "finished" && <FinishScreen points={points} maxPoints={maxPoints} highscore={highscore} dispatch={dispatch} />}
      </Main>
    </div>
  );
}
