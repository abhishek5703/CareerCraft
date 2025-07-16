import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="backdrop-blur-sm bg-white/70 border-t border-gray-200 shadow-md px-6 py-16 mt-28">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Branding */}
        <div className="space-y-3 md:col-span-1">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            CareerCraft <span className="text-xl">🚀</span>
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Empowering learners and job-seekers to craft their careers with confidence and clarity.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-blue-400 inline-block pb-1">Explore</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><Link to="/" className="hover:text-blue-600 transition">Home</Link></li>
            <li><Link to="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link></li>
            <li><Link to="/profile" className="hover:text-blue-600 transition">Profile</Link></li>
            <li><Link to="/quiz/results" className="hover:text-blue-600 transition">Quiz Results</Link></li>
            <li><Link to="/dashboard" className="hover:text-blue-600 transition">Roadmaps</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-blue-400 inline-block pb-1">Connect</h3>
          <div className="flex gap-5 mt-3 text-2xl text-gray-600">
            <Link to="/" className="hover:text-blue-600 hover:scale-110 transition duration-300" title="LinkedIn">
              <FaLinkedin />
            </Link>
            <Link to="/" className="hover:text-gray-900 hover:scale-110 transition duration-300" title="GitHub">
              <FaGithub />
            </Link>
            <Link to="/" className="hover:text-pink-500 hover:scale-110 transition duration-300" title="Email">
              <FaEnvelope />
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-blue-400 inline-block pb-1">Subscribe</h3>
          <p className="text-sm text-gray-600 mb-3">
            Join our newsletter to stay updated on the latest roadmaps and career tips.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm bg-white"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 pt-6 text-center text-sm text-gray-500 border-t border-gray-300">
        © {new Date().getFullYear()} <span className="font-medium text-gray-700">CareerCraft</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
