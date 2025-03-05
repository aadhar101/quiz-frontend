import React, { useState } from "react";

const QuizForm = () => {
  // State for the quiz question
  const [question, setQuestion] = useState("");

  // State for the quiz options (default: 4 options)
  const [options, setOptions] = useState(["", "", "", ""]);

  // State for the correct answer
  const [correctAnswer, setCorrectAnswer] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!question || options.some((option) => option.trim() === "") || !correctAnswer) {
      alert("Please fill out all fields.");
      return;
    }

    // Create the quiz object
    const quiz = {
      question,
      options,
      correctAnswer,
    };

    try {
      // Send a POST request to the backend
      const response = await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quiz),
      });

      // Check if the request was successful
      if (response.ok) {
        alert("Quiz created successfully!");
        // Reset the form
        setQuestion("");
        setOptions(["", "", "", ""]);
        setCorrectAnswer("");
      } else {
        alert("Failed to create quiz. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="quiz-form">
      <h2>Create a New Quiz</h2>
      <form onSubmit={handleSubmit}>
        {/* Question Input */}
        <div className="form-group">
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter the question"
            required
          />
        </div>

        {/* Options Input */}
        <div className="form-group">
          <label>Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              placeholder={`Option ${index + 1}`}
              required
            />
          ))}
        </div>

        {/* Correct Answer Input */}
        <div className="form-group">
          <label htmlFor="correctAnswer">Correct Answer:</label>
          <input
            type="text"
            id="correctAnswer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            placeholder="Enter the correct answer"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default QuizForm;