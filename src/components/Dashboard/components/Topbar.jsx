import { useState, useEffect } from "react";
import { LogOut, Menu, Clock, Bell, ChevronDown } from "lucide-react";
import { APILogout } from "../../../API/APILogin";

function Topbar({ onMenuToggle }) {

  const [time, setTime]                     = useState(new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const user = JSON.parse(localStorage?.getItem("user")) || { username: "Admin" };

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit", minute: "2-digit",
  });

  const formattedDate = time.toLocaleDateString([], {
    weekday: "short", month: "short", day: "numeric",
  });

  const handleLogout = () => setShowLogoutModal(true);

  const confirmLogout = async () => {
    await APILogout();
    window.location.href = "/";
  };

  return (
    <>
      {/* -- Topbar -- */}
      <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-4 md:px-6 flex-shrink-0 z-20">

        {/* Left: hamburger + page context */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            className="p-2 rounded-lg text-zinc-600 hover:text-zinc-700 hover:bg-zinc-100 transition-colors lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          {/* Date / time — desktop */}
          <div className="hidden sm:flex items-center gap-1.5 text-zinc-500 text-sm">
            <Clock size={14} className="text-zinc-500" />
            <span className="font-medium text-zinc-700/80">{formattedTime}</span>
            <span className="text-zinc-700/30">Â·</span>
            <span className="text-zinc-500">{formattedDate}</span>
          </div>
        </div>

        {/* Right: notification bell + user menu */}
        <div className="flex items-center gap-2">

          {/* Bell */}
          <button
            className="relative p-2 rounded-lg text-zinc-500 hover:text-zinc-700/80 hover:bg-zinc-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-zinc-200/50" />

          {/* User avatar + logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-lg hover:bg-zinc-100 transition-colors group"
            aria-label="User menu"
          >
            <div className="w-7 h-7 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 text-xs font-bold uppercase">
                {user.username?.[0] || "A"}
              </span>
            </div>
            <span className="hidden md:block text-sm font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors">
              {user.username || "Admin"}
            </span>
            <LogOut size={15} className="text-zinc-500 group-hover:text-zinc-700/80 transition-colors" />
          </button>

        </div>
      </header>

      {/* -- Logout Modal -- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setShowLogoutModal(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            {/* Header */}
            <div className="px-6 py-4 border-b border-zinc-100/10 bg-zinc-100/30/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <LogOut size={18} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900">Sign Out</h3>
                  <p className="text-xs text-zinc-600 font-medium">Return to login screen</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <p className="text-sm text-zinc-700/80">
                Are you sure you want to sign out of <span className="font-semibold text-zinc-900">HyperPOS</span>? Any unsaved changes will be lost.
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-zinc-100/30 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="pos-btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="pos-btn-danger"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Topbar;
