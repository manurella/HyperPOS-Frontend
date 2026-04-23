const NAV_ITEMS = [
  { id: "home",     label: "Home" },
  { id: "about",    label: "About Us" },
  { id: "features", label: "Features" },
  { id: "faq",      label: "FAQ" },
];

const Footer = () => {
  const handleNavClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "linear-gradient(145deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)" }}>

      {/* dot texture */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex flex-col md:flex-row items-start gap-12 mb-12 pb-12 border-b border-white/10">

            {/* Brand */}
            <div className="flex-1">
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/HyperPOS.svg" alt="HyperPOS" className="w-8 h-8 brightness-0 invert" />
                <span className="text-white font-bold text-xl">HyperPOS</span>
              </div>
              <p className="text-indigo-200 text-sm leading-relaxed max-w-xs">
                Empowering modern businesses with intelligent, minimal, and
                lightning-fast point-of-sale solutions.
              </p>
            </div>

            {/* Nav */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h3>
              <ul className="space-y-2.5">
                {NAV_ITEMS.map(({ id, label }) => (
                  <li key={id}>
                    <a href={`#${id}`} onClick={e => handleNavClick(e, id)}
                      className="text-indigo-200 hover:text-white text-sm transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
              <ul className="space-y-2.5 text-sm text-indigo-200">
                <li>info@hyperpos.io</li>
                <li>+1 (456) 789-1230</li>
                <li>New York, USA</li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-indigo-300/70">
              © {new Date().getFullYear()} HyperPOS. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <a href="#" className="text-xs text-indigo-300/70 hover:text-indigo-200 transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-indigo-300/70 hover:text-indigo-200 transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
