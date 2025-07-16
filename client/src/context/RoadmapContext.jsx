import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api"; 

const RoadmapContext = createContext();

export const RoadmapProvider = ({ children }) => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await api.get("/roadmaps");
        setRoadmaps(res.data); 
      } catch (err) {
        console.error("Failed to fetch roadmaps:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  return (
    <RoadmapContext.Provider value={{ roadmaps, loading }}>
      {children}
    </RoadmapContext.Provider>
  );
};

export const useRoadmaps = () => useContext(RoadmapContext);
