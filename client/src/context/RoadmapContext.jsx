import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const RoadmapContext = createContext(null);

export const RoadmapProvider = ({ children }) => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchRoadmaps = async () => {
      try {
        const response = await api.get("/roadmaps", { signal: controller.signal });
        setRoadmaps(Array.isArray(response.data) ? response.data : []);
        setError("");
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.response?.data?.message || "Unable to load career roadmaps right now.");
          console.error("Failed to fetch roadmaps:", requestError);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchRoadmaps();
    return () => controller.abort();
  }, []);

  const value = useMemo(() => ({ roadmaps, loading, error, setRoadmaps }), [roadmaps, loading, error]);

  return <RoadmapContext.Provider value={value}>{children}</RoadmapContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRoadmaps = () => {
  const context = useContext(RoadmapContext);
  if (!context) throw new Error("useRoadmaps must be used within a RoadmapProvider");
  return context;
};