import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { token } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-blue-700">Welcome to CareerCraft 🚀</h1>
      <p className="text-lg sm:text-xl text-gray-700 mb-8">
        Your personalized journey to a successful career begins here.
      </p>

      <Link
        to={token ? "/dashboard" : "/login"}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
      >
        {token ? "Go to Dashboard" : "Login to Explore"}
      </Link>
    </div>
  );
};

export default Home;
