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
    <div className="flex h-screen overflow-hidden bg-[#F5F4EF]">

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[rgba(26,25,21,0.55)] z-40 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <Sidebar isMobileOpen={sidebarOpen} onCloseMobile={closeSidebar} org={org} />

      <div className="flex flex-col flex-1 overflow-hidden border-l border-[#E8E5DC]">
        <Topbar org={org} onMenuToggle={toggleSidebar} />
        <main className="flex-1 overflow-auto p-7 bg-[#F5F4EF]">
          <div className="max-w-[1280px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
}

export default BaseScreenLayout;
