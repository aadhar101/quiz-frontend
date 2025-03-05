import React, { useState } from "react";

const CreateQuiz = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }
    if (options.some((option) => !option.trim())) {
      setError("Please fill out all options.");
      return;
    }
    if (!correctAnswer.trim()) {
      setError("Please specify the correct answer.");
      return;
    }

    // Check if the correct answer is one of the options
    if (!options.includes(correctAnswer)) {
      setError("The correct answer must be one of the options.");
      return;
    }

    // Clear any previous errors
    setError("");

    // Create the quiz object
    const quiz = { question, options, correctAnswer };

    try {
        const response = await fetch("http://localhost:5000/api/quizzes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(quiz),
          });

      if (response.ok) {
        alert("Quiz created successfully!");
        // Reset the form
        setQuestion("");
        setOptions(["", "", "", ""]);
        setCorrectAnswer("");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to create quiz. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="create-quiz">
      <h1>Create a Quiz</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            placeholder="Enter the question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
            />
          ))}
        </div>

        <div className="form-group">
          <label htmlFor="correctAnswer">Correct Answer:</label>
          <input
            type="text"
            id="correctAnswer"
            placeholder="Enter the correct answer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        </div>

        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default CreateQuiz;