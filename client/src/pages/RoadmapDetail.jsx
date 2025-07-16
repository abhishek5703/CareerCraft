import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";

const RoadmapDetail = () => {
  const { roadmapId } = useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { updateProgress } = useProgress();

  const [roadmap, setRoadmap] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading || !user) return;

    const fetchRoadmapAndProgress = async () => {
      try {
        const res = await api.get(`/roadmaps/${roadmapId}`);
        setRoadmap(res.data);

        const progressRes = await api.get(`/progress/${roadmapId}`);
        const steps = progressRes.data.completedSteps || [];
        setCompletedSteps(steps);

        const totalSteps = res.data.sections?.reduce(
          (acc, section) => acc + (section?.steps?.length || 0),
          0
        );
        updateProgress(roadmapId, steps, totalSteps);
      } catch (err) {
        console.error("Error loading roadmap", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmapAndProgress();
  }, [roadmapId, user, loading]);

  const toggleStep = async (stepTitle) => {
    const updatedSteps = completedSteps.includes(stepTitle)
      ? completedSteps.filter((t) => t !== stepTitle)
      : [...completedSteps, stepTitle];

    setCompletedSteps(updatedSteps);

    try {
      await api.post("/progress/update", {
        roadmapId,
        completedSteps: updatedSteps,
      });

      const totalSteps = roadmap.sections?.reduce(
        (acc, section) => acc + (section?.steps?.length || 0),
        0
      );
      updateProgress(roadmapId, updatedSteps, totalSteps);
    } catch (err) {
      console.error("Error updating progress", err);
    }
  };

  const toggleSection = (index) => {
    setExpandedSection(index === expandedSection ? null : index);
  };

  if (loading || isLoading || !roadmap)
    return <div className="p-6 animate-pulse text-gray-600">Loading...</div>;

  const allSteps = roadmap.sections.flatMap((sec) => sec.steps);
  const total = allSteps.length;
  const completed = completedSteps.length;
  const percentage = Math.min(Math.round((completed / total) * 100), 100);

  return (
    <div className="max-w-5xl mx-auto p-6 pt-6 relative">
      <h1 className="text-3xl font-bold text-gray-900 mb-1 text-left">
        {roadmap.title}
      </h1>
      <p className="text-gray-500 mb-8 text-base text-left">
        {roadmap.description}
      </p>

      {roadmap.sections.map((section, index) => {
        const sectionTotal = section.steps.length;
        const sectionCompleted = section.steps.filter((step) =>
          completedSteps.includes(step.title)
        ).length;
        const sectionPercent = Math.min(
          Math.round((sectionCompleted / sectionTotal) * 100),
          100
        );
        const isOpen = expandedSection === index;

        return (
          <div
            key={index}
            className="mb-6 rounded-xl border border-gray-200 shadow-lg bg-white overflow-hidden"
          >
            <button
              onClick={() => toggleSection(index)}
              className="w-full flex justify-between items-center px-6 py-5 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-full text-left">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">{`Section ${index + 1}: ${section.title}`}</h2>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-green-500 h-2"
                    animate={{ width: `${sectionPercent}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {sectionCompleted} of {sectionTotal} steps ({sectionPercent}%)
                </p>
              </div>
              {isOpen ? <ChevronUp /> : <ChevronDown />}
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden px-6 py-5 space-y-4 bg-white"
                >
                  {section.steps.map((step, i) => {
                    const isDone = completedSteps.includes(step.title);
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.03 * i }}
                        className={`p-5 border rounded-xl flex items-start gap-4 transition-all duration-300 ${
                          isDone ? "bg-green-50 border-green-300 shadow-inner" : "bg-white hover:shadow-md"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => toggleStep(step.title)}
                          className="w-5 h-5 mt-1 accent-green-600 cursor-pointer"
                        />
                        <div className="flex-1">
                          <h4
                            className={`font-semibold text-base ${
                              isDone ? "text-green-700 line-through" : "text-gray-900"
                            }`}
                          >
                            Step {i + 1}: {step.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {step.description}
                          </p>
                          <ul className="ml-4 mt-2 list-disc text-blue-600 text-sm space-y-1">
                            {step.resources?.map((link, j) => (
                              <li key={j}>
                                <a
                                  href={link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="hover:underline"
                                >
                                  {link}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {completed === total && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-6 border border-green-400 bg-green-50 rounded-xl shadow-xl text-center"
        >
          <CheckCircle className="text-green-600 w-8 h-8 mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            🎉 You’ve completed this roadmap!
          </h2>
          <p className="text-gray-700 mb-4">
            Ready to test your knowledge or view your progress?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate(`/quiz/${roadmapId}/instructions`)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              Take Quiz
            </button>
            <button
              onClick={() => navigate(`/quiz/${roadmapId}/attempts`)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              View Past Attempts
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RoadmapDetail;
