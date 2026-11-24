import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

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
  const [timer, setTimer] = useState(30);
  const [paused, setPaused] = useState(false);
  const [loadError, setLoadError] = useState("");
  const handleNextRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchQuestions = async () => {
      try {
        const response = await api.get(`/quiz/${roadmapId}`, { signal: controller.signal });
        setQuestions(Array.isArray(response.data) ? response.data : []);
        setLoadError("");
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadError(error.response?.data?.message || "Unable to load quiz questions. Please try again.");
          console.error("Error fetching quiz", error);
        }
      }
    };
    fetchQuestions();
    return () => controller.abort();
  }, [roadmapId]);

  const handleNext = useCallback(async (skip = false) => {
    const question = questions[current];
    if (!question || showResult) return;

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
    } else {
      setScore(nextScore);
      setShowResult(true);
      try {
        await api.post("/quiz/submit", {
          userId: user?._id,
          roadmapId,
          score: nextScore,
          total: questions.length,
        });
      } catch (error) {
        console.error("Error saving quiz result", error);
      }
    }
  }, [questions, current, selected, score, showResult, user?._id, roadmapId]);

  handleNextRef.current = handleNext;

  useEffect(() => {
    if (showResult || paused || questions.length === 0) return undefined;

    setTimer(30);
    const interval = setInterval(() => {
      setTimer((previous) => {
        if (previous <= 1) {
          clearInterval(interval);
          handleNextRef.current?.(true);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [current, paused, showResult, questions.length]);

  const timerColor = timer > 15 ? "bg-green-500" : timer > 5 ? "bg-yellow-500" : "bg-red-500";
  const timerPercent = (timer / 30) * 100;
  const currentQuestion = questions[current];

  if (loadError) return <div className="quiz-page"><div className="quiz-state-card"><h2>Quiz unavailable</h2><p>{loadError}</p><button type="button" onClick={() => window.location.reload()} className="btn-primary">Try again</button></div></div>;
  if (questions.length === 0) return <div className="quiz-page"><div className="quiz-state-card"><span className="loading-spinner" /><p>Loading your quiz…</p></div></div>;

  if (showReview) {
    return (
      <div className="quiz-page">
        <div className="quiz-review-shell">
          <div className="quiz-page-heading"><span className="section-kicker">YOUR LEARNING CHECK-IN</span><h1>Review your answers</h1><p>Revisit each question and compare your response with the correct answer.</p></div>
          {responses.map((response, index) => (
            <article key={`${index}-${response.question}`} className="quiz-review-item">
              <h3>{index + 1}. {response.question}</h3>
              <p>Your answer: <strong className={response.selected === response.correct ? "answer-correct" : "answer-incorrect"}>{response.selected ?? "Skipped"}</strong></p>
              <p>Correct answer: <strong className="answer-correct">{response.correct}</strong></p>
            </article>
          ))}
          <div className="quiz-review-actions"><button type="button" onClick={() => window.location.reload()} className="btn-primary">Retake quiz</button></div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="quiz-page">
        <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.35 }} className="quiz-result-card">
          <div className="quiz-result-icon">✓</div>
          <span className="section-kicker">QUIZ COMPLETE</span>
          <h1>Nice work. Keep going.</h1>
          <p>Your score</p>
          <strong className="quiz-final-score">{score}<span> / {questions.length}</span></strong>
          <p className="quiz-result-message">Every attempt is a chance to strengthen what you know.</p>
          <button type="button" onClick={() => setShowReview(true)} className="btn-primary">Review your answers</button>
        </motion.div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="quiz-page">
      <AnimatePresence mode="wait">
        <motion.section
          key={current}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.24 }}
          className="quiz-card"
        >
          <div className="quiz-card-top"><span className="section-kicker">FOCUS MODE</span><span className="quiz-question-count">Question {current + 1} <i /> {questions.length}</span></div>
          <div className="quiz-timer-row">
            <div className="quiz-timer-track"><span className={timerColor} style={{ width: `${timerPercent}%` }} /></div>
            <strong className={timer <= 5 ? "timer-urgent" : ""}>{timer}s</strong>
            <button type="button" onClick={() => setPaused((previous) => !previous)} className={`quiz-pause-button${paused ? " is-paused" : ""}`}>{paused ? "Resume" : "Pause"}</button>
          </div>
          {paused && <div className="quiz-paused-notice">Timer paused. Resume when you’re ready.</div>}
          <div className="quiz-question-progress"><span style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div>
          <div className="quiz-question-block"><span>QUESTION {String(current + 1).padStart(2, "0")}</span><h1>{currentQuestion.question}</h1></div>
          <div className="quiz-options">
            {currentQuestion.options.map((option, index) => (
              <button key={`${current}-${index}`} type="button" onClick={() => setSelected(option)} className={`quiz-option${selected === option ? " is-selected" : ""}`}>
                <span className="quiz-option-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span><span className="quiz-option-check">{selected === option ? "✓" : ""}</span>
              </button>
            ))}
          </div>
          <div className="quiz-controls"><button type="button" className="btn-secondary" onClick={() => handleNext(true)}>Skip question</button><button type="button" className="btn-primary" onClick={() => handleNext(false)} disabled={!selected}>{current + 1 < questions.length ? "Next question" : "Submit quiz"}</button></div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
};

export default Quiz;