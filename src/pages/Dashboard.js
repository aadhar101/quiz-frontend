import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login"); // Redirect if not logged in
    } else {
      setUser(storedUser);
      fetchQuizzes();
    }
  }, [navigate]);
  const fetchQuizzes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/quizzes");
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  return (
    <div>
      <h1>Welcome {user?.username || "User"}!</h1>
      <p>Select a quiz to take:</p>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            {quiz.question}
            <button onClick={() => navigate(`/quiz/${quiz.id}`)}>Take Quiz</button>
          </li>
        ))}
      </ul>
      <button onClick={() => {
        localStorage.removeItem("user"); 
        navigate("/login");
      }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
