const LINKS = {
  Product:  ["Features", "Pricing", "Changelog"],
  Company:  ["About", "Blog", "Careers"],
  Legal:    ["Privacy", "Terms", "Cookies"],
};

const Footer = () => (
  <footer className="bg-[#1A1915]">
    <div className="max-w-6xl mx-auto px-8 py-16">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2E2C28]">

        {/* Brand column */}
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <img src="/HyperPOS.svg" alt="HyperPOS" className="w-6 h-6 brightness-0 invert object-contain" />
            <span className="text-[#E8E6DF] font-semibold text-[16px]">HyperPOS</span>
          </div>
          <p className="text-[13px] text-[#7A786F] leading-relaxed mb-5">
            Smarter retail, faster checkout.
          </p>
          <div className="flex gap-2">
            {["GH", "X"].map((s) => (
              <button key={s} className="w-9 h-9 rounded-lg flex items-center justify-center text-[#7A786F] hover:text-[#E8E6DF] transition-colors" style={{ background: "rgba(255,255,255,0.06)" }}>
                <span className="text-[11px] font-bold">{s}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([group, items]) => (
          <div key={group}>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#7A786F] mb-4">{group}</h4>
            <ul className="space-y-2.5">
              {items.map(item => (
                <li key={item}>
                  <a href="#" className="text-[14px] text-[#8C8A82] hover:text-[#E8E6DF] transition-colors duration-[120ms]">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
        <p className="text-xs text-[#7A786F]">&copy; 2025 HyperPOS. All rights reserved.</p>
        <p className="text-xs text-[#7A786F]">Made with ♥ in Sri Lanka</p>
      </div>
    </div>
  </footer>
);

export default Footer;
