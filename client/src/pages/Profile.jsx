import { useAuth } from "../context/AuthContext";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();

  if (!user)
    return <div className="text-center mt-20 text-gray-600 text-lg">Loading profile...</div>;

  // Utility for initials avatar
  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8 text-gray-800">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold mb-4 shadow-md">
            {getInitials(user.name)}
          </div>

          <h2 className="text-2xl font-extrabold text-blue-700 mb-1">{user.name}</h2>
          <p className="text-gray-600 text-sm mb-6">Your personalized CareerCraft profile</p>

          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
              <FaUserCircle className="text-blue-500 text-xl" />
              <span className="text-gray-700 font-medium">{user.name}</span>
            </div>

            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
              <FaEnvelope className="text-blue-500 text-xl" />
              <span className="text-gray-700 font-medium">{user.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
