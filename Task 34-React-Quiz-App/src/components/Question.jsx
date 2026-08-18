function Question({
  question,
  selectedAnswer,
  onSelectAnswer,
}) {
  return (
    <div className="question">
      <h2>{question.question}</h2>

      <div className="options">
        {question.options.map((option) => (
          <button
            key={option}
            className={
              selectedAnswer === option
                ? "option selected"
                : "option"
            }
            onClick={() => onSelectAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;