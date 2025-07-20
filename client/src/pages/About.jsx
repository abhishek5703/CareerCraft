import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-full px-4 py-12 sm:px-6 lg:px-16 bg-gradient-to-br min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20">
        {/* Left: About Text */}
        <div className="w-full md:w-1/2 rounded-3xl p-6 sm:p-10 transition-all duration-300">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-6 leading-tight">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              CareerCraft
            </span>
          </h2>

          <p className="text-gray-700 text-lg sm:text-xl mb-4 leading-relaxed">
            <strong className="text-blue-700">CareerCraft</strong> is your all-in-one platform to explore and master
            the most in-demand tech career paths like{" "}
            <span className="font-semibold text-indigo-600">Web Development</span>,{" "}
            <span className="font-semibold text-indigo-600">App Development</span>,{" "}
            <span className="font-semibold text-indigo-600">Data Science</span>,{" "}
            <span className="font-semibold text-indigo-600">AI/ML</span>, and{" "}
            <span className="font-semibold text-indigo-600">Cybersecurity</span>.
          </p>

          <p className="text-gray-700 text-lg sm:text-xl mb-4 leading-relaxed">
            Interactive quizzes, personalized dashboards, and a vibrant learning community — we’ve built everything to help you stay motivated and on track.
          </p>

          <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
            Join <strong className="text-blue-700">thousands of learners</strong> crafting their career with clarity and confidence.
          </p>

          {/* Social Links */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://github.com/abhishek5703"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full shadow-md transition-transform hover:scale-105"
            >
              <FaGithub size={22} className="text-gray-800" />
              <span className="text-md font-medium">GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/abhishekkumar8983/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-full shadow-md transition-transform hover:scale-105"
            >
              <FaLinkedin size={22} className="text-blue-600" />
              <span className="text-md font-medium text-blue-700">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/about.png"
            alt="CareerCraft Illustration"
            className="h-[400px] md:h-[480px] object-contain rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
