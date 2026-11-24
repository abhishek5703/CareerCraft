import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Trophy,
  TrendingUp,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import api from "../services/api";
import "./QuizAttempts.css";

const getPercentage = (attempt) => {
  const total = Number(attempt?.total) || 0;
  const score = Number(attempt?.score) || 0;
  return total > 0 ? Math.min(100, Math.max(0, (score / total) * 100)) : 0;
};

const getFeedback = (percentage) => {
  if (percentage >= 90) return "Excellent performance! You really know your stuff.";
  if (percentage >= 70) return "Good job. Keep building on this progress.";
  if (percentage >= 50) return "A solid start. A little more practice will help.";
  return "Revisit the topics and give it another try.";
};

const formatAttemptDate = (date) => {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "Date unavailable";

  return parsedDate.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const QuizAttempts = () => {
  const { roadmapId } = useParams();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAttempts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get(`/quiz/${roadmapId}/attempts`, {
          signal: controller.signal,
        });

        if (!controller.signal.aborted) {
          setAttempts(Array.isArray(response.data) ? response.data : []);
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(
            requestError.response?.data?.message ||
              "Unable to load quiz history right now. Please try again."
          );
          console.error(
            "Error fetching attempts:",
            requestError.response?.data || requestError.message
          );
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchAttempts();
    return () => controller.abort();
  }, [roadmapId, retryKey]);

  const chronologicalAttempts = useMemo(
    () =>
      [...attempts].sort(
        (first, second) =>
          new Date(first.attemptedAt).getTime() -
          new Date(second.attemptedAt).getTime()
      ),
    [attempts]
  );

  const chartData = useMemo(
    () =>
      chronologicalAttempts.map((attempt, index) => ({
        name: `Attempt ${index + 1}`,
        score: Number(getPercentage(attempt).toFixed(1)),
      })),
    [chronologicalAttempts]
  );

  const summary = useMemo(() => {
    if (attempts.length === 0) {
      return { best: 0, average: 0, total: 0 };
    }

    const percentages = attempts.map(getPercentage);
    const best = Math.max(...percentages);
    const average = percentages.reduce((sum, value) => sum + value, 0) / percentages.length;

    return {
      best: Math.round(best),
      average: Math.round(average),
      total: attempts.length,
    };
  }, [attempts]);

  return (
    <div className="quiz-attempts-page">
      <div className="quiz-attempts-decoration" aria-hidden="true" />

      <Link to={`/roadmap/${roadmapId}`} className="quiz-history-back-link">
        <ArrowLeft size={15} /> Back to roadmap
      </Link>

      <header className="quiz-page-heading">
        <span className="quiz-history-kicker">
          <BarChart3 size={14} /> YOUR LEARNING HISTORY
        </span>
        <h1>Quiz performance</h1>
        <p>See how your understanding develops with every attempt.</p>
      </header>

      {loading ? (
        <div className="quiz-attempt-skeletons" aria-label="Loading quiz history">
          <div className="quiz-attempt-skeleton quiz-attempt-skeleton-large" />
          <div className="quiz-attempt-skeleton" />
          <div className="quiz-attempt-skeleton" />
        </div>
      ) : error ? (
        <section className="quiz-state-card" role="alert">
          <span className="quiz-state-icon error"><TrendingUp size={22} /></span>
          <h2>History unavailable</h2>
          <p>{error}</p>
          <button
            type="button"
            className="quiz-history-primary-button"
            onClick={() => setRetryKey((current) => current + 1)}
          >
            Try again <ArrowUpRight size={16} />
          </button>
        </section>
      ) : attempts.length === 0 ? (
        <section className="quiz-state-card">
          <span className="quiz-state-icon"><TrendingUp size={22} /></span>
          <h2>Your first attempt is waiting.</h2>
          <p>
            You haven’t taken this quiz yet. Start when you’re ready and your results will show up here.
          </p>
          <Link
            to={`/quiz/${roadmapId}/instructions`}
            className="quiz-history-primary-button"
          >
            Start quiz <ArrowUpRight size={16} />
          </Link>
        </section>
      ) : (
        <>
          <section className="quiz-history-stats" aria-label="Quiz history summary">
            <article className="quiz-history-stat-card">
              <span className="quiz-history-stat-icon blue"><BarChart3 size={19} /></span>
              <div>
                <span>Total attempts</span>
                <strong>{summary.total}</strong>
              </div>
            </article>
            <article className="quiz-history-stat-card">
              <span className="quiz-history-stat-icon violet"><Trophy size={19} /></span>
              <div>
                <span>Best score</span>
                <strong>{summary.best}%</strong>
              </div>
            </article>
            <article className="quiz-history-stat-card">
              <span className="quiz-history-stat-icon green"><TrendingUp size={19} /></span>
              <div>
                <span>Average score</span>
                <strong>{summary.average}%</strong>
              </div>
            </article>
          </section>

          <section className="quiz-chart-card">
            <div className="quiz-chart-heading">
              <div>
                <span className="quiz-history-kicker">PERFORMANCE OVER TIME</span>
                <h2>Progress overview</h2>
                <p>Your score across each completed attempt.</p>
              </div>
              <span className="quiz-attempt-total">
                {attempts.length} {attempts.length === 1 ? "attempt" : "attempts"}
              </span>
            </div>

            <div className="quiz-chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 14, right: 18, left: -12, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="4 5" stroke="#edf0f6" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#8994aa", fontSize: 11 }}
                    axisLine={{ stroke: "#e8ebf3" }}
                    tickLine={false}
                    dy={9}
                  />
                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fill: "#8994aa", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    width={43}
                  />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Score"]}
                    contentStyle={{
                      border: "1px solid #e7eaf3",
                      borderRadius: 12,
                      boxShadow: "0 12px 30px rgba(35,49,88,.12)",
                      fontSize: 12,
                    }}
                    labelStyle={{ color: "#53617f", fontWeight: 700, marginBottom: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    name="Score"
                    stroke="#6475e8"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#6475e8", strokeWidth: 3, stroke: "#fff" }}
                    activeDot={{ r: 7, stroke: "#fff", strokeWidth: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <div className="quiz-attempt-list-heading">
            <div>
              <h2>Previous attempts</h2>
              <p>Review your scores and keep improving.</p>
            </div>
            <span>Most recent first</span>
          </div>

          <ul className="quiz-attempt-list">
            {[...attempts]
              .sort(
                (first, second) =>
                  new Date(second.attemptedAt).getTime() -
                  new Date(first.attemptedAt).getTime()
              )
              .map((attempt, index) => {
                const percentage = getPercentage(attempt);
                const roundedPercentage = Math.round(percentage);

                return (
                  <li
                    key={attempt._id || `${attempt.attemptedAt}-${index}`}
                    className="quiz-attempt-item"
                  >
                    <div className="quiz-attempt-score-block">
                      <strong className={percentage >= 70 ? "score-good" : "score-review"}>
                        {roundedPercentage}%
                      </strong>
                      <span>{attempt.score} / {attempt.total} correct</span>
                    </div>

                    <div className="quiz-attempt-details">
                      <strong>{getFeedback(percentage)}</strong>
                      <span>
                        <CalendarDays size={14} />
                        {formatAttemptDate(attempt.attemptedAt)}
                      </span>
                    </div>

                    <div
                      className="quiz-attempt-progress"
                      role="progressbar"
                      aria-label={`Attempt score ${roundedPercentage}%`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={roundedPercentage}
                    >
                      <span style={{ width: `${percentage}%` }} />
                    </div>
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
