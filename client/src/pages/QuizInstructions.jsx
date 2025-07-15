import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api"; // adjust path if needed

const QuizInstructions = () => {
  const { roadmapId } = useParams();
  const navigate = useNavigate();
  const [questionCount, setQuestionCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const res = await api.get(`/quiz/${roadmapId}`);
        setQuestionCount(res.data.length);
      } catch (err) {
        console.error("Error fetching quiz questions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [roadmapId]);

  const handleStartQuiz = () => {
    navigate(`/quiz/${roadmapId}`);
  };

  if (loading) return <div className="p-6">Loading instructions...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center">Quiz Instructions</h1>
      <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-6">
        <li>This quiz contains <strong>{questionCount}</strong> multiple-choice questions.</li>
        <li>Each question has only one correct answer.</li>
        <li>Once you start, don’t refresh or close the browser.</li>
        <li>Results will be shown after submission.</li>
      </ul>
      <div className="text-center">
        <button
          onClick={handleStartQuiz}
          className="text-lg px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizInstructions;
