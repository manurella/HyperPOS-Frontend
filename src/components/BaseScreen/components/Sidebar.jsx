import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeftRight, UserPlus, X, LogOut } from "lucide-react";
import { APILogout } from "../../../API/APILogin";

function Sidebar({ isMobileOpen, onCloseMobile, org }) {
  const location = useLocation();
  const navigate  = useNavigate();
  const user      = JSON.parse(localStorage?.getItem("user")) || { username: "User" };

  const navItems = [
    { title: "POS / Cashier",         icon: <ShoppingCart size={17} />,    path: "/basescreen/cashier" },
    { title: "Invoice Return",         icon: <ArrowLeftRight size={17} />,  path: "/basescreen/invoice-return" },
    { title: "Register Customer",      icon: <UserPlus size={17} />,        path: "/basescreen/customer-registration" },
  ];

  const isActive = useCallback((path) => location.pathname.startsWith(path), [location.pathname]);

  const handleNav = (path, e) => {
    e.preventDefault();
    navigate(path);
    setTimeout(() => onCloseMobile?.(), 150);
  };

  const handleLogout = async () => {
    await APILogout();
    window.location.href = "/";
  };

  return (
    <aside
      className={`fixed lg:relative h-full inset-y-0 left-0 flex flex-col z-50 w-60
        bg-[#1A1915] border-r border-[#2E2C28] overflow-hidden
        transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      {/* Brand */}
      <div className="flex items-center justify-between h-16 px-5 flex-shrink-0 border-b border-[#2E2C28]">
        <div className="flex items-center gap-2.5 min-w-0">
          <img src="/HyperPOS.svg" alt="HyperPOS" className="w-5 h-5 object-contain brightness-0 invert flex-shrink-0" />
          <span className="text-[#E8E6DF] font-semibold text-[15px] tracking-tight truncate">
            {org?.name || "HyperPOS"}
          </span>
        </div>
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-md text-[#7A786F] hover:text-[#E8E6DF] hover:bg-white/[0.06] transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => handleNav(item.path, e)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors duration-[120ms] group relative ${
                  active
                    ? "bg-[rgba(79,122,63,0.12)] text-[#E8E6DF]"
                    : "text-[#7A786F] hover:text-[#B8B4AB] hover:bg-white/[0.04]"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#4F7A3F] rounded-r-sm" />
                )}
                <span className={active ? "text-[#4F7A3F]" : "text-[#4A4845] group-hover:text-[#7A786F]"}>
                  {item.icon}
                </span>
                {item.title}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User footer */}
      <div className="flex-shrink-0 px-4 py-3 border-t border-[#2E2C28]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#2E2C28] flex items-center justify-center flex-shrink-0">
            <span className="text-[#4F7A3F] text-[11px] font-bold uppercase">{user.username?.[0] || "U"}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium text-[#E8E6DF] truncate">{user.username || "User"}</p>
            <p className="text-[11px] text-[#7A786F] truncate">Cashier</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-md text-[#7A786F] hover:text-[#C0392B] hover:bg-[rgba(192,57,43,0.10)] transition-colors"
            title="Sign out"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
