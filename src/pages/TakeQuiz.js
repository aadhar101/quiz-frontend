import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/quizzes`);
      const data = await response.json();
      const selectedQuiz = data.find(q => q.id.toString() === id);
      setQuiz(selectedQuiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      alert("Please select an answer.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/quizzes/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId: id, answer: selectedAnswer }),
      });

      const data = await response.json();
      setResult(data.isCorrect ? "Correct! ✅" : `Wrong! ❌ The correct answer is: ${data.correctAnswer}`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div>
      <h2>{quiz.question}</h2>
      <ul>
        {quiz.options.map((option, index) => (
          <li key={index}>
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedAnswer === option}
              onChange={(e) => setSelectedAnswer(e.target.value)}
            />
            {option}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit Answer</button>
      {result && <p>{result}</p>}
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
};

export default TakeQuiz;
