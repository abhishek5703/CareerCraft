import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const QuizResults = () => {
  const { user } = useAuth();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get(`/quiz/results/${user._id}`);
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching quiz results", err);
      }
    };

    if (user?._id) {
      fetchResults();
    }
  }, [user]);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🏅 Your Quiz Results</h2>

      {results.length === 0 ? (
        <p className="text-gray-600">No quiz attempts found.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((res) => (
            <li key={res._id} className="p-4 border rounded shadow bg-white">
              <h3 className="font-semibold text-lg">
                {res.roadmapId?.title || "Unknown Roadmap"}
              </h3>
              <p className="text-gray-800">
                Total Score:{" "}
                <span className={`font-semibold ${res.score / res.total >= 0.7 ? "text-green-600" : "text-yellow-600"}`}>
                  {res.score}
                </span>{" "}
                / {res.total}
              </p>
              <p className="text-sm text-gray-500">
                Taken on: {new Date(res.date).toLocaleString()}
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
