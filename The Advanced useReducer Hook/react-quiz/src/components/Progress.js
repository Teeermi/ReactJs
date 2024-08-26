function Progress({ index, numQue, points, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress max={numQue} value={index + +(answer !== null)}></progress>

      <p>
        Question <strong>{index + 1}</strong> / {numQue}
      </p>

      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;
