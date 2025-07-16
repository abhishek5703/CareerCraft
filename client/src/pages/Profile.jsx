import { useAuth } from "../context/AuthContext";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();

  if (!user)
    return <div className="text-center mt-20 text-gray-600 text-lg">Loading profile...</div>;

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:py-16 bg-gradient-to-br from-white to-blue-50">
      <div className="w-full max-w-md sm:max-w-lg bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-6 sm:p-8 text-gray-800">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="mb-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl sm:text-4xl font-bold shadow ring-4 ring-blue-300">
              {getInitials(user.name)}
            </div>
          </div>

          {/* User Name */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-1 text-center">{user.name}</h2>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Welcome to your CareerCraft profile
          </p>

          {/* Info Cards */}
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow transition">
              <FaUserCircle className="text-indigo-600 text-xl" />
              <span className="text-gray-800 font-medium break-all">{user.name}</span>
            </div>

            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow transition">
              <FaEnvelope className="text-indigo-600 text-xl" />
              <span className="text-gray-800 font-medium break-all">{user.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
