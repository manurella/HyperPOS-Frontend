import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home, Calculator, RefreshCw, UserPlus,
  ChevronRight, Store, X
} from "lucide-react";
import { APILogout } from "../../../API/APILogin";

function Sidebar({ isMobileOpen, onCloseMobile, org }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user     = JSON.parse(localStorage?.getItem("user")) || { username: "User" };

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

  useEffect(() => {
    const categories = menuCategories();
    for (const [category, items] of Object.entries(categories)) {
      if (isCategoryActive(items)) { setExpandedCategory(category); break; }
    }
  }, [isCategoryActive, menuCategories]);

  return (
    <aside
      className={`fixed lg:relative h-full inset-y-0 left-0 flex flex-col z-50 w-64 bg-[#0c0c0e] overflow-hidden
        transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >

      {/* Brand */}
      <div className="flex items-center justify-between h-[4.5rem] px-5 flex-shrink-0 border-b border-white/[0.07]">
        <div className="flex items-center gap-3">
          <img src="/HyperPOS.svg" alt="HyperPOS" className="w-7 h-7 object-contain brightness-0 invert" />
          <span className="text-white font-semibold text-[1rem] tracking-tight truncate">
            {org?.name || "HyperPOS"}
          </span>
        </div>
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 hyper-scrollbar">

        <div className="mb-1">
          <Link
            to={mainMenuItem.path}
            onClick={e => handleNavigation(mainMenuItem.path, e)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 group ${
              isActive(mainMenuItem.path, mainMenuItem.exact)
                ? "bg-blue-600/15 text-white"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <span className={isActive(mainMenuItem.path, mainMenuItem.exact) ? "text-blue-400" : "text-zinc-600 group-hover:text-zinc-400"}>
              {mainMenuItem.icon}
            </span>
            {mainMenuItem.title}
          </Link>
        </div>

        <div className="my-3 h-[1px] bg-white/[0.06]" />

        <div className="space-y-0.5">
          {Object.entries(menuCategories()).map(([category, items]) => {
            const categoryActive = isCategoryActive(items);
            const isExpanded     = expandedCategory === category;
            return (
              <div key={category}>

                <button
                  onClick={() => toggleCategory(category)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-[0.68rem] font-semibold uppercase tracking-[0.1em] transition-colors duration-150 ${
                    categoryActive || isExpanded ? "text-zinc-300" : "text-zinc-600 hover:text-zinc-400"
                  }`}
                >
                  <span>{category}</span>
                  <ChevronRight
                    size={13}
                    className={`transition-transform duration-200 ${isExpanded ? "rotate-90 text-blue-400" : "text-zinc-700"}`}
                  />
                </button>

                <div className={`overflow-hidden transition-all duration-200 ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="ml-4 pl-3 border-l border-white/[0.07] space-y-0.5 py-1">
                    {items.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.path}
                        onClick={e => handleNavigation(item.path, e)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-[0.84rem] transition-colors duration-150 group relative ${
                          isActive(item.path, item.exact)
                            ? "text-white font-medium bg-blue-600/10"
                            : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]"
                        }`}
                      >
                        {isActive(item.path, item.exact) && (
                          <span className="absolute -left-[13px] top-1/2 -translate-y-1/2 w-[2px] h-3.5 bg-blue-500 rounded-r-sm" />
                        )}
                        <span className={isActive(item.path, item.exact) ? "text-blue-400" : "text-zinc-600 group-hover:text-zinc-400"}>
                          {item.icon}
                        </span>
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </nav>

      {/* User footer */}
      <div className="flex-shrink-0 px-4 py-3 border-t border-white/[0.07]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center flex-shrink-0">
            <span className="text-blue-400 text-xs font-bold uppercase">
              {user.username?.[0] || "U"}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white truncate">{user.username || "User"}</p>
            <p className="text-xs text-zinc-500 truncate">Cashier</p>
          </div>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;
