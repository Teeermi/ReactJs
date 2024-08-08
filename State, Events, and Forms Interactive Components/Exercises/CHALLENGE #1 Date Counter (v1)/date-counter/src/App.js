import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const date = new Date("june 21 2027");
  const [step, setStep] = useState(0);
  const [counter, setCounter] = useState(1);

  date.setDate(date.getDate() + step * counter);

  return (
    <div>
      <div>
        <button onClick={() => setStep((s) => s - 1)}>-</button>
        <span>STEP: {step}</span>
        <button onClick={() => setStep((s) => s + 1)}>+</button>
      </div>
      <div>
        <button onClick={() => setCounter((s) => s - 1)}>-</button>
        <span>COUNT: {counter}</span>
        <button onClick={() => setCounter((s) => s + 1)}>+</button>
      </div>
      <p>
        {step === 0 ? "Today " : `${step * counter} days from today`} is {date.toDateString()}
      </p>
    </div>
  );
}
