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
  if (percentage >= 90) return "Excellent performance!";
  if (percentage >= 70) return "Good job, keep it up!";
  if (percentage >= 50) return "Needs improvement.";
  return "Consider revisiting the topics.";
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
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-extrabold mb-6 flex items-center gap-3 text-indigo-700">
        <BarChart3 className="w-7 h-7" />
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
        <div className="text-center rounded-lg p-6 border border-dashed border-gray-300 bg-gray-50">
          <p className="text-gray-600 text-lg">You haven't attempted this quiz yet.</p>
        </div>
      ) : (
        <>
          {/* Chart Section */}
          <div className="border border-gray-200 rounded-2xl shadow-sm p-6 mb-8 bg-white">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              📈 Progress Overview
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Line type="monotone" dataKey="score" stroke="#6366F1" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Attempts List */}
          <ul className="space-y-5">
            {attempts.map((attempt, idx) => {
              const percentage = (attempt.score / attempt.total) * 100;
              const scoreColor = percentage >= 70 ? "text-green-600" : "text-red-500";
              const feedback = getFeedback(percentage);

              return (
                <li
                  key={idx}
                  className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all bg-white"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className={`text-xl font-semibold ${scoreColor}`}>
                      Score: {attempt.score} / {attempt.total}
                    </p>
                    <span className="text-sm text-gray-500 font-medium">
                      {Math.round(percentage)}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <CalendarDays className="w-4 h-4" />
                    <span>{new Date(attempt.attemptedAt).toLocaleString()}</span>
                  </div>

                  <p className="text-sm italic text-gray-700 mt-2">{feedback}</p>
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
