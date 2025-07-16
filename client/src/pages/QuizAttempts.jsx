import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarChart3, CalendarDays } from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../services/api";

const getFeedback = (percentage) => {
  if (percentage >= 90) return "🌟 Excellent performance!";
  if (percentage >= 70) return "✅ Good job, keep it up!";
  if (percentage >= 50) return "🛠 Needs improvement.";
  return "📚 Consider revisiting the topics.";
};

const QuizAttempts = () => {
  const { roadmapId } = useParams();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const res = await api.get(`/quiz/${roadmapId}/attempts`);
        setAttempts(res.data);
      } catch (err) {
        console.error("Error fetching attempts:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttempts();
  }, [roadmapId]);

  const chartData = [...attempts]
    .sort((a, b) => new Date(a.attemptedAt) - new Date(b.attemptedAt))
    .map((attempt, idx) => ({
      name: `Attempt ${idx + 1}`,
      score: ((attempt.score / attempt.total) * 100).toFixed(2),
    }));


  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <BarChart3 className="w-7 h-7 text-indigo-600" />
        Your Quiz Attempts
      </h2>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="bg-gray-100 rounded-lg p-6 shadow-sm">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
              <div className="h-3 bg-gray-300 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : attempts.length === 0 ? (
        <div className="bg-gray-50 text-center rounded-lg p-6 border">
          <p className="text-gray-600 text-lg">You haven't attempted this quiz yet.</p>
        </div>
      ) : (
        <>
          {/* Graph */}
          <div className="bg-white p-6 rounded-xl border shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">📈 Progress Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData} margin={{ top: 10, right: 30, bottom: 0, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Line type="monotone" dataKey="score" stroke="#6366F1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Attempt List */}
          <ul className="space-y-5">
            {attempts.map((attempt, idx) => {
              const percentage = (attempt.score / attempt.total) * 100;
              const scoreColor = percentage >= 70 ? "text-green-600" : "text-red-600";
              const feedback = getFeedback(percentage);

              return (
                <li
                  key={idx}
                  className="bg-white border shadow-md rounded-xl p-5 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className={`text-xl font-semibold ${scoreColor}`}>
                      Score: {attempt.score} / {attempt.total}
                    </p>
                    <span className="text-sm text-gray-500">{Math.round(percentage)}%</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 gap-2 mb-2">
                    <CalendarDays className="w-4 h-4" />
                    <span>{new Date(attempt.attemptedAt).toLocaleString()}</span>
                  </div>

                  <p className="text-sm mt-2 text-gray-700 italic">{feedback}</p>
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
