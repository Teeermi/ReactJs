function FinishScreen({ points, maxPoints, highscore }) {
  const percent = (points / maxPoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} ({percent.toFixed(2)}%)
      </p>
      <p className="highscore">(HighScore: {highscore} points)</p>
    </>
  );
}

export default FinishScreen;
