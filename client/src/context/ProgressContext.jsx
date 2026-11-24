import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
  const [progressMap, setProgressMap] = useState({});

  const updateProgress = useCallback((roadmapId, completedSteps, totalSteps) => {
    setProgressMap((previous) => ({
      ...previous,
      [roadmapId]: {
        completed: completedSteps.length,
        total: totalSteps,
      },
    }));
  }, []);

  const value = useMemo(() => ({ progressMap, setProgressMap, updateProgress }), [progressMap, updateProgress]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used within a ProgressProvider");
  return context;
};