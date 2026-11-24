import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowUpRight,
  BookOpenCheck,
  Clock,
  Eye,
  ShieldAlert,
  SkipForward,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import api from "../services/api";
import "./QuizInstructions.css";

const InstructionItem = ({ icon, tone, children }) => (
  <li className="quiz-instruction-item">
    <span className={`quiz-instruction-icon ${tone || "blue"}`} aria-hidden="true">
      {icon}
    </span>
    <span className="quiz-instruction-copy">{children}</span>
  </li>
);

const QuizInstructions = () => {
  const { roadmapId } = useParams();
  const navigate = useNavigate();
  const [questionCount, setQuestionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchQuizData = async () => {
      setLoading(true);
      setLoadError("");

      try {
        const response = await api.get(`/quiz/${roadmapId}`, {
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        const questions = Array.isArray(response.data) ? response.data : [];
        setQuestionCount(questions.length);

        if (questions.length === 0) {
          setLoadError("There are no questions available for this roadmap yet.");
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadError(
            error.response?.data?.message ||
              "We couldn't load the quiz questions. Please try again."
          );
          setQuestionCount(0);
          console.error("Error fetching quiz questions", error);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchQuizData();
    return () => controller.abort();
  }, [roadmapId, retryKey]);

  const confirmStart = () => {
    setShowModal(false);
    navigate(`/quiz/${roadmapId}`);
  };

  if (loading) {
    return (
      <div className="quiz-instructions-page quiz-instructions-loading" role="status">
        <span className="quiz-loading-spinner" />
        <span>Preparing your quiz instructions…</span>
      </div>
    );
  }

  return (
    <div className="quiz-instructions-page">
      <div className="quiz-instructions-orb quiz-instructions-orb-one" />
      <div className="quiz-instructions-orb quiz-instructions-orb-two" />

      <section className="quiz-instructions-card">
        <div className="quiz-instructions-heading">
          <span className="quiz-instructions-kicker">
            <BookOpenCheck size={14} /> BEFORE YOU BEGIN
          </span>
          <h1>Quiz instructions</h1>
          <p>A quick look at how this learning check works.</p>
        </div>

        <div className="quiz-instructions-meta">
          <span>
            <BookOpenCheck size={17} />
            <strong>{questionCount}</strong> questions
          </span>
          <span>
            <Clock size={17} />
            <strong>30 seconds</strong> each
          </span>
        </div>

        {loadError ? (
          <div className="quiz-instructions-error" role="alert">
            <span className="quiz-instructions-error-icon">
              <AlertTriangle size={19} />
            </span>
            <div>
              <strong>Quiz unavailable</strong>
              <p>{loadError}</p>
              <button
                type="button"
                className="quiz-instructions-retry"
                onClick={() => setRetryKey((current) => current + 1)}
              >
                Try again
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        ) : (
          <>
            <ul className="quiz-instruction-list">
              <InstructionItem icon={<BookOpenCheck size={19} />} tone="violet">
                This quiz contains <strong>{questionCount}</strong> multiple-choice questions.
              </InstructionItem>

              <InstructionItem icon={<Clock size={19} />} tone="rose">
                Each question has a time limit of <strong>30 seconds</strong>.
              </InstructionItem>

              <InstructionItem icon={<SkipForward size={19} />} tone="amber">
                You can <strong>attempt</strong> or <strong>skip</strong> any question.
              </InstructionItem>

              <InstructionItem icon={<AlertTriangle size={19} />} tone="orange">
                Avoid refreshing or closing the browser during the quiz. You can pause the timer, but you cannot revisit previous questions.
              </InstructionItem>

              <InstructionItem icon={<Eye size={19} />} tone="blue">
                Your result will be shown after completing all questions.
              </InstructionItem>
            </ul>

            <div className="quiz-instructions-note">
              <ShieldAlert size={17} />
              <span>Find a quiet moment and make sure you’re ready before starting.</span>
            </div>

            <div className="quiz-instructions-actions">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="quiz-start-button"
                disabled={questionCount === 0}
              >
                Start quiz <ArrowUpRight size={17} />
              </button>
            </div>
          </>
        )}
      </section>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="quiz-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setShowModal(false);
            }}
          >
            <motion.div
              className="quiz-confirm-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="quiz-confirm-title"
              initial={{ scale: 0.94, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 8 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
            >
              <button
                type="button"
                className="quiz-modal-close"
                aria-label="Close confirmation"
                onClick={() => setShowModal(false)}
              >
                <X size={18} />
              </button>

              <span className="quiz-modal-icon">
                <ShieldAlert size={23} />
              </span>
              <span className="quiz-modal-kicker">READY WHEN YOU ARE</span>
              <h2 id="quiz-confirm-title">Start your learning check?</h2>
              <p>
                You have {questionCount} questions with 30 seconds per question. You can pause the timer or skip a question, but you cannot return to a previous one after moving forward.
              </p>
              <div className="quiz-modal-actions">
                <button
                  type="button"
                  className="quiz-modal-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Not yet
                </button>
                <button
                  type="button"
                  className="quiz-modal-confirm"
                  onClick={confirmStart}
                >
                  Start now <ArrowUpRight size={16} />
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
