import React, { useEffect, useState } from "react";
import QuizCard from "../components/QuizCard";

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch("/api/quizzes")
      .then((response) => response.json())
      .then((data) => setQuizzes(data));
  }, []);

  return (
    <div>
      <h1>Quizzes</h1>
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
};

export default Home;