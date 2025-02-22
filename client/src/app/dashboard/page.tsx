"use client";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "../redux/slices/authSlice";
import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  if (!token) return null; // prevents rendering while redirecting

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-700">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <NavItem icon={FiHome} label="Home" />
          <NavItem icon={FiUser} label="Profile" />
          <NavItem icon={FiSettings} label="Settings" />
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center text-red-600 hover:text-red-800"
        >
          <FiLogOut className="mr-2" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Navigation */}
        <header className="bg-white shadow-md p-4 rounded-lg mb-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Welcome, {user?.name || "Guest"} 👋 </h1>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <span className="text-gray-600">{user?.name || "Unknown"}</span>
          </div>
        </header>

        {/* Content */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Total Users" value="1,250" />
          <Card title="Revenue" value="$32,000" />
          <Card title="Active Sessions" value="487" />
        </section>
      </main>
    </div>
  );
};

// Sidebar Nav Item
const NavItem = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <button className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
    <Icon className="text-xl" />
    <span className="text-lg">{label}</span>
  </button>
);

// Card Component
const Card = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-white shadow-lg p-6 rounded-lg">
    <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
    <p className="text-2xl font-bold mt-2 text-gray-800">{value}</p>
  </div>
);

export default Dashboard;
