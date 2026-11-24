import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, CheckCircle2, ChevronRight, Compass, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { useRoadmaps } from "../context/RoadmapContext";
import api from "../services/api";

const Dashboard = () => {
  const { user } = useAuth();
  const { roadmaps, loading: roadmapsLoading, error: roadmapsError } = useRoadmaps();
  const { progressMap, setProgressMap } = useProgress();
  const [progressLoading, setProgressLoading] = useState(true);
  const [progressError, setProgressError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All paths");

  useEffect(() => {
    if (!user?._id) {
      setProgressLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    setProgressLoading(true);

    api.get(`/progress/user/${user._id}/roadmaps`, { signal: controller.signal })
      .then((response) => {
        const nextProgress = Object.fromEntries(
          (Array.isArray(response.data) ? response.data : []).map((item) => [
            item.roadmapId,
            {
              completed: Array.isArray(item.completedSteps) ? item.completedSteps.length : 0,
              total: Math.max(Number(item.totalSteps) || 1, 1),
            },
          ])
        );
        setProgressMap((previous) => ({ ...previous, ...nextProgress }));
        setProgressError("");
      })
      .catch((error) => {
        if (!controller.signal.aborted) setProgressError(error.response?.data?.message || "Progress could not be refreshed. Your roadmaps are still available.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setProgressLoading(false);
      });

    return () => controller.abort();
  }, [user?._id, setProgressMap]);

  const categories = useMemo(() => {
    const available = [...new Set(roadmaps.map((roadmap) => roadmap.category).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    return ["All paths", ...available];
  }, [roadmaps]);

  const filteredRoadmaps = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return roadmaps.filter((roadmap) => {
      const matchesCategory = activeCategory === "All paths" || roadmap.category === activeCategory;
      const matchesSearch = !query || `${roadmap.title || ""} ${roadmap.category || ""} ${roadmap.description || ""}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [roadmaps, searchTerm, activeCategory]);

  const stats = useMemo(() => {
    const started = roadmaps.filter((roadmap) => (progressMap[roadmap._id]?.completed || 0) > 0).length;
    const completed = roadmaps.filter((roadmap) => {
      const progress = progressMap[roadmap._id];
      return progress && progress.total > 0 && progress.completed >= progress.total;
    }).length;
    return { total: roadmaps.length, started, completed };
  }, [roadmaps, progressMap]);

  const isLoading = roadmapsLoading || progressLoading;

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <span className="section-kicker"><Sparkles size={14} /> YOUR LEARNING SPACE</span>
          <h1>Make your next move <span>count.</span></h1>
          <p>Welcome{user?.name ? ` back, ${user.name.split(" ")[0]}` : ""}. Explore a career path, keep your learning on track, and build momentum at your own pace.</p>
        </div>
        <div className="dashboard-hero-mark"><Compass size={64} strokeWidth={1.15} /><span>Find your direction</span></div>
      </section>

      <section className="dashboard-stats" aria-label="Learning overview">
        <div className="dashboard-stat"><span className="dashboard-stat-icon stat-violet"><BookOpen size={18} /></span><div><strong>{roadmapsLoading ? "—" : stats.total}</strong><small>Career paths</small></div></div>
        <div className="dashboard-stat"><span className="dashboard-stat-icon stat-blue"><Compass size={18} /></span><div><strong>{roadmapsLoading || progressLoading ? "—" : stats.started}</strong><small>Paths started</small></div></div>
        <div className="dashboard-stat"><span className="dashboard-stat-icon stat-green"><CheckCircle2 size={18} /></span><div><strong>{roadmapsLoading || progressLoading ? "—" : stats.completed}</strong><small>Paths completed</small></div></div>
      </section>

      <section className="dashboard-library">
        <div className="dashboard-section-heading">
          <div><span className="section-kicker">EXPLORE YOUR OPTIONS</span><h2>Find your learning path</h2><p>Choose a roadmap and turn your goal into a series of achievable milestones.</p></div>
          <span className="roadmap-count">{roadmaps.length} {roadmaps.length === 1 ? "path" : "paths"} available</span>
        </div>

        <div className="roadmap-toolbar">
          <label className="dashboard-search"><Search size={18} /><input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search by role, skill, or category..." aria-label="Search roadmaps" /></label>
          <div className="category-filters" aria-label="Filter roadmaps by category">
            {categories.map((category) => (
              <button key={category} type="button" className={`category-filter${activeCategory === category ? " is-selected" : ""}`} onClick={() => setActiveCategory(category)}>{category}</button>
            ))}
          </div>
        </div>

        {progressError && <p className="inline-notice" role="status">{progressError}</p>}

        {isLoading ? (
          <div className="roadmap-grid" aria-label="Loading roadmaps">
            {[1, 2, 3, 4, 5, 6].map((item) => <div className="roadmap-skeleton" key={item}><div className="skeleton-image" /><div className="skeleton-line skeleton-line-wide" /><div className="skeleton-line" /><div className="skeleton-line skeleton-line-short" /></div>)}
          </div>
        ) : roadmapsError && !roadmaps.length ? (
          <div className="dashboard-empty"><span className="empty-icon"><Compass size={24} /></span><h3>Roadmaps are taking a break</h3><p>{roadmapsError}</p><button type="button" className="btn-primary" onClick={() => window.location.reload()}>Try again</button></div>
        ) : filteredRoadmaps.length ? (
          <div className="roadmap-grid">
            {filteredRoadmaps.map((roadmap, index) => {
              const progress = progressMap[roadmap._id] || { completed: 0, total: 1 };
              const total = Math.max(Number(progress.total) || 1, 1);
              const completed = Math.max(Number(progress.completed) || 0, 0);
              const percentage = Math.min(100, Math.round((completed / total) * 100));
              const imageUrl = roadmap.image
                ? (roadmap.image.startsWith("http") || roadmap.image.startsWith("/") ? roadmap.image : `/${roadmap.image}`)
                : "/hero-illustration.png";

              return (
                <motion.article
                  className="roadmap-card"
                  key={roadmap._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.36, delay: Math.min(index % 3, 2) * 0.06 }}
                >
                  <Link to={`/roadmap/${roadmap._id}`} className="roadmap-image-link" aria-label={`Open ${roadmap.title} roadmap`}>
                    <img src={imageUrl} alt="" loading="lazy" onError={(event) => { event.currentTarget.src = "/hero-illustration.png"; }} />
                    <span className="roadmap-image-overlay" />
                    <span className="roadmap-category-pill">{roadmap.category || "Career roadmap"}</span>
                    <span className="roadmap-open-icon"><ArrowUpRight size={18} /></span>
                  </Link>
                  <div className="roadmap-card-content">
                    <div className="roadmap-card-heading"><h3>{roadmap.title}</h3><ChevronRight size={17} /></div>
                    <p>{roadmap.description || "A structured learning path to help you build the skills and confidence for your next career step."}</p>
                    <div className="roadmap-progress-heading"><span>Your progress</span><strong>{percentage}%</strong></div>
                    <div className="roadmap-progress-track" role="progressbar" aria-label={`${roadmap.title} progress`} aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${percentage}%` }} /></div>
                    <div className="roadmap-progress-foot"><span>{completed} of {total} milestones completed</span><span>{percentage === 100 ? "Completed" : percentage > 0 ? "In progress" : "Not started"}</span></div>
                    <Link to={`/roadmap/${roadmap._id}`} className="roadmap-card-link">{percentage > 0 ? "Continue roadmap" : "Explore roadmap"}<ArrowUpRight size={16} /></Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="dashboard-empty"><span className="empty-icon"><Search size={24} /></span><h3>No matching roadmaps</h3><p>Try another search term or switch to a different category.</p><button type="button" className="btn-secondary" onClick={() => { setSearchTerm(""); setActiveCategory("All paths"); }}>Clear filters</button></div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;