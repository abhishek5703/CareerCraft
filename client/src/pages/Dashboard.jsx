import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";

const Dashboard = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const { user } = useAuth();
  const { progressMap, updateProgress } = useProgress();

  useEffect(() => {
  if (!user) return;

  const fetchData = async () => {
    try {
      const roadmapRes = await api.get("/roadmaps");
      setRoadmaps(roadmapRes.data);
      

      const progressRes = await api.get(`/progress/user/${user._id}/roadmaps`);
      const progressData = progressRes.data;

      progressData.forEach((rp) => {
        updateProgress(rp.roadmapId, rp.completedSteps || [], rp.totalSteps || 1);
      });

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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Explore Career Roadmaps</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmaps.map((roadmap) => {
          const progress = progressMap[roadmap._id] || { completed: 0, total: 1 };
          const { completed, total } = progress;
          const percentage = Math.round((completed / total) * 100);
          const imageUrl = roadmap.image ? `/${roadmap.image}` : "/default.jpg";

          return (
            <div
              key={roadmap._id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-md transition bg-white"
            >
              {/* Roadmap Image */}
              <img
                src={imageUrl}
                alt={roadmap.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
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
                      style={{
                        width: `${percentage}%`,
                        transition: "width 0.4s ease",
                      }}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
