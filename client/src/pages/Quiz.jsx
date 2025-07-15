import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

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
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [fadeClass, setFadeClass] = useState("opacity-100");

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
    setAutoAdvance(false);

    const countdown = setInterval(() => {
      if (!paused) {
        setTimer((prev) => {
          if (prev === 1) {
            setAutoAdvance(true);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [current, paused]);

  useEffect(() => {
    if (autoAdvance && !showResult) {
      handleNext(true);
    }
  }, [autoAdvance]);

  const handleOptionClick = (option) => {
    setSelected(option);
  };

  const handleNext = async (skip = false) => {
    const correctAnswer = questions[current].answer;
    const isCorrect = !skip && selected === correctAnswer;

    const updatedScore = isCorrect ? score + 1 : score;

    setResponses([
      ...responses,
      {
        question: questions[current].question,
        selected: skip ? null : selected,
        correct: correctAnswer,
      },
    ]);

    setFadeClass("opacity-0");
    setTimeout(async () => {
      if (current + 1 < questions.length) {
        setScore(updatedScore);
        setCurrent(current + 1);
        setSelected(null);
        setFadeClass("opacity-100");
      } else {
        setScore(updatedScore);
        setShowResult(true);

        try {
          await api.post("/quiz/submit", {
            userId: user._id,
            roadmapId,
            score: updatedScore,
            total: questions.length,
          });
        } catch (err) {
          console.error("Error saving quiz result", err);
        }
      }
    }, 300);
  };

  if (questions.length === 0) return <div className="p-6">Loading questions...</div>;

  const q = questions[current];
  const timerPercent = (timer / 30) * 100;
  const timerColor = timer <= 10 ? "bg-red-500" : "bg-green-500";

  if (showReview) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">📝 Review Your Answers</h2>
        {responses.map((res, idx) => (
          <div key={idx} className="p-4 border rounded bg-gray-50">
            <h3 className="font-semibold">{idx + 1}. {res.question}</h3>
            <p>
              Your Answer:{" "}
              <span className={res.selected === res.correct ? "text-green-600" : "text-red-600"}>
                {res.selected ?? "Skipped"}
              </span>
            </p>
            <p className="text-sm text-gray-700">
              Correct Answer: <span className="text-green-700">{res.correct}</span>
            </p>
          </div>
        ))}
        <div className="text-center mt-6">
          <button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Quiz Completed!</h2>
        <p className="text-lg mb-4">
          Your Score: {score} / {questions.length}
        </p>
        <button
          onClick={() => setShowReview(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Review Answers
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 transition-opacity duration-500 ease-in-out" style={{ opacity: fadeClass === "opacity-100" ? 1 : 0 }}>
      {/* Timer Bar */}
      <div className="flex justify-between items-center mb-2">
        <div className="w-full bg-gray-300 h-2 rounded mr-2">
          <div
            className={`${timerColor} h-2 rounded transition-all duration-500`}
            style={{ width: `${timerPercent}%` }}
          ></div>
        </div>
        <button
          onClick={() => setPaused(!paused)}
          className={`text-sm px-2 py-1 rounded ${paused ? "bg-green-600 text-white" : "bg-yellow-500 text-black"}`}
        >
          {paused ? "▶ Resume" : "⏸ Pause"}
        </button>
      </div>

      <h2 className="text-xl font-bold mb-2">
        Question {current + 1} of {questions.length}
      </h2>
      <p className="text-sm text-gray-500 mb-2">⏱ Time Left: <span className="font-bold">{timer}s</span></p>
      <p className="mb-4 font-semibold">{q.question}</p>

      <div className="space-y-2">
        {q.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(option)}
            className={`block w-full text-left px-4 py-2 rounded border ${selected === option
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
              }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-between gap-4">
        <button
          onClick={() => handleNext(true)}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
        >
          Skip
        </button>
        <button
          onClick={() => handleNext(false)}
          disabled={!selected}
          className={`px-4 py-2 rounded ${selected
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
        >
          {current + 1 < questions.length ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
