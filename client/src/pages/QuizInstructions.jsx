import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
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
  <li className="quiz-instruction-item">
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

  if (loading) return <div className="route-loading" role="status"><span className="loading-spinner" />Preparing quiz instructions…</div>;

  return (
    <div className="quiz-instructions-page">
      <div className="quiz-instructions-card">
        <div className="quiz-instructions-heading"><span className="section-kicker">BEFORE YOU BEGIN</span><h1>Quiz instructions</h1><p>A quick look at how this learning check works.</p></div>
        <div className="quiz-instructions-meta"><span><BookOpenCheck size={16} /> {questionCount} questions</span><span><Clock size={16} /> 30 seconds each</span></div>

        <ul className="quiz-instruction-list">
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
            Avoid refreshing or closing the browser during the quiz. You can pause the timer, but you cannot revisit previous questions.
          </InstructionItem>

          <InstructionItem icon={<Eye className="text-blue-600 w-5 h-5 mt-1" />}>
            Your result will be shown after completing all questions.
          </InstructionItem>
        </ul>

        <div className="quiz-instructions-actions">
          <button onClick={handleStartQuiz} className="btn-primary quiz-start-button">Start quiz <ArrowUpRight size={17} /> </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="quiz-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="quiz-confirm-modal"
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
                Each question is timed. You can pause the timer, but once you move forward you cannot revisit a previous question. Make sure you are ready before you begin.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={cancelStart}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmStart}
                  className="btn-primary"
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