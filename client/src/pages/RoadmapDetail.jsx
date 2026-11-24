
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, BookOpen, CheckCircle, ChevronDown, ChevronUp, Circle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import RoadmapAIChatbot from "../components/RoadmapAIChatbot";
import "./RoadmapDetail.css";

const RoadmapDetail = () => {
  const { roadmapId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { updateProgress } = useProgress();

  const [roadmap, setRoadmap] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [expandedSection, setExpandedSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (authLoading || !user) return undefined;

    const controller = new AbortController();
    setIsLoading(true);

    const fetchRoadmapAndProgress = async () => {
      try {
        const [roadmapResult, progressResult] = await Promise.allSettled([
          api.get(`/roadmaps/${roadmapId}`, { signal: controller.signal }),
          api.get(`/progress/${roadmapId}`, { signal: controller.signal }),
        ]);

        if (controller.signal.aborted) return;
        if (roadmapResult.status === "rejected") throw roadmapResult.reason;

        const roadmapData = roadmapResult.value.data;
        setRoadmap(roadmapData);

        const steps = progressResult.status === "fulfilled"
          ? (progressResult.value.data.completedSteps || [])
          : [];
        setCompletedSteps(steps);

        const totalSteps = (roadmapData.sections || []).reduce(
          (total, section) => total + (section.steps?.length || 0),
          0
        );
        updateProgress(roadmapId, steps, totalSteps);
        setLoadError("");
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadError(error.response?.data?.message || "Unable to load this roadmap right now.");
          console.error("Error loading roadmap", error);
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchRoadmapAndProgress();
    return () => controller.abort();
  }, [roadmapId, user, authLoading, updateProgress]);

  const sections = useMemo(() => roadmap?.sections || [], [roadmap]);
  const allSteps = useMemo(() => sections.flatMap((section) => section.steps || []), [sections]);
  const total = allSteps.length;
  const completed = completedSteps.length;
  const percentage = total ? Math.min(Math.round((completed / total) * 100), 100) : 0;

  const toggleStep = async (stepTitle) => {
    const previousSteps = completedSteps;
    const updatedSteps = previousSteps.includes(stepTitle)
      ? previousSteps.filter((title) => title !== stepTitle)
      : [...previousSteps, stepTitle];
    setCompletedSteps(updatedSteps);
    updateProgress(roadmapId, updatedSteps, total);

    try {
      await api.post("/progress/update", { roadmapId, completedSteps: updatedSteps });
    } catch (error) {
      setCompletedSteps(previousSteps);
      updateProgress(roadmapId, previousSteps, total);
      console.error("Error updating progress", error);
    }
  };

  const toggleSection = (index) => setExpandedSection((current) => current === index ? null : index);

  if (authLoading || isLoading) {
    return <div className="route-loading" role="status"><span className="loading-spinner" />Loading your roadmap…</div>;
  }

  if (loadError || !roadmap) {
    return <div className="roadmap-detail-page"><div className="dashboard-empty"><span className="empty-icon"><BookOpen size={24} /></span><h3>Roadmap unavailable</h3><p>{loadError || "This roadmap could not be found."}</p><button type="button" className="btn-secondary" onClick={() => navigate("/dashboard")}>Back to roadmaps</button></div></div>;
  }

  return (
    <div className="roadmap-detail-page">
      <Link to="/dashboard" className="roadmap-back-link"><ArrowLeft size={15} /> All career paths</Link>

      <section className="roadmap-detail-hero">
        <div className="roadmap-detail-copy">
          <span className="section-kicker"><Sparkles size={14} /> {roadmap.category || "CAREER ROADMAP"}</span>
          <h1>{roadmap.title}</h1>
          <p>{roadmap.description || "Follow this structured learning path, build your foundations, and track each milestone as you move forward."}</p>
          <div className="roadmap-detail-meta"><span><BookOpen size={15} /> {sections.length} learning sections</span><span><CheckCircle size={15} /> {total} milestones</span></div>
        </div>
        <div className="roadmap-overview-card">
          <div className="roadmap-overview-ring" style={{ "--progress": `${percentage}%` }}><div><strong>{percentage}%</strong><small>complete</small></div></div>
          <div className="roadmap-overview-caption"><strong>Your progress</strong><span>{completed} of {total} milestones done</span></div>
          <div className="roadmap-overview-track"><span style={{ width: `${percentage}%` }} /></div>
        </div>
      </section>

      <div className="roadmap-content-heading"><div><span className="section-kicker">THE LEARNING PLAN</span><h2>Work through the milestones</h2></div><span>{completed}/{total} completed</span></div>

      <div className="roadmap-sections-list">
        {sections.map((section, index) => {
          const steps = section.steps || [];
          const sectionTotal = steps.length;
          const sectionCompleted = steps.filter((step) => completedSteps.includes(step.title)).length;
          const sectionPercent = sectionTotal ? Math.round((sectionCompleted / sectionTotal) * 100) : 0;
          const isOpen = expandedSection === index;

          return (
            <section key={section._id || `${section.title}-${index}`} className={`roadmap-section-card${isOpen ? " is-open" : ""}`}>
              <button type="button" onClick={() => toggleSection(index)} className="roadmap-section-toggle" aria-expanded={isOpen}>
                <span className="roadmap-section-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="roadmap-section-title-block"><strong>{section.title}</strong><small>{sectionCompleted} of {sectionTotal} milestones complete</small></span>
                <span className="roadmap-section-progress"><strong>{sectionPercent}%</strong><span><i style={{ width: `${sectionPercent}%` }} /></span></span>
                <span className="roadmap-section-chevron">{isOpen ? <ChevronUp size={19} /> : <ChevronDown size={19} />}</span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="roadmap-section-body">
                    {steps.map((step, stepIndex) => {
                      const isDone = completedSteps.includes(step.title);
                      const resources = Array.isArray(step.smartResources) && step.smartResources.length
                        ? step.smartResources
                        : (step.resources || []).map((url) => ({ title: url, url, type: "Resource", description: "Open this learning resource" }));

                      return (
                        <article key={step._id || `${step.title}-${stepIndex}`} className={`roadmap-step-card${isDone ? " is-complete" : ""}`}>
                          <button type="button" className={`roadmap-step-check${isDone ? " is-checked" : ""}`} aria-label={`${isDone ? "Mark incomplete" : "Mark complete"}: ${step.title}`} onClick={() => toggleStep(step.title)}>
                            {isDone ? <CheckCircle size={18} /> : <Circle size={18} />}
                          </button>
                          <div className="roadmap-step-content">
                            <div className="roadmap-step-title-row"><span>STEP {String(stepIndex + 1).padStart(2, "0")}</span>{isDone && <small>COMPLETED</small>}</div>
                            <h3>{step.title}</h3>
                            {step.description && <p>{step.description}</p>}
                            {resources.length > 0 && (
                              <div className="roadmap-resources">
                                <span className="roadmap-resources-label">RECOMMENDED RESOURCES</span>
                                <div className="roadmap-resource-grid">
                                  {resources.map((resource, resourceIndex) => (
                                    <a key={`${resource.url}-${resourceIndex}`} href={resource.url} target="_blank" rel="noreferrer" className="roadmap-resource-card">
                                      <span><strong>{resource.title}</strong><small>{resource.description || resource.type || "Learning resource"}</small></span><ArrowUpRight size={15} />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          );
        })}
      </div>

      {total > 0 && completed >= total && (
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="roadmap-complete-card">
          <span className="roadmap-complete-icon"><CheckCircle size={24} /></span>
          <div><span className="section-kicker">MILESTONE REACHED</span><h2>You’ve completed this roadmap.</h2><p>Put your knowledge to the test or review how you’ve performed in past attempts.</p></div>
          <div className="roadmap-complete-actions"><button type="button" className="btn-primary" onClick={() => navigate(`/quiz/${roadmapId}/instructions`)}>Take quiz <ArrowUpRight size={16} /></button><button type="button" className="btn-secondary" onClick={() => navigate(`/quiz/${roadmapId}/attempts`)}>Quiz history</button></div>
        </motion.section>
      )}

      <RoadmapAIChatbot roadmap={roadmap} />
    </div>
  );
};

export default RoadmapDetail;
