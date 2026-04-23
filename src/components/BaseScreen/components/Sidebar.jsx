import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home, Calculator, RefreshCw, UserPlus,
  ChevronRight, Store, X,
} from "lucide-react";
import { APILogout } from "../../../API/APILogin";

function Sidebar({ isMobileOpen, onCloseMobile, org }) {
  const location = useLocation();
  const navigate  = useNavigate();
  const user      = JSON.parse(localStorage?.getItem("user")) || { username: "User" };

  const [expandedCategory, setExpandedCategory] = useState(null);

  const mainMenuItem = {
    title: "Home",
    icon:  <Home size={18} />,
    path:  "/basescreen",
    exact: true,
  };

  const menuCategories = useCallback(() => ({
    "Operations": [
      { title: "Cashier",               icon: <Calculator size={16} />, path: "/basescreen/cashier" },
      { title: "Invoice Return",        icon: <RefreshCw size={16} />,  path: "/basescreen/invoice-return" },
      { title: "Customer Registration", icon: <UserPlus size={16} />,   path: "/basescreen/customer-registration" },
    ],
  }), []);

  const toggleCategory = (category) =>
    setExpandedCategory(prev => prev === category ? null : category);

  const isActive = useCallback((path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  const isCategoryActive = useCallback((items) =>
    items.some(item => isActive(item.path, item.exact)),
  [isActive]);

  const handleNavigation = (path, e) => {
    e.preventDefault();
    navigate(path);
    setTimeout(() => { onCloseMobile?.(); }, 150);
  };

  const handleLogout = async () => {
    if (confirm("Are you sure you want to sign out?")) {
      await APILogout();
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const categories = menuCategories();
    for (const [category, items] of Object.entries(categories)) {
      if (isCategoryActive(items)) { setExpandedCategory(category); break; }
    }
  }, [isCategoryActive, menuCategories]);

  return (
    <aside
      className={`fixed lg:relative h-screen inset-y-0 left-0 flex flex-col z-30 w-64
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      style={{ background: "var(--sidebar-bg, #0a0f1e)" }}
    >

      {/* ── Brand area ── */}
      <div className="flex items-center justify-between h-16 px-5 flex-shrink-0"
           style={{ borderBottom: "1px solid var(--sidebar-border, rgba(255,255,255,0.06))" }}>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
            <Store size={16} className="text-indigo-400" />
          </div>
          <span className="text-white font-bold text-base tracking-tight truncate">
            {org?.name || "HyperPOS"}
          </span>
        </div>

        {/* Mobile close */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 hyper-scrollbar">

        {/* ─ Home ─ */}
        <div className="mb-1">
          <Link
            to={mainMenuItem.path}
            onClick={e => handleNavigation(mainMenuItem.path, e)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              isActive(mainMenuItem.path, mainMenuItem.exact)
                ? "bg-indigo-500/[0.15] text-indigo-400"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
            }`}
          >
            <span className={isActive(mainMenuItem.path, mainMenuItem.exact) ? "text-indigo-400" : "text-slate-500"}>
              {mainMenuItem.icon}
            </span>
            {mainMenuItem.title}
          </Link>
        </div>

        {/* ─ Divider ─ */}
        <div className="my-3 mx-1" style={{ borderTop: "1px solid var(--sidebar-border, rgba(255,255,255,0.06))" }} />

        {/* ─ Categories ─ */}
        <div className="space-y-0.5">
          {Object.entries(menuCategories()).map(([category, items]) => (
            <div key={category}>

              <button
                onClick={() => toggleCategory(category)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors duration-150 ${
                  isCategoryActive(items) ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <span>{category}</span>
                <ChevronRight
                  size={13}
                  className={`transition-transform duration-200 ${expandedCategory === category ? "rotate-90" : ""}`}
                />
              </button>

              <div className={`overflow-hidden transition-all duration-200 ${
                expandedCategory === category ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}>
                <div className="ml-2 mt-0.5 space-y-0.5">
                  {items.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={e => handleNavigation(item.path, e)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                        isActive(item.path, item.exact)
                          ? "bg-indigo-500/[0.15] text-indigo-400 font-medium"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                      }`}
                    >
                      <span className={isActive(item.path, item.exact) ? "text-indigo-400" : "text-slate-500"}>
                        {item.icon}
                      </span>
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </nav>

      {/* ── User footer ── */}
      <div className="flex-shrink-0 px-4 py-4"
           style={{ borderTop: "1px solid var(--sidebar-border, rgba(255,255,255,0.06))" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
            <span className="text-indigo-400 text-xs font-bold uppercase">
              {user.username?.[0] || "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">{user.username || "User"}</p>
            <p className="text-xs text-slate-500 truncate">Cashier</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors flex-shrink-0"
            title="Sign out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;
