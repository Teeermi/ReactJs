import { useState } from "react";

function App() {
  const [step, setStep] = useState(0);
  const [counter, setCounter] = useState(0);
  const date = new Date();
  const [day, setDay] = useState(date.getDate());

  return (
    <>
      <div>
        <button onClick={() => setStep((s) => s - 1)}>-</button>
        <p style={{ display: "inline-block" }}> Step: {step} </p>
        <button
          onClick={() => {
            setStep((s) => s + 1);
            setDay((s) => s + 1);
          }}
        >
          +
        </button>
      </div>
      <div>
        <button onClick={() => setCounter((s) => s - 1)}>-</button>
        <p style={{ display: "inline-block" }}>Count: {counter}</p>
        <button
          onClick={() => {
            setCounter((s) => s + 1);
          }}
        >
          +
        </button>
      </div>
      <p>
        {step} days from today is {day}.08.2024
      </p>
    </>
  );
}

export default App;
