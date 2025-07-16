import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get(`/quiz/${roadmapId}`);
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching quiz", err);
      }
    };
    fetchQuestions();
  }, [roadmapId]);

  useEffect(() => {
    if (showResult || paused) return;

    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleNext(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [current, paused]);

  const handleOptionClick = (option) => setSelected(option);

  const handleNext = async (skip = false) => {
    const q = questions[current];
    const correct = q.answer;
    const isCorrect = !skip && selected === correct;

    setResponses([
      ...responses,
      {
        question: q.question,
        selected: skip ? null : selected,
        correct,
      },
    ]);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
      setScore(isCorrect ? score + 1 : score);
    } else {
      setScore(isCorrect ? score + 1 : score);
      setShowResult(true);
      try {
        await api.post("/quiz/submit", {
          userId: user._id,
          roadmapId,
          score: isCorrect ? score + 1 : score,
          total: questions.length,
        });
      } catch (err) {
        console.error("Error saving quiz result", err);
      }
    }
  };

  const timerColor = timer <= 10 ? "bg-red-500" : "bg-green-500";
  const timerPercent = (timer / 30) * 100;
  const currentQuestion = questions[current];

  if (questions.length === 0) return <div className="p-6 text-center">Loading questions...</div>;

  if (showReview) {
    return (
      <div className="fixed inset-0 bg-white overflow-y-auto p-6 space-y-4 z-50">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">📝 Review Your Answers</h2>
        {responses.map((res, idx) => (
          <div key={idx} className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-semibold text-gray-800">{idx + 1}. {res.question}</h3>
            <p className="mt-1">
              Your Answer: <span className={res.selected === res.correct ? "text-green-600" : "text-red-600"}>{res.selected ?? "Skipped"}</span>
            </p>
            <p className="text-sm text-gray-700">
              Correct Answer: <span className="text-green-700">{res.correct}</span>
            </p>
          </div>
        ))}
        <div className="text-center mt-6">
          <button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm">
            🔁 Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-8 text-center z-50">
        <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Quiz Completed!</h2>
        <p className="text-xl mb-6 font-medium">
          Your Score: <span className="text-blue-700">{score} / {questions.length}</span>
        </p>
        <button
          onClick={() => setShowReview(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Review Answers
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center p-6 z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="max-w-xl w-full"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-2 bg-gray-200 rounded">
              <div
                className={`h-2 rounded ${timerColor} transition-all duration-500`}
                style={{ width: `${timerPercent}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-700 font-medium">{timer}s</span>
            <button
              onClick={() => setPaused(!paused)}
              className={`ml-2 text-xs px-2 py-1 rounded-full font-medium ${paused ? "bg-green-600 text-white" : "bg-yellow-500 text-black"}`}
            >
              {paused ? "▶ Resume" : "⏸ Pause"}
            </button>
          </div>

          <div className="mb-2 text-gray-800 font-semibold">
            Question {current + 1} of {questions.length}
          </div>

          <h3 className="mb-4 font-bold text-lg text-gray-900">{currentQuestion.question}</h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                className={`block w-full text-left px-4 py-2 border rounded-lg transition font-medium ${
                  selected === option
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "hover:bg-gray-100 bg-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-between gap-4">
            <button
              onClick={() => handleNext(true)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              ⏭ Skip
            </button>
            <button
              onClick={() => handleNext(false)}
              disabled={!selected}
              className={`px-5 py-2 rounded-lg font-semibold transition ${
                selected
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              {current + 1 < questions.length ? "Next" : "Submit"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
