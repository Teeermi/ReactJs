function StartScreen({ numQue }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{numQue} questions to test your React mastery</h3>
      <button className="btn btn-ui">Lets starty</button>
    </div>
  );
}

export default StartScreen;
