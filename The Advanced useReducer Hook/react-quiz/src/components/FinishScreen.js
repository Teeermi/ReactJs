function FinishScreen({ points, maxPoints, highscore, dispatch }) {
  const percent = (points / maxPoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} ({percent.toFixed(2)}%)
      </p>
      <p className="highscore">(HighScore: {highscore} points)</p>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
