import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar  from "../components/Topbar";
import Loader  from "../../UI/Loader";

function DashboardLayout() {
  const [loading,     setLoading]     = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("user"))?.roles;
    if (role !== "ROLE_ADMIN") { navigate("/"); return; }
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F4EF]">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[rgba(26,25,21,0.55)] z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar onCloseMobile={() => setSidebarOpen(false)} isMobileOpen={sidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden border-l border-[#E8E5DC]">
        <Topbar onMenuToggle={() => setSidebarOpen(p => !p)} />
        <main className="flex-1 overflow-auto p-7 bg-[#F5F4EF]">
          <div className="max-w-[1280px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
