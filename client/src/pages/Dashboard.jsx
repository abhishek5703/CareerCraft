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
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-[85vh]">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 mb-3"
      >
        Explore Career Roadmaps
      </motion.h1>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
        Choose your path and track your progress with structured step-by-step roadmaps designed for future-ready careers.
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {roadmaps.map((roadmap, index) => {
          const progress = progressMap[roadmap._id] || { completed: 0, total: 1 };
          const { completed, total } = progress;
          const percentage = Math.round((completed / total) * 100);
          const imageUrl = roadmap.image ? `/${roadmap.image}` : "/default.jpg";

          return (
            <motion.div
              key={roadmap._id}
              className="bg-white/80 border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 flex flex-col overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              custom={index}
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={imageUrl}
                  alt={roadmap.title}
                  className="h-44 w-full object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-t-2xl" />
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col justify-between h-full">
                <Link to={`/roadmap/${roadmap._id}`}>
                  <h2 className="text-xl font-semibold text-blue-700 hover:underline tracking-tight mb-1">
                    {roadmap.title}
                  </h2>
                </Link>

                <p className="text-gray-600 text-sm line-clamp-3">{roadmap.description}</p>

                {/* Progress */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {completed} of {total} steps completed ({percentage}%)
                  </p>
                </div>

                {/* CTA Button */}
                <Link
                  to={`/roadmap/${roadmap._id}`}
                  className="mt-5 inline-block text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition font-medium text-sm shadow-md"
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
