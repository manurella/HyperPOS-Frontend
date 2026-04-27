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
    <div className="flex h-screen overflow-hidden bg-zinc-100">

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <Sidebar onCloseMobile={closeSidebar} isMobileOpen={sidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden bg-white border-l border-zinc-200">
        <Topbar onMenuToggle={toggleSidebar} />
        <main className="flex-1 overflow-auto p-6 sm:p-8 bg-zinc-100">
          <Outlet />
        </main>
      </div>

    </div>
  );
}

export default DashboardLayout;
