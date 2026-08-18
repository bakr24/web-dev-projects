import { useState } from "react";
import questions from "../data/questions";
import Question from "./Question";
import Result from "./Result";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  function handleNext() {
    if (!selectedAnswer) {
      return;
    }

    if (
      selectedAnswer ===
      questions[currentQuestion].answer
    ) {
      setScore(score + 1);
    }

    if (
      currentQuestion ===
      questions.length - 1
    ) {
      setShowResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    }
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setShowResult(false);
  }

  if (showResult) {
    return (
      <Result
        score={score}
        totalQuestions={questions.length}
        onRestart={restartQuiz}
      />
    );
  }

  return (
    <div className="quiz">
      <div className="quiz-header">
        <p>
          Question {currentQuestion + 1} of{" "}
          {questions.length}
        </p>

        <div className="progress">
          <div
            className="progress-bar"
            style={{
              width: `${
                ((currentQuestion + 1) /
                  questions.length) *
                100
              }%`,
            }}
          />
        </div>
      </div>

      <Question
        question={questions[currentQuestion]}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={setSelectedAnswer}
      />

      <button
        className="next-btn"
        onClick={handleNext}
        disabled={!selectedAnswer}
      >
        {currentQuestion === questions.length - 1
          ? "Finish Quiz"
          : "Next Question"}
      </button>
    </div>
  );
}

export default Quiz;