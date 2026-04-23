import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNavProvider } from "../../Navigation/NavProvider";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { id: "home",     label: "Home" },
  { id: "about",    label: "About Us" },
  { id: "features", label: "Features" },
  { id: "faq",      label: "FAQ" },
];

const Header = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { activeLink, setActiveLink } = useNavProvider();

  const handleNavClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveLink(id);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <a href="#home" onClick={e => handleNavClick(e, "home")} className="flex items-center gap-2.5">
          <img src="/HyperPOS.svg" alt="HyperPOS" className="w-8 h-8 object-contain" />
          <span className="font-bold text-slate-800 text-lg tracking-tight">HyperPOS</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={e => handleNavClick(e, id)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeLink === id
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
          >
            Sign In
          </button>
          <button
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-3">
            {NAV_ITEMS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={e => handleNavClick(e, id)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeLink === id
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
