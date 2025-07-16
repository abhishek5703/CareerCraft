import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const { token } = useAuth();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 to-white px-6 md:px-16 py-16 flex flex-col-reverse md:flex-row items-center justify-between">
      {/* Decorative Background Circles */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="z-10 max-w-xl text-center md:text-left"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 leading-tight mb-4">
          <motion.span
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-blue-500 inline-block"
          >
            Unlock Your Future with
          </motion.span>{" "}
          <span className="text-blue-600">CareerCraft 🚀</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-8">
          Discover curated learning paths and master your tech career — step by step.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to={token ? "/dashboard" : "/login"}
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-xl transition duration-200"
          >
            {token ? "Explore Roadmaps" : "Get Started"}
          </Link>
        </motion.div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        whileHover={{ y: -5 }}
        className="z-10 w-full max-w-sm mb-12 md:mb-0"
      >
        <img
          src="/hero-illustration.png"
          alt="Career growth"
          className="w-full h-auto drop-shadow-xl"
        />
      </motion.div>
    </div>
  );
};

export default Home;
