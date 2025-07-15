import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";

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

  if (loading || isLoading || !roadmap) return <div className="p-6">Loading...</div>;
  if (!roadmap.sections) return <div className="p-6 text-red-600">Invalid roadmap format.</div>;

  const allSteps = roadmap.sections.flatMap((sec) => sec.steps);
  const total = allSteps.length;
  const completed = completedSteps.length;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{roadmap.title}</h1>
      <p className="text-gray-600 mb-6">{roadmap.description}</p>

      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded h-3">
          <div
            className="bg-green-500 h-3 rounded"
            style={{ width: `${percentage}%`, transition: "width 0.3s ease-in-out" }}
          ></div>
        </div>
        <p className="text-sm text-gray-700 mt-1">
          {completed} of {total} steps completed ({percentage}%)
        </p>
      </div>

      {/* Sections */}
      {roadmap.sections.map((section, index) => {
        const sectionTotal = section.steps.length;
        const sectionCompleted = section.steps.filter((step) =>
          completedSteps.includes(step.title)
        ).length;
        const sectionPercent = Math.round((sectionCompleted / sectionTotal) * 100);

        return (
          <div key={index} className="mb-4 border rounded-lg shadow-sm">
            <button
              onClick={() => toggleSection(index)}
              className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 font-semibold"
            >
              <div className="flex flex-col items-start">
                <span>{`Step ${index + 1}: ${section.title}`}</span>
                <div className="w-full mt-2 bg-gray-300 rounded h-2">
                  <div
                    className="bg-green-500 h-2 rounded"
                    style={{ width: `${sectionPercent}%`, transition: "width 0.3s ease" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {sectionCompleted} of {sectionTotal} steps completed ({sectionPercent}%)
                </p>
              </div>
            </button>

            {expandedSection === index && (
              <div className="px-4 py-2 bg-white space-y-4">
                {section.steps.map((step, i) => {
                  const isDone = completedSteps.includes(step.title);
                  return (
                    <div
                      key={i}
                      className={`p-4 border rounded flex items-center justify-between ${isDone ? "bg-green-50 border-green-400" : "bg-white"
                        }`}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => toggleStep(step.title)}
                          className="w-5 h-5 text-green-600 cursor-pointer mt-1"
                        />
                        <div className={`flex-1 ${isDone ? "line-through text-green-700" : ""}`}>
                          <h4 className="font-semibold">{step.title}</h4>
                          <p className="text-sm text-gray-600">{step.description}</p>
                          <ul className="ml-4 mt-1 list-disc text-blue-600 text-sm">
                            {step.resources?.map((link, j) => (
                              <li key={j}>
                                <a href={link} target="_blank" rel="noreferrer">
                                  {link}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {completed === total && (
        <div className="mt-8 p-6 border border-green-300 bg-green-50 rounded">
          <h2 className="text-xl font-bold text-green-700">🎉 You’ve completed this roadmap!</h2>
          <p className="text-gray-700 mt-2">Ready to take the next step?</p>
          <div className="mt-4">
            <button
              onClick={() => navigate(`/quiz/${roadmapId}/instructions`)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              Take Quiz
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default RoadmapDetail;
