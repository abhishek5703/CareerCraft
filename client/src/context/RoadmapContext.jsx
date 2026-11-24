
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const RoadmapContext = createContext(null);

export const RoadmapProvider = ({ children }) => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshRoadmaps = useCallback(async (signal) => {
    setLoading(true);
    try {
      const response = await api.get("/roadmaps", { signal });
      setRoadmaps(Array.isArray(response.data) ? response.data : []);
      setError("");
    } catch (requestError) {
      if (!signal?.aborted) {
        setError(requestError.response?.data?.message || "Unable to load career roadmaps right now.");
        console.error("Failed to fetch roadmaps:", requestError);
      }
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    refreshRoadmaps(controller.signal);
    return () => controller.abort();
  }, [refreshRoadmaps]);

  const value = useMemo(
    () => ({ roadmaps, loading, error, setRoadmaps, refreshRoadmaps }),
    [roadmaps, loading, error, refreshRoadmaps]
  );

  return <RoadmapContext.Provider value={value}>{children}</RoadmapContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRoadmaps = () => {
  const context = useContext(RoadmapContext);
  if (!context) throw new Error("useRoadmaps must be used within a RoadmapProvider");
  return context;
};
