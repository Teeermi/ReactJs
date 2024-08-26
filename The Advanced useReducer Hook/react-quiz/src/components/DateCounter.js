import { useReducer, useState } from "react";

const initialState = { count: 0, step: 1 }; // tutaj tworzymy state

function reducer(state, action) {
  // odbieramy nasze wszystkie state i actiuon w ktorym znajdzie sie type, payload

  // if (action.type === "inc") {
  //   return state + action.payload;
  // }

  // if (action.type === "dec") {
  //   return state + action.payload;
  // }

  // if (action.type === "setCount") {
  //   return action.payload;
  // }

  switch (action.type) {
    case "dec": // jesli action type jest dec to wtedy
      return { ...state, count: state.count - state.step };
    // rozbijamy wszystkie state i na count przypisujemy state.count ktory jest obecnie - state. step
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return { initialState };

    default:
      throw new Error("UNKNOWN ACTION");
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);

  // const [step, setStep] = useState(1);

  const [state, dispatch] = useReducer(reducer, initialState); // tworzymy reducera, ze state wyciagamy nasze staty
  // dispatch - jest to funkcja taka jak np setState, reducer to funkcja w ktorej robuimy glowne rzeczy i initial state to sa bazowe wartosci np 0 lub 1

  const { count, step } = state; // tutaj wyciagamy konkretnego count i step ze state

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec", payload: -1 }); // tutaj uzywamy reducera ktoremy dajemy nazwe w type i payload jest zalezny od tego co chcemy robic dodac 1 lub odjac
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({ type: "inc", payload: 1 });
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ type: "setCount", payload: +e.target.value });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: +e.target.value });
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({ type: "reset" });

    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input type="range" min="0" max="10" value={step} onChange={defineStep} />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
