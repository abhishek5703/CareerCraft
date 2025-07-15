import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const QuizResults = () => {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const resultRes = await api.get(`/quiz/results/${user._id}`);
        console.log("✅ Results Response:", resultRes.data);
        setResults(resultRes.data);
      } catch (err) {
        console.error("❌ Error fetching quiz data:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchResults();
    }
  }, [user]);

  if (loading) return <div className="p-6">Loading results...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">🏅 Your Quiz Results</h2>

      {results.length === 0 ? (
        <p className="text-gray-600">No quiz results found.</p>
      ) : (
        <ul className="space-y-6">
          {results.map((res) => (
            <li key={res._id} className="p-5 border rounded shadow bg-white">
              <h3 className="font-semibold text-lg mb-1">
                {res.roadmapId?.title || "Unknown Roadmap"}
              </h3>
              <p className="text-gray-800">
                Score:{" "}
                <span
                  className={`font-semibold ${
                    res.score / res.total >= 0.7
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {res.score}
                </span>{" "}
                / {res.total}
              </p>
              <p className="text-sm text-gray-500">
                Taken on: {new Date(res.createdAt || res.date).toLocaleString()}
              </p>

              {res.sectionScores?.length > 0 && (
                <div className="mt-3">
                  <p className="font-medium mb-1">📘 Section Breakdown:</p>
                  <ul className="ml-4 list-disc text-sm text-gray-700 space-y-1">
                    {res.sectionScores.map((sec, idx) => (
                      <li key={idx}>
                        <span className="font-medium">{capitalize(sec.section)}</span>:{" "}
                        {sec.correct} / {sec.total}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizResults;
