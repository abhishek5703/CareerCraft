import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, ChevronRight, LogOut, Menu, Search, UserRound, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRoadmaps } from "../context/RoadmapContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { roadmaps } = useRoadmaps();
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);

  const filteredRoadmaps = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return [];
    return roadmaps
      .filter((roadmap) => `${roadmap.title || ""} ${roadmap.category || ""}`.toLowerCase().includes(query))
      .slice(0, 6);
  }, [roadmaps, searchTerm]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => setHighlightedIndex(0), [searchTerm]);

  const resetSearch = () => {
    setSearchTerm("");
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  const openRoadmap = (roadmap) => {
    navigate(`/roadmap/${roadmap._id}`);
    resetSearch();
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "ArrowDown" && filteredRoadmaps.length) {
      event.preventDefault();
      setHighlightedIndex((current) => (current + 1) % filteredRoadmaps.length);
    } else if (event.key === "ArrowUp" && filteredRoadmaps.length) {
      event.preventDefault();
      setHighlightedIndex((current) => (current - 1 + filteredRoadmaps.length) % filteredRoadmaps.length);
    } else if (event.key === "Enter" && filteredRoadmaps[highlightedIndex]) {
      event.preventDefault();
      openRoadmap(filteredRoadmaps[highlightedIndex]);
    } else if (event.key === "Escape") {
      setSearchOpen(false);
    }
  };

  const isActive = (path) => location.pathname === path || (path !== "/" && location.pathname.startsWith(`${path}/`));
  const navLinkClass = (path) => `nav-link${isActive(path) ? " is-active" : ""}`;

  const renderSearch = (mobile = false) => (
    <div className={`nav-search-wrap${mobile ? " mobile-search-wrap" : ""}`}>
      <div className={`nav-search${searchOpen ? " is-focused" : ""}`}>
        <Search size={18} aria-hidden="true" />
        <input
          type="search"
          value={searchTerm}
          placeholder="Search career roadmaps..."
          aria-label="Search career roadmaps"
          aria-expanded={searchOpen && filteredRoadmaps.length > 0}
          aria-controls={`roadmap-search-results-${mobile ? "mobile" : "desktop"}`}
          onFocus={() => setSearchOpen(true)}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setSearchOpen(true);
          }}
          onKeyDown={handleSearchKeyDown}
        />
        <kbd className="search-shortcut">⌘ K</kbd>
      </div>
      {searchOpen && searchTerm.trim() && (
        <div id={`roadmap-search-results-${mobile ? "mobile" : "desktop"}`} className="search-results" role="listbox" aria-label="Roadmap search results">
          {filteredRoadmaps.length ? filteredRoadmaps.map((roadmap, index) => (
            <button
              className={`search-result${highlightedIndex === index ? " is-highlighted" : ""}`}
              type="button"
              role="option"
              aria-selected={highlightedIndex === index}
              key={roadmap._id}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => openRoadmap(roadmap)}
            >
              <span className="search-result-icon"><Search size={15} /></span>
              <span className="search-result-copy">
                <strong>{roadmap.title}</strong>
                <small>{roadmap.category || "Career roadmap"}</small>
              </span>
              <ChevronRight size={16} />
            </button>
          )) : (
            <p className="search-empty">No roadmaps match “{searchTerm.trim()}”.</p>
          )}
        </div>
      )}
    </div>
  );

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-nav" ref={searchRef}>
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="CareerCraft home" onClick={resetSearch}>
          <img src="/logo.png" alt="CareerCraft" />
        </Link>

        <div className="nav-search-desktop">
          {renderSearch()}
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          <Link to="/" className={navLinkClass("/")}>Home</Link>
          <Link to="/dashboard" className={navLinkClass("/dashboard")}>Explore</Link>
          <Link to="/about" className={navLinkClass("/about")}>About</Link>
          {user ? (
            <>
              <Link to="/profile" className={`nav-link nav-profile${isActive("/profile") ? " is-active" : ""}`}>
                <UserRound size={16} /> Profile
              </Link>
              <button type="button" className="nav-logout" onClick={handleLogout}>
                <LogOut size={15} /> <span>Log out</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={navLinkClass("/login")}>Log in</Link>
              <Link to="/signup" className="nav-signup">Get started <ArrowUpRight size={15} /></Link>
            </>
          )}
        </nav>

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className="nav-search-mobile">
        {renderSearch(true)}
      </div>

      {mobileMenuOpen && (
        <div className="mobile-nav-panel">
          <Link to="/" className={navLinkClass("/")}>Home</Link>
          <Link to="/dashboard" className={navLinkClass("/dashboard")}>Explore roadmaps</Link>
          <Link to="/about" className={navLinkClass("/about")}>About CareerCraft</Link>
          {user ? (
            <>
              <Link to="/profile" className={navLinkClass("/profile")}>Your profile</Link>
              <button type="button" className="mobile-logout" onClick={handleLogout}><LogOut size={16} /> Log out</button>
            </>
          ) : (
            <div className="mobile-auth-actions">
              <Link to="/login" className="btn-secondary">Log in</Link>
              <Link to="/signup" className="btn-primary">Create account <ArrowUpRight size={16} /></Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;