import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar  from "../components/Topbar";
import Loader  from "../../UI/Loader";

import { getOrgInfo } from "../../../API/APIOrg";

function BaseScreenLayout() {
  const [loading,     setLoading]     = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [org,         setOrg]         = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("user"))?.roles;
    if (role !== "ROLE_USER") {
      navigate("/");
      return;
    }
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getOrgInfo().then(setOrg).catch(err => console.error("Org fetch error:", err));
  }, []);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar  = () => setSidebarOpen(false);

  if (loading) return <Loader />;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-20 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isMobileOpen={sidebarOpen}
        onCloseMobile={closeSidebar}
        org={org}
      />

      {/* Right column */}
      <div className="flex flex-col flex-1 overflow-hidden">

        <Topbar org={org} onMenuToggle={toggleSidebar} />

        <main className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-50">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default BaseScreenLayout;
