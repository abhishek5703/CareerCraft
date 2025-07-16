import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const getStatusColor = (percentage) => {
  if (percentage >= 75) return "bg-green-500";
  if (percentage >= 40) return "bg-yellow-400";
  return "bg-red-400";
};

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

  if (!user) return <div className="text-center mt-10 text-gray-600">Loading user...</div>;
  if (loading || !progressLoaded)
    return <div className="text-center mt-10 text-gray-600">Loading roadmaps...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-600 mb-4"
      >
        Your Career Toolkit
      </motion.h1>
      <p className="text-center text-gray-600 max-w-xl mx-auto text-lg mb-12">
        Select a roadmap to begin your journey — track your growth, learn continuously, and build a standout career.
      </p>

      {/* Roadmap Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {roadmaps.map((roadmap, index) => {
          const progress = progressMap[roadmap._id] || { completed: 0, total: 1 };
          const { completed, total } = progress;
          const percentage = Math.round((completed / total) * 100);
          const imageUrl = roadmap.image ? `/${roadmap.image}` : "/default.jpg";
          const statusColor = getStatusColor(percentage);

          return (
            <motion.div
              key={roadmap._id}
              className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              custom={index}
            >
              {/* Image */}
              <img
                src={imageUrl}
                alt={roadmap.title}
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Content */}
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-blue-700 group-hover:underline">
                    {roadmap.title}
                  </h2>
                  <span className="text-xs bg-blue-100 text-blue-600 font-medium px-2 py-0.5 rounded-full shadow-sm">
                    {roadmap.category}
                  </span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {roadmap.description}
                </p>

                {/* Progress Bar */}
                <div>
                  <div className="w-full h-3 bg-gray-200 rounded-full">
                    <div
                      className={`${statusColor} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {completed} of {total} steps completed ({percentage}%)
                  </p>
                </div>

                {/* CTA */}
                <Link
                  to={`/roadmap/${roadmap._id}`}
                  className="mt-2 inline-block text-center bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  View Roadmap
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
