import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";

const Dashboard = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progressLoaded, setProgressLoaded] = useState(false); // ✅ new state
  const { user } = useAuth();
  const { progressMap, updateProgress } = useProgress();

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // ✅ Step 1: Get all roadmaps
        const roadmapRes = await api.get("/roadmaps");
        setRoadmaps(roadmapRes.data);

        // ✅ Step 2: Get user progress from backend
        const progressRes = await api.get(`/progress/user/${user._id}/roadmaps`);
        const progressData = progressRes.data;

        // ✅ Step 3: Update progressMap using context
        progressData.forEach((rp) => {
          updateProgress(
            rp.roadmapId,
            rp.completedSteps || [],
            rp.totalSteps || 1
          );
        });

        // ✅ Trigger re-render after context is updated
        setProgressLoaded(true);
      } catch (err) {
        console.error("Error loading dashboard", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user) return <div className="text-center mt-10">Loading user...</div>;
  if (loading || !progressLoaded)
    return <div className="text-center mt-10">Loading roadmaps...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Explore Career Roadmaps</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {roadmaps.map((roadmap) => {
          const progress = progressMap[roadmap._id] || { completed: 0, total: 1 };
          const { completed, total } = progress;
          const percentage = Math.round((completed / total) * 100);

          return (
            <div
              key={roadmap._id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <Link to={`/roadmap/${roadmap._id}`}>
                <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                  {roadmap.title}
                </h2>
              </Link>
              <p className="text-gray-600 mt-2">{roadmap.description}</p>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded h-3">
                  <div
                    className="bg-green-500 h-3 rounded"
                    style={{ width: `${percentage}%`, transition: "width 0.4s ease" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {completed} of {total} steps completed ({percentage}%)
                </p>
              </div>

              <Link
                to={`/roadmap/${roadmap._id}`}
                className="inline-block mt-3 px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Roadmap
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
