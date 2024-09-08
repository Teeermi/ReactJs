function NextButton({ dispatch, answer, index, numQue }) {
  if (answer === null) return;

  if (index < numQue - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>
        Next
      </button>
    );

  if (index === numQue - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>
        Finish
      </button>
    );
}

export default NextButton;
