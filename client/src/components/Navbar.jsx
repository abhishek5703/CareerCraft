import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const baseLinkClasses = "hover:text-blue-600 font-medium";
  const activeLinkClasses = "text-blue-600 font-semibold underline";
  const inactiveLinkClasses = "text-gray-700";

  return (
    <nav className="bg-white shadow-md px-6 py-3 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CareerCraft
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className={`${baseLinkClasses} ${isActive("/") ? activeLinkClasses : inactiveLinkClasses}`}
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className={`${baseLinkClasses} ${isActive("/dashboard") ? activeLinkClasses : inactiveLinkClasses}`}
          >
            Dashboard
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className={`${baseLinkClasses} ${isActive("/profile") ? activeLinkClasses : inactiveLinkClasses}`}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`${baseLinkClasses} ${isActive("/login") ? activeLinkClasses : inactiveLinkClasses}`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`${baseLinkClasses} ${isActive("/signup") ? activeLinkClasses : inactiveLinkClasses}`}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
