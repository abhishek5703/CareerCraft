import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  BookOpenCheck,
  AlertTriangle,
  TimerReset,
  CheckCircle,
  Clock,
  SkipForward,
  Eye,
  ShieldAlert,
} from "lucide-react";
import api from "../services/api";

const QuizInstructions = () => {
  const { roadmapId } = useParams();
  const navigate = useNavigate();
  const [questionCount, setQuestionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(true);
  };

  const confirmStart = () => {
    setShowModal(false);
    navigate(`/quiz/${roadmapId}`);
  };

  const cancelStart = () => {
    setShowModal(false);
  };

  if (loading) return <div className="p-6 text-center text-lg">Loading instructions...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-12 px-6 py-10 bg-white border border-gray-200 rounded-3xl shadow-xl relative">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
        📘 Quiz Instructions
      </h1>

      <ul className="space-y-4 text-gray-700 text-lg">
        <li className="flex items-start gap-3">
          <BookOpenCheck className="text-indigo-600 w-5 h-5 mt-1" />
          This quiz contains <strong>{questionCount}</strong> multiple-choice questions.
        </li>
        <li className="flex items-start gap-3">
          <Clock className="text-rose-600 w-5 h-5 mt-1" />
          Each question has a time limit of <strong>30 seconds</strong>.
        </li>
        <li className="flex items-start gap-3">
          <SkipForward className="text-yellow-600 w-5 h-5 mt-1" />
          You can <strong>attempt</strong> or <strong>skip</strong> any question.
        </li>
        <li className="flex items-start gap-3">
          <AlertTriangle className="text-yellow-500 w-5 h-5 mt-1" />
          Do not refresh or close the browser during the quiz.
        </li>
        <li className="flex items-start gap-3">
          <Eye className="text-blue-600 w-5 h-5 mt-1" />
          You can view your result once all questions are completed.
        </li>
      </ul>

      <div className="text-center mt-10">
        <button
          onClick={handleStartQuiz}
          className="text-lg px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition duration-200"
        >
          🚀 Start Quiz
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg border relative">
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-semibold text-gray-800">Are you ready?</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Once you start, each question will have a 30-second timer. You can't pause, and you can’t come back later.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelStart}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmStart}
                className="px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                Start Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizInstructions;
