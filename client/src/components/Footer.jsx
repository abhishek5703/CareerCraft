import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12 px-6 mt-20 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Branding */}
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-wide mb-3">CareerCraft</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Empowering learners and job-seekers to craft their careers with confidence and clarity.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 underline underline-offset-4 decoration-blue-500">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link></li>
            <li><Link to="/profile" className="hover:text-blue-400 transition">Profile</Link></li>
            <li><Link to="/quiz/results" className="hover:text-blue-400 transition">Quiz Results</Link></li>
            <li><Link to="/roadmap/overview" className="hover:text-blue-400 transition">Roadmaps</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 underline underline-offset-4 decoration-blue-500">Connect</h3>
          <div className="flex gap-6 text-2xl">
            <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noreferrer" 
              className="hover:text-blue-500 transition" title="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://github.com/your-github" target="_blank" rel="noreferrer" 
              className="hover:text-white transition hover:scale-110" title="GitHub">
              <FaGithub />
            </a>
            <a href="mailto:youremail@example.com" 
              className="hover:text-pink-400 transition" title="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-white font-medium">CareerCraft</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
