import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

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

  if (loading) return <div className="p-6">Loading attempts...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Your Past Attempts</h2>
      {attempts.length === 0 ? (
        <p className="text-gray-600">No past attempts found.</p>
      ) : (
        <ul className="space-y-4">
          {attempts.map((attempt, idx) => (
            <li key={idx} className="border rounded p-4 bg-white shadow-sm">
              <p className="font-semibold">
                Score: {attempt.score} / {attempt.total}
              </p>
              <p className="text-sm text-gray-600">
                Taken on: {new Date(attempt.attemptedAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizAttempts;
