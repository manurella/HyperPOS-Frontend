import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart2, ShieldCheck, Zap } from "lucide-react";

const BADGES = [
  { icon: <ShieldCheck size={14} />, text: "Secure" },
  { icon: <Zap size={14} />,         text: "Real-time" },
  { icon: <BarChart2 size={14} />,   text: "Analytics" },
];

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">

      {/* Subtle grid bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(to right, #f1f5f9 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.6,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-32 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left: copy */}
          <div className="flex-1 text-center lg:text-left">

            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-100 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Modern Point-of-Sale Platform
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 leading-tight mb-6">
              Smarter retail,<br />
              <span className="text-blue-600">faster checkout.</span>
            </h1>

            <p className="text-lg text-zinc-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              The all-in-one POS system built for modern businesses. Manage
              inventory, track sales, and grow with real-time analytics
              from one dashboard.
            </p>

            <div className="flex items-center gap-2.5 mb-8 justify-center lg:justify-start flex-wrap">
              {BADGES.map(({ icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5 bg-zinc-100 text-zinc-600 text-xs font-medium px-3 py-1.5 rounded-full">
                  <span className="text-blue-500">{icon}</span> {text}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button onClick={() => navigate("/signup")} className="pos-btn-primary">
                Get Started Free <ArrowRight size={15} />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center gap-2 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors duration-150"
              >
                Sign In
              </button>
            </div>

          </div>

          {/* Right: dashboard card */}
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="relative">
              <div className="rounded-xl p-7 text-white relative overflow-hidden bg-[#0f172a]">
                <div className="absolute inset-0 opacity-[0.04]" style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <img src="/HyperPOS.svg" alt="HyperPOS" className="w-7 h-7 brightness-0 invert object-contain" />
                    <span className="font-semibold text-base">HyperPOS</span>
                  </div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">Today's Overview</p>
                  <div className="grid grid-cols-2 gap-2.5 mb-3">
                    {[
                      { label: "Total Sales",     value: "Rs 48,250" },
                      { label: "Transactions",    value: "124" },
                      { label: "Active Products", value: "891" },
                      { label: "Customers",       value: "2,340" },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-white/[0.06] rounded-lg p-3 border border-white/[0.06]">
                        <p className="text-slate-400 text-xs mb-1">{label}</p>
                        <p className="text-white font-bold text-lg">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white/[0.06] rounded-lg p-3 flex items-center justify-between border border-white/[0.06]">
                    <span className="text-slate-400 text-sm">Revenue Growth</span>
                    <span className="text-emerald-400 font-bold text-sm">+12.4% &uarr;</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white border border-zinc-200 rounded-lg px-4 py-2.5 shadow-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-zinc-700 text-sm font-semibold">Live &amp; Synced</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
