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

      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.06]"
             style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.05]"
             style={{ background: "radial-gradient(circle, #4338ca, transparent)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-32 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left: copy */}
          <div className="flex-1 text-center lg:text-left">

            <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-100 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Modern Point-of-Sale Platform
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Smarter retail,<br />
              <span className="text-indigo-600">faster checkout.</span>
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              The all-in-one POS system built for modern businesses. Manage
              inventory, track sales, and grow with real-time analytics — all
              from one dashboard.
            </p>

            <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start flex-wrap">
              {BADGES.map(({ icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-full">
                  <span className="text-indigo-500">{icon}</span> {text}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/signup")}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                Get Started Free <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 font-semibold px-6 py-3 rounded-xl transition-all duration-200"
              >
                Sign In
              </button>
            </div>

          </div>

          {/* Right: dashboard card */}
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="relative">
              <div
                className="rounded-2xl p-8 text-white relative overflow-hidden"
                style={{ background: "linear-gradient(145deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)" }}
              >
                <div className="absolute inset-0 opacity-[0.06]" style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <img src="/HyperPOS.svg" alt="HyperPOS" className="w-8 h-8 brightness-0 invert" />
                    <span className="font-bold text-lg">HyperPOS</span>
                  </div>
                  <p className="text-indigo-200 text-sm mb-4">Today's Overview</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { label: "Total Sales",     value: "Rs 48,250" },
                      { label: "Transactions",    value: "124" },
                      { label: "Active Products", value: "891" },
                      { label: "Customers",       value: "2,340" },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-white/10 rounded-xl p-3">
                        <p className="text-indigo-300 text-xs mb-1">{label}</p>
                        <p className="text-white font-bold text-lg">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 flex items-center justify-between">
                    <span className="text-indigo-200 text-sm">Revenue Growth</span>
                    <span className="text-emerald-400 font-bold text-sm">+12.4% ↑</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-2">
                <span className="text-emerald-500">✓</span>
                <span className="text-slate-700 text-sm font-semibold">Live & Synced</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
