import { createContext, useContext, useState } from "react";

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progressMap, setProgressMap] = useState({});

  const updateProgress = (roadmapId, completedSteps, totalSteps) => {
    setProgressMap((prev) => ({
      ...prev,
      [roadmapId]: {
        completed: completedSteps.length,
        total: totalSteps, 
      },
    }));
  };

  return (
    <ProgressContext.Provider value={{ progressMap, setProgressMap, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
