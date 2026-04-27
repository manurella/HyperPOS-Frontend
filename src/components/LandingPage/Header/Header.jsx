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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <a href="#home" onClick={e => handleNavClick(e, "home")} className="flex items-center gap-2.5">
          <img src="/HyperPOS.svg" alt="HyperPOS" className="w-7 h-7 object-contain" />
          <span className="font-bold text-zinc-900 text-base tracking-tight">HyperPOS</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={e => handleNavClick(e, id)}
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                activeLink === id
                  ? "text-blue-600 bg-blue-50"
                  : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/login")} className="pos-btn-primary">
            Sign In
          </button>
          <button
            className="md:hidden p-2 rounded-md text-zinc-500 hover:bg-zinc-100 transition-colors"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-3">
            {NAV_ITEMS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={e => handleNavClick(e, id)}
                className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  activeLink === id
                    ? "text-blue-600 bg-blue-50"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
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
