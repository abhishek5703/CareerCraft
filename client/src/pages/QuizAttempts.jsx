import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { BarChart3, CalendarDays, TrendingUp } from "lucide-react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import api from "../services/api";

const getFeedback = (percentage) => {
  if (percentage >= 90) return "Excellent performance!";
  if (percentage >= 70) return "Good job, keep it up!";
  if (percentage >= 50) return "A solid start. Keep practising.";
  return "Revisit the topics and give it another try.";
};

const QuizAttempts = () => {
  const { roadmapId } = useParams();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const fetchAttempts = async () => {
      try {
        const response = await api.get(`/quiz/${roadmapId}/attempts`, { signal: controller.signal });
        setAttempts(Array.isArray(response.data) ? response.data : []);
        setError("");
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.response?.data?.message || "Unable to load quiz history right now.");
          console.error("Error fetching attempts:", requestError.response?.data || requestError.message);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchAttempts();
    return () => controller.abort();
  }, [roadmapId]);

  const chartData = useMemo(() => [...attempts]
    .sort((first, second) => new Date(first.attemptedAt) - new Date(second.attemptedAt))
    .map((attempt, index) => ({
      name: `Attempt ${index + 1}`,
      score: attempt.total ? Number(((attempt.score / attempt.total) * 100).toFixed(1)) : 0,
    })), [attempts]);

  return (
    <div className="quiz-attempts-page">
      <div className="quiz-page-heading"><span className="section-kicker"><BarChart3 size={14} /> YOUR LEARNING HISTORY</span><h1>Quiz performance</h1><p>See how your understanding develops with every attempt.</p></div>

      {loading ? (
        <div className="quiz-attempt-skeletons">{[1, 2, 3].map((item) => <div className="quiz-attempt-skeleton" key={item} />)}</div>
      ) : error ? (
        <div className="quiz-state-card"><h2>History unavailable</h2><p>{error}</p><button type="button" className="btn-primary" onClick={() => window.location.reload()}>Try again</button></div>
      ) : attempts.length === 0 ? (
        <div className="quiz-state-card"><span className="quiz-result-icon"><TrendingUp size={22} /></span><h2>Your first attempt is waiting.</h2><p>You haven’t taken this quiz yet. Start when you’re ready and your results will show up here.</p></div>
      ) : (
        <>
          <section className="quiz-chart-card">
            <div className="quiz-chart-heading"><div><span className="section-kicker">PERFORMANCE OVER TIME</span><h2>Progress overview</h2></div><span className="quiz-attempt-total">{attempts.length} {attempts.length === 1 ? "attempt" : "attempts"}</span></div>
            <ResponsiveContainer width="100%" height={270}>
              <LineChart data={chartData} margin={{ top: 12, right: 18, left: -14, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#edf0f6" />
                <XAxis dataKey="name" tick={{ fill: "#8a95aa", fontSize: 10 }} axisLine={{ stroke: "#e8ebf3" }} tickLine={false} />
                <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} tick={{ fill: "#8a95aa", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(value) => [`${value}%`, "Score"]} contentStyle={{ border: "1px solid #e9ecf4", borderRadius: 10, boxShadow: "0 10px 25px rgba(35,49,88,.1)" }} />
                <Line type="monotone" dataKey="score" stroke="#6573e8" strokeWidth={3} dot={{ r: 4, fill: "#6573e8", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </section>

          <div className="quiz-attempt-list-heading"><h2>Previous attempts</h2><span>Most recent first</span></div>
          <ul className="quiz-attempt-list">
            {[...attempts].reverse().map((attempt, index) => {
              const percentage = attempt.total ? (attempt.score / attempt.total) * 100 : 0;
              return (
                <li key={attempt._id || `${attempt.attemptedAt}-${index}`} className="quiz-attempt-item">
                  <div className="quiz-attempt-score"><strong className={percentage >= 70 ? "score-good" : "score-review"}>{Math.round(percentage)}%</strong><span>{attempt.score} / {attempt.total} correct</span></div>
                  <div className="quiz-attempt-details"><strong>{getFeedback(percentage)}</strong><span><CalendarDays size={14} /> {new Date(attempt.attemptedAt).toLocaleString()}</span></div>
                  <div className="quiz-attempt-progress"><span style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }} /></div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default QuizAttempts;