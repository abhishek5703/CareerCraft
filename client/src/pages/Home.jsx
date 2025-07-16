import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const { token } = useAuth();

  return (
    <div className="min-h-[85vh] px-6 md:px-20 py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
      
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl text-center md:text-left"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900 mb-4">
          Unlock Your Future with <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            CareerCraft 🚀
          </span>
        </h1>

        <p className="text-gray-700 text-lg sm:text-xl mb-8">
          Discover curated learning paths and master your tech career — one step at a time.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link
            to={token ? "/dashboard" : "/login"}
            className="inline-block px-6 py-3 text-white font-semibold text-lg rounded-xl shadow-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition duration-200"
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
        className="w-full max-w-sm md:max-w-md"
      >
        <img
          src="/hero-illustration.png"
          alt="Career growth"
          className="w-full h-auto object-contain drop-shadow-2xl"
        />
      </motion.div>
    </div>
  );
};

export default Home;
