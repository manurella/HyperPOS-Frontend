
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Loader from "../../UI/Loader";

function DashboardLayout() {

  const [loading, setLoading]         = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate                      = useNavigate();

  useEffect(() => {

    const role = JSON.parse(localStorage.getItem("user"))?.roles;
    if (role === "ROLE_ADMIN") {
      setLoading(false);
    } else {
      setLoading(true);
      navigate("/");
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2950);

    return () => clearTimeout(timer);

  }, []);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar  = () => setSidebarOpen(false);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-20 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar onCloseMobile={closeSidebar} isMobileOpen={sidebarOpen} />

      {/* Right column */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Topbar */}
        <Topbar onMenuToggle={toggleSidebar} />

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-50">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;
