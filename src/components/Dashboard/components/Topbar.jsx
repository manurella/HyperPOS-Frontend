import { useState } from "react";
import { Menu, Bell, LogOut, X } from "lucide-react";
import { APILogout } from "../../../API/APILogin";

function Topbar({ onMenuToggle }) {
  const [showLogout, setShowLogout] = useState(false);
  const user = JSON.parse(localStorage?.getItem("user")) || { username: "Admin" };

  const confirmLogout = async () => {
    await APILogout();
    window.location.href = "/";
  };

  return (
    <>
      <header className="h-16 bg-[#FAFAF7] border-b border-[#E8E5DC] flex items-center justify-between px-4 md:px-6 flex-shrink-0 z-20">

        {/* Left */}
        <button
          type="button"
          onClick={onMenuToggle}
          className="p-2 rounded-lg text-[#5C5A54] hover:bg-[#EEECE5] transition-colors lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Right */}
        <div className="flex items-center gap-2 ml-auto">
          <button className="relative p-2 rounded-lg text-[#8C8A82] hover:text-[#1A1915] hover:bg-[#EEECE5] transition-colors">
            <Bell size={18} />
          </button>

          <div className="w-px h-5 bg-[#E8E5DC]" />

          <button
            onClick={() => setShowLogout(true)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-[#EEECE5] transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#E6F0E1] flex items-center justify-center flex-shrink-0">
              <span className="text-[#4F7A3F] text-[13px] font-bold uppercase">
                {user.username?.[0] || "A"}
              </span>
            </div>
            <span className="hidden md:block text-sm font-medium text-[#1A1915]">{user.username || "Admin"}</span>
            <LogOut size={14} className="text-[#8C8A82] group-hover:text-[#C0392B] transition-colors" />
          </button>
        </div>
      </header>

      {/* Logout modal */}
      {showLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[rgba(26,25,21,0.45)] backdrop-blur-[4px]" onClick={() => setShowLogout(false)} />
          <div className="relative w-full max-w-sm bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(26,25,21,0.18)' }}>

            <div className="px-6 py-5 border-b border-[#E8E5DC] flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#FAEBE9] flex items-center justify-center flex-shrink-0">
                  <LogOut size={20} className="text-[#C0392B]" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#1A1915]">Sign Out</h3>
                  <p className="text-xs text-[#8C8A82] mt-0.5">You'll be returned to the login screen.</p>
                </div>
              </div>
              <button onClick={() => setShowLogout(false)} className="p-1.5 rounded-lg text-[#8C8A82] hover:bg-[#EEECE5] transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="px-6 py-4 text-sm text-[#5C5A54]">
              Are you sure you want to sign out of <span className="font-semibold text-[#1A1915]">HyperPOS</span>? Any unsaved changes will be lost.
            </div>

            <div className="px-6 py-4 bg-[#FAFAF7] border-t border-[#E8E5DC] flex justify-end gap-3">
              <button onClick={() => setShowLogout(false)} className="btn-secondary">Cancel</button>
              <button onClick={confirmLogout} className="btn-danger">
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Topbar;
