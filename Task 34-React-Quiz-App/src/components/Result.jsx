function Result({
  score,
  totalQuestions,
  onRestart,
}) {
  return (
    <div className="result">
      <h1>Quiz Completed! 🎉</h1>

      <p>Your Score</p>

      <h2>
        {score} / {totalQuestions}
      </h2>

      <p>
        You answered{" "}
        {score} out of {totalQuestions} questions correctly.
      </p>

      <button
        className="restart-btn"
        onClick={onRestart}
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default Result;