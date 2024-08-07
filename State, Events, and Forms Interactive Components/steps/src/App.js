import { useState } from "react";

const messages = ["Learn React ⚛️", "Apply for jobs 💼", "Invest your new income 🤑"];

export default function App() {
  const [step, setStep] = useState(1);
  // const [test] = useState({ name: "Jonas" });

  function handlePrevious() {
    if (step === 1) return;
    setStep(step - 1);
  }

  function handleNext() {
    if (step === 3) return;
    setStep(step + 1);
  }

  return (
    <div className="steps">
      <div className="numbers">
        <div className={`${step >= 1 ? "active" : ""}`}>1</div>
        <div className={`${step >= 2 ? "active" : ""}`}>2</div>
        <div className={`${step >= 3 ? "active" : ""}`}>3</div>
      </div>

      <p className="message">
        Step {step}: {messages[step - 1]}
      </p>

      <div className="buttons">
        <button style={{ backgroundColor: "#7950f2", color: "white" }} onClick={handlePrevious}>
          Prevorious
        </button>
        <button style={{ backgroundColor: "#7950f2", color: "white" }} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}
