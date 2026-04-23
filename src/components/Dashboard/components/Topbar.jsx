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
      {/* ── Topbar ── */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 flex-shrink-0 z-20">

        {/* Left: hamburger + page context */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          {/* Date / time — desktop */}
          <div className="hidden sm:flex items-center gap-1.5 text-slate-400 text-sm">
            <Clock size={14} className="text-slate-400" />
            <span className="font-medium text-slate-600">{formattedTime}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-400">{formattedDate}</span>
          </div>
        </div>

        {/* Right: notification bell + user menu */}
        <div className="flex items-center gap-2">

          {/* Bell */}
          <button
            className="relative p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-slate-200" />

          {/* User avatar + logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors group"
            aria-label="User menu"
          >
            <div className="w-7 h-7 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-600 text-xs font-bold uppercase">
                {user.username?.[0] || "A"}
              </span>
            </div>
            <span className="hidden md:block text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
              {user.username || "Admin"}
            </span>
            <LogOut size={15} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
          </button>

        </div>
      </header>

      {/* ── Logout Modal ── */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setShowLogoutModal(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-sm hyper-modal-container rounded-2xl overflow-hidden hyper-modal-appear">

            {/* Header */}
            <div className="hyper-modal-header px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
                  <LogOut size={18} className="text-red-500" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-800">Sign Out</h3>
                  <p className="text-xs text-slate-500 mt-0.5">You will be returned to the login screen</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <p className="text-sm text-slate-600">
                Are you sure you want to sign out of <strong>HyperPOS</strong>? Any unsaved changes will be lost.
              </p>

              {/* Terminal info block */}
              <div className="mt-4 rounded-lg bg-slate-900 px-4 py-3 hyper-modal-terminal">
                <p className="hyper-typing-effect-2 hyper-terminal-text text-xs">
                  $ session.invalidate() — token will be revoked
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="pos-btn-secondary text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
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
