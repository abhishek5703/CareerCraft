import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useRoadmaps } from "../context/RoadmapContext";
import { Menu, X } from "lucide-react";

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

const Navbar = () => {
  const { user, logout } = useAuth();
  const { roadmaps, loading } = useRoadmaps();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRoadmaps, setFilteredRoadmaps] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchTimeout = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `block px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${isActive(path)
      ? "text-blue-600 font-semibold underline"
      : "text-gray-700 hover:text-blue-600"
    }`;

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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

  const handleKeyDown = (e) => {
    if (filteredRoadmaps.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredRoadmaps.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredRoadmaps.length - 1
      );
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

  const renderSearchDropdown = () => {
    if (loading) {
      return <li className="px-4 py-2 text-gray-500 text-sm">Loading roadmaps...</li>;
    }

    if (searchTerm.trim() && filteredRoadmaps.length === 0) {
      return <li className="px-4 py-2 text-gray-500 text-sm">No matching roadmaps</li>;
    }

    return filteredRoadmaps.map((roadmap, index) => (
      <li
        key={roadmap._id}
        className={`flex items-center gap-2 px-4 py-2 cursor-pointer ${index === highlightedIndex ? "bg-blue-100" : "hover:bg-blue-50"
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
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="CareerCraft Logo"
                className="h-12.5 w-auto object-contain"
              />
            </Link>


            {/* Desktop search */}
            <div className="relative hidden md:block w-96">
              <input
                type="text"
                placeholder="Search roadmaps..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {(filteredRoadmaps.length > 0 || loading || searchTerm.trim()) && (
                <ul className="absolute bg-white border mt-1 rounded-md w-full max-h-64 overflow-y-auto z-50 shadow-lg">
                  {renderSearchDropdown()}
                </ul>
              )}
            </div>

            {/* Desktop links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className={navLinkClass("/")}>Home</Link>
              <Link to="/dashboard" className={navLinkClass("/dashboard")}>Dashboard</Link>
              {user ? (
                <>
                  <Link to="/profile" className={navLinkClass("/profile")}>Profile</Link>
                  <button onClick={handleLogout} className="text-red-600 hover:text-red-800 text-sm font-medium">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className={navLinkClass("/login")}>Login</Link>
                  <Link to="/signup" className={navLinkClass("/signup")}>Signup</Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-700 hover:text-blue-600">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile search (only when menu is closed) */}
      {!isMobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 shadow-sm sticky top-16 z-40">
          <div className="relative">
            <input
              type="text"
              placeholder="Search roadmaps..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {(filteredRoadmaps.length > 0 || loading || searchTerm.trim()) && (
              <ul className="absolute bg-white border mt-1 rounded-md w-full max-h-64 overflow-y-auto z-50 shadow-lg">
                {renderSearchDropdown()}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Mobile nav links */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-1 border-t">
          <Link to="/" className={navLinkClass("/")}>Home</Link>
          <Link to="/dashboard" className={navLinkClass("/dashboard")}>Dashboard</Link>
          {user ? (
            <>
              <Link to="/profile" className={navLinkClass("/profile")}>Profile</Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="text-red-600 hover:text-red-800 block px-3 py-2 rounded-md text-sm font-medium"
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
      )}
    </>
  );
};

export default Navbar;
