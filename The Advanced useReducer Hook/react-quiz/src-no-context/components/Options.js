function Options({ questions, dispatch, answer }) {
  const answered = answer !== null;

  return (
    <div className="options">
      {questions.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${answered ? (index === questions.correctOption ? "correct" : "wrong") : ""}`}
          key={option}
          onClick={(e) => dispatch({ type: "newAnswer", payload: index })}
          disabled={answer}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
