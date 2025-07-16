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
  const { roadmaps, loading } = useRoadmaps();
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
  const searchTimeout = useRef(null);
  const inputRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `block w-full text-left px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
      isActive(path)
        ? "text-blue-600 font-semibold bg-blue-100"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    typingInterval.current = setInterval(() => {
      const currentText = animatedPlaceholders[placeholderIndex.current];
      if (direction.current === "forward") {
        setTypedPlaceholder((prev) => prev + currentText.charAt(charIndex.current));
        charIndex.current++;
        if (charIndex.current === currentText.length) {
          direction.current = "backward";
        }
      } else {
        setTypedPlaceholder((prev) => prev.slice(0, -1));
        if (typedPlaceholder.length === 0) {
          direction.current = "forward";
          placeholderIndex.current = (placeholderIndex.current + 1) % animatedPlaceholders.length;
          charIndex.current = 0;
        }
      }
    }, 15);
    return () => clearInterval(typingInterval.current);
  }, [typedPlaceholder]);

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setFilteredRoadmaps([]);
        setHighlightedIndex(-1);
      } else {
        const results = roadmaps.filter((r) =>
          r.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRoadmaps(results);
        setHighlightedIndex(0);
      }
    }, 300);
    return () => clearTimeout(searchTimeout.current);
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
    if (filteredRoadmaps.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < filteredRoadmaps.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredRoadmaps.length - 1));
    } else if (e.key === "Enter" && highlightedIndex !== -1) {
      const selected = filteredRoadmaps[highlightedIndex];
      navigate(`/roadmap/${selected._id}`);
      setSearchTerm("");
      setFilteredRoadmaps([]);
      setIsMobileMenuOpen(false);
    } else if (e.key === "Escape") {
      setFilteredRoadmaps([]);
    }
  };

  const renderSearchInput = () => (
    <div
      ref={inputRef}
      className="relative flex items-center bg-gray-100 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400 focus-within:bg-white transition w-full md:w-[32rem]"
    >
      <Search className="text-gray-500 mr-2" size={18} />
      <input
        type="text"
        placeholder={typedPlaceholder}
        className="bg-transparent w-full outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {(filteredRoadmaps.length > 0 || loading || searchTerm.trim()) && (
        <ul className="absolute bg-white border mt-1 rounded-md w-full max-h-64 overflow-y-auto z-50 shadow-lg left-0 top-full">
          {renderSearchDropdown()}
        </ul>
      )}
    </div>
  );

  const renderSearchDropdown = () => {
    if (loading) return <li className="px-4 py-2 text-gray-500 text-sm">Loading...</li>;
    if (searchTerm.trim() && filteredRoadmaps.length === 0)
      return <li className="px-4 py-2 text-gray-500 text-sm">No matching roadmaps</li>;
    return filteredRoadmaps.map((roadmap, index) => (
      <li
        key={roadmap._id}
        className={`flex items-center gap-2 px-4 py-2 cursor-pointer ${
          index === highlightedIndex ? "bg-blue-100" : "hover:bg-blue-50"
        }`}
        onMouseEnter={() => setHighlightedIndex(index)}
        onClick={() => {
          navigate(`/roadmap/${roadmap._id}`);
          setSearchTerm("");
          setFilteredRoadmaps([]);
          setIsMobileMenuOpen(false);
        }}
      >
        <img
          src={imageMap[roadmap.title] || "/fallback-image.jpg"}
          alt={roadmap.title}
          className="w-6 h-6 rounded object-cover"
        />
        <span>{roadmap.title}</span>
      </li>
    ));
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="CareerCraft Logo"
                className="h-9 md:h-12 w-auto object-contain"
              />
            </Link>
            <div className="relative hidden md:flex items-center w-full max-w-xl">
              {renderSearchInput()}
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className={navLinkClass("/")}>Home</Link>
              <Link to="/dashboard" className={navLinkClass("/dashboard")}>Explore</Link>
              {user ? (
                <>
                  <Link to="/profile" className={navLinkClass("/profile")}>Profile</Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
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
            </div>
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-700 hover:text-blue-600">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {!isMobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 shadow-sm sticky top-16 z-40">
          {renderSearchInput()}
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 space-y-2 border-t bg-white">
          <div className="flex flex-col space-y-2">
            <Link to="/" className={navLinkClass("/")}>Home</Link>
            <Link to="/dashboard" className={navLinkClass("/dashboard")}>Explore</Link>
            {user ? (
              <>
                <Link to="/profile" className={navLinkClass("/profile")}>Profile</Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="text-red-600 hover:text-red-800 block px-4 py-2 rounded-md text-sm font-medium text-left"
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
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
