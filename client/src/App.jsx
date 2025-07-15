import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RoadmapDetail from "./pages/RoadmapDetail";
import Quiz from "./pages/Quiz";
import QuizResults from "./pages/QuizResults";
import Navbar from "./components/Navbar"; // ✅ Import Navbar
import Home from "./pages/Home"; // Optional: If you add a Home page
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* ✅ Always show Navbar */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* You can change this to Home if needed */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Optional: <Route path="/" element={<Home />} /> */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roadmap/:roadmapId"
          element={
            <ProtectedRoute>
              <RoadmapDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:roadmapId"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/results"
          element={
            <ProtectedRoute>
              <QuizResults />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
