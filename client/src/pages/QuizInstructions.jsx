import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  BookOpenCheck,
  AlertTriangle,
  Clock,
  SkipForward,
  Eye,
  ShieldAlert,
} from "lucide-react";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

const InstructionItem = ({ icon, children }) => (
  <li className="flex items-start gap-3 text-start leading-relaxed">
    <span className="flex-shrink-0">{icon}</span>
    <span className="flex-1">{children}</span>
  </li>
);

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

  const handleStartQuiz = () => setShowModal(true);
  const confirmStart = () => {
    setShowModal(false);
    navigate(`/quiz/${roadmapId}`);
  };
  const cancelStart = () => setShowModal(false);

  if (loading) return <div className="text-center text-lg py-10">Loading instructions...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="bg-white border border-gray-200 rounded-3xl shadow-xl px-6 sm:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-700 mb-8">
          📘 Quiz Instructions
        </h1>

        <ul className="space-y-5 text-gray-700 text-base sm:text-lg">
          <InstructionItem icon={<BookOpenCheck className="text-indigo-600 w-5 h-5 mt-1" />}>
            This quiz contains <strong>{questionCount}</strong> multiple-choice questions.
          </InstructionItem>

          <InstructionItem icon={<Clock className="text-rose-600 w-5 h-5 mt-1" />}>
            Each question has a time limit of <strong>30 seconds</strong>.
          </InstructionItem>

          <InstructionItem icon={<SkipForward className="text-yellow-600 w-5 h-5 mt-1" />}>
            You can <strong>attempt</strong> or <strong>skip</strong> any question.
          </InstructionItem>

          <InstructionItem icon={<AlertTriangle className="text-yellow-500 w-5 h-5 mt-1" />}>
            Avoid refreshing or closing the browser during the quiz.
          </InstructionItem>

          <InstructionItem icon={<Eye className="text-blue-600 w-5 h-5 mt-1" />}>
            Your result will be shown after completing all questions.
          </InstructionItem>
        </ul>

        <div className="text-center mt-10">
          <button
            onClick={handleStartQuiz}
            className="text-lg px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition"
          >
            🚀 Start Quiz
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl border border-gray-200"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <ShieldAlert className="w-6 h-6 text-red-600" />
                <h3 className="text-xl font-semibold text-gray-800">Are you ready?</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Once started, each question is timed. You can’t pause or revisit questions.
                Ensure a stable environment before beginning.
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizInstructions;
