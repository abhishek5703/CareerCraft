// Your imports remain the same
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useRoadmaps } from "../context/RoadmapContext";
import { Menu, X, Search } from "lucide-react";

const imageMap = {
  "Web Development": "/roadmaps/web-dev.jpg",
  "Data Science": "/roadmaps/data-science.jpg",
  "Mobile App Development": "/roadmaps/appdev.jpg",
  "UI/UX Design": "/roadmaps/uiux-design.webp",
  "Cybersecurity": "/roadmaps/cybersecurity.webp",
  "Cloud & DevOps": "/roadmaps/cloud-devops.jpg",
  "AI & Machine Learning Engineer": "/roadmaps/ai-ml.jpg",
  "Blockchain Developer": "/roadmaps/Blockchain.jpg",
  "Game Development": "/roadmaps/game-dev.png",
  "Product Management": "/roadmaps/product-mangement.jpg",
  "Technical Writing": "/roadmaps/tech-writing.png",
  "Developer Relations (DevRel)": "/roadmaps/developer-relation.png",
  "Data Engineering": "/roadmaps/data-engineer.png",
};

const animatedPlaceholders = [
  "What roadmap are you looking for?",
  "Explore Web Dev, AI, UI/UX, and more...",
  "Find your next learning journey",
  "Search roadmaps like Data Science, DevOps..."
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { roadmaps } = useRoadmaps();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRoadmaps, setFilteredRoadmaps] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [typedPlaceholder, setTypedPlaceholder] = useState("");

  const placeholderIndex = useRef(0);
  const charIndex = useRef(0);
  const direction = useRef("forward");
  const typingInterval = useRef(null);
  const inputRef = useRef(null);

  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = (path) =>
    `text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 ${isActive(path)
      ? "bg-blue-100 text-blue-700"
      : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
    }`;

  useEffect(() => {
    typingInterval.current = setInterval(() => {
      const text = animatedPlaceholders[placeholderIndex.current];
      if (direction.current === "forward") {
        setTypedPlaceholder((prev) => prev + text.charAt(charIndex.current));
        charIndex.current++;
        if (charIndex.current === text.length) direction.current = "backward";
      } else {
        setTypedPlaceholder((prev) => prev.slice(0, -1));
        if (typedPlaceholder.length === 0) {
          direction.current = "forward";
          placeholderIndex.current =
            (placeholderIndex.current + 1) % animatedPlaceholders.length;
          charIndex.current = 0;
        }
      }
    }, 45);
    return () => clearInterval(typingInterval.current);
  }, [typedPlaceholder]);

  useEffect(() => {
    if (!searchTerm.trim()) return setFilteredRoadmaps([]);

    const timeout = setTimeout(() => {
      const results = roadmaps.filter((r) =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRoadmaps(results);
      setHighlightedIndex(0);
    }, 200);

    return () => clearTimeout(timeout);
  }, [searchTerm, roadmaps]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setFilteredRoadmaps([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) => (prev + 1) % filteredRoadmaps.length);
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) =>
        prev === 0 ? filteredRoadmaps.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && filteredRoadmaps[highlightedIndex]) {
      navigate(`/roadmap/${filteredRoadmaps[highlightedIndex]._id}`);
      resetSearch();
    } else if (e.key === "Escape") {
      setFilteredRoadmaps([]);
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
    setFilteredRoadmaps([]);
    setIsMobileMenuOpen(false);
  };

  const renderSearchInput = () => (
    <div
      ref={inputRef}
      className="relative flex items-center bg-gray-100 rounded-xl px-4 py-2 shadow-inner transition w-full md:w-[30rem] focus-within:ring-2 focus-within:ring-blue-500"
    >
      <Search className="text-gray-500 mr-2" size={18} />
      <input
        type="text"
        placeholder={typedPlaceholder}
        className="bg-transparent w-full text-sm outline-none placeholder-gray-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {filteredRoadmaps.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white shadow-xl border mt-2 rounded-xl z-50 max-h-72 overflow-y-auto">
          {filteredRoadmaps.map((roadmap, i) => (
            <li
              key={roadmap._id}
              onClick={() => {
                navigate(`/roadmap/${roadmap._id}`);
                resetSearch();
              }}
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-all ${highlightedIndex === i
                ? "bg-blue-100"
                : "hover:bg-blue-50"
                }`}
              onMouseEnter={() => setHighlightedIndex(i)}
            >
              <img
                src={imageMap[roadmap.title] || "/fallback-image.jpg"}
                alt={roadmap.title}
                className="w-6 h-6 rounded object-cover"
              />
              <span className="text-sm">{roadmap.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="CareerCraft" className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex flex-1 justify-center">
              {renderSearchInput()}
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Link to="/" className={navLinkClass("/")}>Home</Link>
              <Link to="/dashboard" className={navLinkClass("/dashboard")}>Explore</Link>
              {user ? (
                <>
                  <Link to="/profile" className={navLinkClass("/profile")}>Profile</Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-semibold text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className={navLinkClass("/login")}>Login</Link>
                  <Link to="/signup" className={navLinkClass("/signup")}>Signup</Link>
                </>
              )}
              <Link to="/about" className={navLinkClass("/about")}>About Us</Link>
            </div>
            <div className="md:hidden">
              <button onClick={toggleMenu}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {!isMobileMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-white border-b sticky top-16 z-40">
          {renderSearchInput()}
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 space-y-2 border-t bg-white">
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={navLinkClass("/")}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className={navLinkClass("/dashboard")}
            >
              Explore
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={navLinkClass("/profile")}
                >
                  Profile
                </Link>
                <Link
                  to="/login"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={navLinkClass("/login")}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={navLinkClass("/signup")}
                >
                  Signup
                </Link>
              </>
            )}
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={navLinkClass("/about")}
            >
              About Us
            </Link>

          </div>
        </div>
      )}

    </>
  );
};

export default Navbar;
