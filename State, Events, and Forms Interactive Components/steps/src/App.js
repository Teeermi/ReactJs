import { useState } from "react";

const messages = ["Learn React ⚛️", "Apply for jobs 💼", "Invest your new income 🤑"];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  // const [test] = useState({ name: "Jonas" });

  function handlePrevious() {
    if (step === 1) return;
    setStep((s) => s - 1);
  }

  function handleNext() {
    if (step === 3) return;
    setStep((s) => s + 1);
  }

  function handleClose() {
    setIsOpen((s) => !s);
  }

  return (
    <>
      <button className="close" onClick={handleClose}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`${step >= 2 ? "active" : ""}`}>2</div>
            <div className={`${step >= 3 ? "active" : ""}`}>3</div>
          </div>

          <StepMessage step={step}>{messages[step - 1]} </StepMessage>

          <div className="buttons">
            <Button bgC={`#7950f2`} color={`white`} handleFunction={handlePrevious}>
              <span></span>Prevorious
            </Button>
            <Button bgC={`#7950f2`} color={`white`} handleFunction={handleNext}>
              <span>Next</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function Button({ bgC, color, handleFunction, children }) {
  return (
    <button style={{ backgroundColor: bgC, color: color }} onClick={handleFunction}>
      {children}
    </button>
  );
}

function StepMessage({ step, children }) {
  return (
    <p className="message">
      Step {step}: {children}
    </p>
  );
}
