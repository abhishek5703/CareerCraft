import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">CareerCraft</h2>
          <p className="text-sm text-gray-400">
            Empowering learners and job-seekers to craft their careers with confidence and clarity.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
            <li><Link to="/profile" className="hover:text-white">Profile</Link></li>
            <li><Link to="/quiz/results" className="hover:text-white">Quiz Results</Link></li>
            <li><Link to="/roadmap/overview" className="hover:text-white">Roadmaps</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Connect</h3>
          <div className="flex gap-5 text-xl">
            <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaLinkedin />
            </a>
            <a href="https://github.com/your-github" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaGithub />
            </a>
            <a href="mailto:youremail@example.com" className="hover:text-white">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} CareerCraft. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
