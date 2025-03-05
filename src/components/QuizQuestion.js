import React, { useState } from "react";

const QuizQuestion = ({ quiz }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const response = await fetch("/api/quizzes/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quizId: quiz.id, answer: selectedAnswer }),
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <ul>
        {quiz.options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="option"
                value={option}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit</button>
      {result && (
        <p>{result.isCorrect ? "Correct!" : `Incorrect. Correct answer: ${result.correctAnswer}`}</p>
      )}
    </div>
  );
};

export default QuizQuestion;