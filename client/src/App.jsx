import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ Import this
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RoadmapDetail from "./pages/RoadmapDetail";
import Quiz from "./pages/Quiz";
import QuizResults from "./pages/QuizResults";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import QuizInstructions from "./pages/QuizInstructions";
import QuizAttempts from "./pages/QuizAttempts";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      {/* ✅ GLOBAL TOASTER */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "14px",
            background: "#ffffff",
            color: "#1f2937",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          },
          success: {
            iconTheme: {
              primary: "#10b981", // green-500
              secondary: "#ecfdf5",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444", // red-500
              secondary: "#fef2f2",
            },
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
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
          path="/quiz/:roadmapId/instructions"
          element={
            <ProtectedRoute>
              <QuizInstructions />
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
        <Route
          path="/quiz/:roadmapId/attempts"
          element={
            <ProtectedRoute>
              <QuizAttempts />
            </ProtectedRoute>
          }
        />
      </Routes>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;
