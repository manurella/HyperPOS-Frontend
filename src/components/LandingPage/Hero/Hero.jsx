import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart2, ShieldCheck, Zap } from "lucide-react";

const BADGES = [
  { icon: <ShieldCheck size={14} />, text: "Secure" },
  { icon: <Zap size={14} />,         text: "Real-time" },
  { icon: <BarChart2 size={14} />,   text: "Analytics" },
];

const STATS = [
  { label: "Total Sales",     value: "Rs 48,250" },
  { label: "Transactions",    value: "124" },
  { label: "Active Products", value: "891" },
  { label: "Customers",       value: "2,340" },
];

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F5F4EF]">

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{
        backgroundImage: "radial-gradient(circle, #8C8A82 2px, transparent 2px)",
        backgroundSize: "28px 28px",
      }} />
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 600px 600px at 60% 40%, rgba(79,122,63,0.08), transparent)",
      }} />

      <div className="relative max-w-6xl mx-auto px-6 py-28 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left — copy */}
          <div className="flex-1 text-center lg:text-left">

            <span className="inline-flex items-center gap-1.5 bg-[#E6F0E1] text-[#2D4A22] text-xs font-semibold px-3 py-1.5 rounded-full border border-[rgba(79,122,63,0.25)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F7A3F] animate-pulse" />
              ✦ Modern Point-of-Sale Platform
            </span>

            <h1 className="font-sans text-[40px] sm:text-[52px] lg:text-[58px] font-bold text-[#1A1915] leading-[1.1] tracking-[-0.03em] mb-5">
              Smarter retail,<br />
              <span className="text-[#4F7A3F]">faster checkout.</span>
            </h1>

            <p className="text-[18px] text-[#5C5A54] leading-[1.65] mb-8 max-w-[480px] mx-auto lg:mx-0">
              The all-in-one POS system built for modern businesses. Manage inventory,
              track sales, and grow with real-time analytics from one beautiful dashboard.
            </p>

            <div className="flex items-center gap-2.5 mb-8 justify-center lg:justify-start flex-wrap">
              {BADGES.map(({ icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5 bg-[#EEECE5] text-[#5C5A54] text-xs font-medium px-3 py-1.5 rounded-md">
                  <span className="text-[#4F7A3F]">{icon}</span> {text}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/signup")}
                className="inline-flex items-center justify-center gap-2 bg-[#4F7A3F] hover:bg-[#3D6030] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-[120ms] active:scale-[0.98]"
              >
                Get Started Free <ArrowRight size={15} />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center gap-2 bg-[#EEECE5] hover:bg-[#E4E1D8] border border-[#E8E5DC] text-[#1A1915] font-medium text-sm px-5 py-2.5 rounded-lg transition-all duration-[120ms]"
              >
                Sign In
              </button>
            </div>

            <p className="text-xs text-[#8C8A82] mt-4 text-center lg:text-left">
              Trusted by 500+ businesses across Sri Lanka
            </p>
          </div>

          {/* Right — dashboard preview */}
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="relative">
              <div className="rounded-[16px] p-7 relative overflow-hidden bg-[#1A1915]" style={{ boxShadow: '0 4px 16px rgba(26,25,21,0.10), 0 12px 40px rgba(26,25,21,0.08)' }}>
                {/* Dot texture */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }} />
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <img src="/HyperPOS.svg" alt="HyperPOS" className="w-5 h-5 brightness-0 invert" />
                      <span className="font-semibold text-[15px] text-[#E8E6DF]">HyperPOS</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#3D7A5C]" />
                      <span className="text-[11px] text-[#7A786F]">Live</span>
                    </div>
                  </div>

                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A786F] mb-3">Today's Overview</p>

                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {STATS.map(({ label, value }) => (
                      <div key={label} className="rounded-[10px] p-3.5 border" style={{
                        background: "rgba(255,255,255,0.06)",
                        borderColor: "rgba(255,255,255,0.07)",
                      }}>
                        <p className="text-[11px] text-[#7A786F] mb-1">{label}</p>
                        <p className="text-[22px] font-bold text-[#E8E6DF] leading-tight">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[10px] p-3 flex items-center justify-between border" style={{
                    background: "rgba(255,255,255,0.06)",
                    borderColor: "rgba(255,255,255,0.07)",
                  }}>
                    <span className="text-[13px] text-[#7A786F]">Revenue Growth</span>
                    <span className="text-[13px] font-bold text-[#3D7A5C]">+12.4% ↑</span>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white border border-[#E8E5DC] rounded-[10px] px-4 py-2.5 flex items-center gap-2"
                style={{ boxShadow: '0 4px 16px rgba(26,25,21,0.10), 0 12px 40px rgba(26,25,21,0.08)' }}>
                <span className="w-2 h-2 rounded-full bg-[#3D7A5C]" />
                <span className="text-[#1A1915] text-[13px] font-semibold">Live &amp; Synced</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
