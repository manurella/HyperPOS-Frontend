import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNavProvider } from "../../Navigation/NavProvider";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { id: "features", label: "Features" },
  { id: "faq",      label: "FAQ" },
  { id: "about",    label: "About" },
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F4EF]/95 backdrop-blur border-b border-[#E8E5DC] h-16">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">

        {/* Brand */}
        <a href="#home" onClick={e => handleNavClick(e, "home")} className="flex items-center gap-2.5">
          <img src="/HyperPOS.svg" alt="HyperPOS" className="w-6 h-6 object-contain" />
          <span className="font-semibold text-[#1A1915] text-base tracking-tight">HyperPOS</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={e => handleNavClick(e, id)}
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors duration-[120ms] ${
                activeLink === id
                  ? "text-[#4F7A3F] bg-[#E6F0E1]"
                  : "text-[#5C5A54] hover:text-[#1A1915]"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="hidden sm:inline-flex items-center gap-2 border-[1.5px] border-[#D4D0C4] text-[#1A1915] bg-transparent hover:bg-[#EEECE5] text-sm font-medium px-4 py-2 rounded-lg transition-all duration-[120ms]"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="inline-flex items-center gap-2 bg-[#4F7A3F] hover:bg-[#3D6030] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-[120ms] active:scale-[0.98]"
          >
            Get Started
          </button>
          <button
            className="md:hidden p-2 rounded-md text-[#5C5A54] hover:bg-[#EEECE5] transition-colors"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E8E5DC] bg-[#F5F4EF] px-6 pb-5">
          <nav className="flex flex-col gap-1 pt-3">
            {NAV_ITEMS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={e => handleNavClick(e, id)}
                className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  activeLink === id ? "text-[#4F7A3F] bg-[#E6F0E1]" : "text-[#5C5A54] hover:text-[#1A1915]"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex gap-3 mt-4">
            <button onClick={() => { navigate("/login"); setMobileOpen(false); }}
              className="flex-1 border-[1.5px] border-[#D4D0C4] text-[#1A1915] bg-transparent hover:bg-[#EEECE5] text-sm font-medium py-2.5 rounded-lg transition-all">
              Sign In
            </button>
            <button onClick={() => { navigate("/signup"); setMobileOpen(false); }}
              className="flex-1 bg-[#4F7A3F] hover:bg-[#3D6030] text-white text-sm font-semibold py-2.5 rounded-lg transition-all">
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
