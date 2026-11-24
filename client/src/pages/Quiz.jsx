import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./Quiz.css";

const QUESTION_SECONDS = 30;

const Quiz = () => {
  const { roadmapId } = useParams();
  const { user } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [responses, setResponses] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [timer, setTimer] = useState(QUESTION_SECONDS);
  const [paused, setPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [retryKey, setRetryKey] = useState(0);
  const handleNextRef = useRef(null);
  // Declare before effects that read it (prevents a temporal-dead-zone runtime error).
  const currentQuestion = questions[current];

  useEffect(() => {
    const controller = new AbortController();

    const fetchQuestions = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const response = await api.get(`/quiz/${roadmapId}`, {
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;
        setQuestions(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadError(
            error.response?.data?.message ||
              "Unable to load quiz questions. Please try again."
          );
          console.error("Error fetching quiz", error);
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchQuestions();
    return () => controller.abort();
  }, [roadmapId, retryKey]);

  const handleNext = useCallback(
    async (skip = false) => {
      const question = questions[current];
      if (!question || showResult || isSubmitting) return;

      const correct = question.answer;
      const isCorrect = !skip && selected === correct;
      const nextScore = score + (isCorrect ? 1 : 0);

      setResponses((previous) => [
        ...previous,
        {
          question: question.question,
          selected: skip ? null : selected,
          correct,
        },
      ]);

      if (current + 1 < questions.length) {
        setCurrent((previous) => previous + 1);
        setSelected(null);
        setScore(nextScore);
        setTimer(QUESTION_SECONDS);
        return;
      }

      setScore(nextScore);
      setShowResult(true);
      setIsSubmitting(true);

      try {
        await api.post("/quiz/submit", {
          userId: user?._id,
          roadmapId,
          score: nextScore,
          total: questions.length,
        });
      } catch (error) {
        console.error("Error saving quiz result", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      questions,
      current,
      selected,
      score,
      showResult,
      isSubmitting,
      user?._id,
      roadmapId,
    ]
  );

  handleNextRef.current = handleNext;

  useEffect(() => {
    if (showResult || paused || questions.length === 0 || isLoading || !currentQuestion) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setTimer((previous) => Math.max(previous - 1, 0));
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, [current, currentQuestion, timer, paused, showResult, questions.length, isLoading]);

  useEffect(() => {
    if (timer === 0 && !paused && !showResult && currentQuestion) {
      handleNextRef.current?.(true);
    }
  }, [timer, paused, showResult, current, currentQuestion]);

  const retakeQuiz = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setResponses([]);
    setShowResult(false);
    setShowReview(false);
    setTimer(QUESTION_SECONDS);
    setPaused(false);
  };

  const timerPercent = (timer / QUESTION_SECONDS) * 100;
  const timerState = timer <= 5 ? "urgent" : timer <= 15 ? "warning" : "normal";
  const questionProgress = questions.length
    ? ((current + 1) / questions.length) * 100
    : 0;

  if (isLoading) {
    return (
      <div className="quiz-page quiz-page-state">
        <div className="quiz-state-card" role="status">
          <span className="quiz-loading-spinner" />
          <h2>Preparing your quiz</h2>
          <p>Getting your questions ready. You’ll be starting in a moment.</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="quiz-page quiz-page-state">
        <div className="quiz-state-card" role="alert">
          <span className="quiz-state-icon is-error">!</span>
          <span className="quiz-eyebrow">QUIZ UNAVAILABLE</span>
          <h2>We couldn’t load your questions.</h2>
          <p>{loadError}</p>
          <div className="quiz-state-actions">
            <button
              type="button"
              className="quiz-button quiz-button-primary"
              onClick={() => setRetryKey((previous) => previous + 1)}
            >
              <RotateCcw size={16} /> Try again
            </button>
            <Link to={`/roadmap/${roadmapId}`} className="quiz-button quiz-button-secondary">
              <ArrowLeft size={16} /> Back to roadmap
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="quiz-page quiz-page-state">
        <div className="quiz-state-card">
          <span className="quiz-state-icon"><Clock3 size={23} /></span>
          <span className="quiz-eyebrow">COMING SOON</span>
          <h2>No questions are available yet.</h2>
          <p>This learning path doesn’t have a quiz prepared at the moment. Please check back later.</p>
          <Link to={`/roadmap/${roadmapId}`} className="quiz-button quiz-button-primary">
            <ArrowLeft size={16} /> Back to roadmap
          </Link>
        </div>
      </div>
    );
  }

  if (showReview) {
    return (
      <div className="quiz-page quiz-page-review">
        <div className="quiz-review-shell">
          <div className="quiz-review-heading">
            <span className="quiz-eyebrow"><CheckCircle2 size={14} /> YOUR LEARNING CHECK-IN</span>
            <h1>Review your answers</h1>
            <p>Revisit each question and compare your response with the correct answer.</p>
            <div className="quiz-review-summary">
              <span><strong>{score}</strong> correct</span>
              <span><strong>{questions.length - score}</strong> to revisit</span>
              <span><strong>{questions.length}</strong> questions</span>
            </div>
          </div>

          <div className="quiz-review-list">
            {responses.map((response, index) => {
              const isCorrect = response.selected === response.correct;
              return (
                <article
                  key={`${index}-${response.question}`}
                  className={`quiz-review-item ${isCorrect ? "is-correct" : "is-incorrect"}`}
                >
                  <div className="quiz-review-item-top">
                    <span>QUESTION {String(index + 1).padStart(2, "0")}</span>
                    <span className="quiz-review-status">
                      {isCorrect ? <CheckCircle2 size={14} /> : "REVISIT"}
                      {isCorrect ? "Correct" : "Review"}
                    </span>
                  </div>
                  <h3>{response.question}</h3>
                  <p>
                    Your answer
                    <strong className={isCorrect ? "answer-correct" : "answer-incorrect"}>
                      {response.selected ?? "Skipped"}
                    </strong>
                  </p>
                  <p>
                    Correct answer
                    <strong className="answer-correct">{response.correct}</strong>
                  </p>
                </article>
              );
            })}
          </div>

          <div className="quiz-review-actions">
            <button type="button" onClick={retakeQuiz} className="quiz-button quiz-button-primary">
              <RotateCcw size={16} /> Retake quiz
            </button>
            <Link to={`/quiz/${roadmapId}/attempts`} className="quiz-button quiz-button-secondary">
              View quiz history <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="quiz-page quiz-page-result">
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="quiz-result-card"
        >
          <div className="quiz-result-decoration" aria-hidden="true" />
          <span className="quiz-result-icon"><Trophy size={30} /></span>
          <span className="quiz-eyebrow"><Sparkles size={14} /> QUIZ COMPLETE</span>
          <h1>{percentage >= 80 ? "Excellent work!" : percentage >= 50 ? "Good progress. Keep going!" : "Every attempt is progress."}</h1>
          <p className="quiz-result-intro">You’ve completed this learning check.</p>
          <div className="quiz-result-score-wrap">
            <strong className="quiz-final-score">{score}<span> / {questions.length}</span></strong>
            <span className="quiz-result-percent">{percentage}% score</span>
          </div>
          <div className="quiz-result-track"><span style={{ width: `${percentage}%` }} /></div>
          <p className="quiz-result-message">Every attempt is a chance to strengthen what you know. Review your answers and keep building momentum.</p>
          <div className="quiz-result-actions">
            <button type="button" onClick={() => setShowReview(true)} className="quiz-button quiz-button-primary">
              Review your answers <ArrowRight size={16} />
            </button>
            <button type="button" onClick={retakeQuiz} className="quiz-button quiz-button-secondary">
              <RotateCcw size={16} /> Retake quiz
            </button>
          </div>
          <Link to={`/quiz/${roadmapId}/attempts`} className="quiz-result-history-link">
            View your quiz history
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const options = Array.isArray(currentQuestion.options) ? currentQuestion.options : [];

  return (
    <div className="quiz-page quiz-page-active">
      <div className="quiz-page-orb quiz-page-orb-one" aria-hidden="true" />
      <div className="quiz-page-orb quiz-page-orb-two" aria-hidden="true" />

      <div className="quiz-active-shell">
        <div className="quiz-active-nav">
          <Link to={`/roadmap/${roadmapId}`} className="quiz-exit-link">
            <ArrowLeft size={15} /> Exit quiz
          </Link>
          <span className="quiz-session-tag"><span /> FOCUSED LEARNING SESSION</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.section
            key={current}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.24 }}
            className="quiz-card"
          >
            <div className="quiz-card-top">
              <div className="quiz-mode-block">
                <span className="quiz-mode-icon"><Sparkles size={16} /></span>
                <span>
                  <strong>Focus mode</strong>
                  <small>Stay present. You’ve got this.</small>
                </span>
              </div>
              <div className="quiz-question-count">
                <span>QUESTION</span>
                <strong>{String(current + 1).padStart(2, "0")}</strong>
                <i>/</i>
                <span>{String(questions.length).padStart(2, "0")}</span>
              </div>
            </div>

            <div className={`quiz-timer-panel is-${timerState}`}>
              <div className="quiz-timer-info">
                <span className="quiz-timer-icon"><Clock3 size={17} /></span>
                <span className="quiz-timer-copy">
                  <small>TIME REMAINING</small>
                  <strong>{String(timer).padStart(2, "0")}<em>s</em></strong>
                </span>
              </div>
              <div
                className="quiz-timer-track"
                role="progressbar"
                aria-label="Time remaining"
                aria-valuemin={0}
                aria-valuemax={QUESTION_SECONDS}
                aria-valuenow={timer}
              >
                <span style={{ width: `${timerPercent}%` }} />
              </div>
              <button
                type="button"
                onClick={() => setPaused((previous) => !previous)}
                className={`quiz-pause-button${paused ? " is-paused" : ""}`}
                aria-label={paused ? "Resume timer" : "Pause timer"}
              >
                {paused ? <Play size={14} /> : <Pause size={14} />}
                {paused ? "Resume" : "Pause"}
              </button>
            </div>

            {paused && (
              <div className="quiz-paused-notice" role="status">
                <Pause size={15} /> Timer paused. Take a breath and resume when you’re ready.
              </div>
            )}

            <div className="quiz-question-progress-row">
              <span>YOUR PROGRESS</span>
              <strong>{Math.round(questionProgress)}% complete</strong>
            </div>
            <div className="quiz-question-progress">
              <span style={{ width: `${questionProgress}%` }} />
            </div>

            <div className="quiz-question-block">
              <span>QUESTION {String(current + 1).padStart(2, "0")}</span>
              <h1>{currentQuestion.question}</h1>
              <p>Choose the best answer from the options below.</p>
            </div>

            <div className="quiz-options" role="group" aria-label="Answer options">
              {options.map((option, index) => (
                <button
                  key={`${current}-${index}`}
                  type="button"
                  onClick={() => setSelected(option)}
                  className={`quiz-option${selected === option ? " is-selected" : ""}`}
                  aria-pressed={selected === option}
                >
                  <span className="quiz-option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="quiz-option-text">{option}</span>
                  <span className="quiz-option-check" aria-hidden="true">
                    {selected === option ? <CheckCircle2 size={19} /> : ""}
                  </span>
                </button>
              ))}
            </div>

            <div className="quiz-controls">
              <span className="quiz-controls-hint">
                {selected ? "Answer selected. Continue when you’re ready." : "Select an answer or skip this question."}
              </span>
              <div className="quiz-controls-actions">
                <button type="button" className="quiz-button quiz-button-secondary" onClick={() => handleNext(true)}>
                  Skip question
                </button>
                <button
                  type="button"
                  className="quiz-button quiz-button-primary"
                  onClick={() => handleNext(false)}
                  disabled={!selected || isSubmitting}
                >
                  {current + 1 < questions.length ? "Next question" : "Submit quiz"}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.section>
        </AnimatePresence>

        <p className="quiz-bottom-note">Your progress is saved when you submit the final question.</p>
      </div>
    </div>
  );
};

export default Quiz;
