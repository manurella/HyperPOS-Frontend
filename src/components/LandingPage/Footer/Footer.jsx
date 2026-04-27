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
    <footer className="bg-[#0c0c0e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">

        <div className="flex flex-col md:flex-row items-start gap-12 mb-12 pb-12 border-b border-white/[0.07]">

          {/* Brand */}
          <div className="flex-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/HyperPOS.svg" alt="HyperPOS" className="w-7 h-7 brightness-0 invert object-contain" />
              <span className="text-white font-semibold text-base">HyperPOS</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Empowering modern businesses with intelligent, minimal, and
              lightning-fast point-of-sale solutions.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-zinc-400 font-semibold text-xs uppercase tracking-widest mb-4">Navigation</h3>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={e => handleNavClick(e, id)}
                    className="text-zinc-500 hover:text-white text-sm transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-zinc-400 font-semibold text-xs uppercase tracking-widest mb-4">Contact</h3>
            <ul className="space-y-2.5 text-sm text-zinc-500">
              <li>info@hyperpos.io</li>
              <li>+1 (456) 789-1230</li>
              <li>New York, USA</li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} HyperPOS. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Terms of Use</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
