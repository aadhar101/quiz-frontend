import React, { useState } from "react";
import QuizQuestion from "./QuizQuestion";

const QuizCard = ({ quiz }) => {
  const [showQuestion, setShowQuestion] = useState(false);

  return (
    <div>
      <h3>{quiz.question}</h3>
      <button onClick={() => setShowQuestion(!showQuestion)}>
        {showQuestion ? "Hide" : "Show"} Question
      </button>
      {showQuestion && <QuizQuestion quiz={quiz} />}
    </div>
  );
};

export default QuizCard;