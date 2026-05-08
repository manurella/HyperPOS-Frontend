import { BarChart2, Package, Users, FileText, ShoppingCart, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: <BarChart2 size={20} />,
    title: "Real-time Analytics",
    desc: "Live dashboards with sales trends, top products, and revenue growth charts updated instantly.",
  },
  {
    icon: <Package size={20} />,
    title: "Inventory Control",
    desc: "Track every product in real time. Get alerts before stock runs out and manage suppliers in one place.",
  },
  {
    icon: <Users size={20} />,
    title: "Multi-user Roles",
    desc: "Separate admin and cashier access with role-based permissions so every team member sees only what they need.",
  },
  {
    icon: <FileText size={20} />,
    title: "Invoice Management",
    desc: "Generate, print, and manage invoices in seconds. Returns and adjustments are just as easy.",
  },
  {
    icon: <ShoppingCart size={20} />,
    title: "Purchase & GRN",
    desc: "Log goods received, manage supplier invoices, and keep your purchase records clean and auditable.",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Secure & Reliable",
    desc: "JWT-based auth, role enforcement at every route, and a backend built to handle concurrent transactions.",
  },
];

const Features = () => (
  <section id="features" className="bg-[#FAFAF7] py-24">
    <div className="max-w-6xl mx-auto px-6">

      <div className="text-center mb-14">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#8C8A82] mb-3">Features</p>
        <h2 className="font-sans text-[36px] font-bold text-[#1A1915] mb-4 tracking-[-0.01em]">
          Everything you need to run your business.
        </h2>
        <p className="text-[16px] text-[#5C5A54] max-w-[560px] mx-auto">
          From the sales counter to the back office, HyperPOS gives you the tools to work smarter every day.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="bg-white border-[1.5px] border-[#E8E5DC] rounded-[14px] p-7 hover:border-[#D4D0C4] transition-all duration-150"
            style={{
              boxShadow: '0 1px 3px rgba(26,25,21,0.06), 0 4px 12px rgba(26,25,21,0.04)',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(26,25,21,0.10), 0 12px 40px rgba(26,25,21,0.08)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(26,25,21,0.06), 0 4px 12px rgba(26,25,21,0.04)'}
          >
            <div className="w-11 h-11 rounded-[10px] bg-[#E6F0E1] flex items-center justify-center text-[#4F7A3F] mb-4">
              {icon}
            </div>
            <h3 className="text-[16px] font-semibold text-[#1A1915] mb-2">{title}</h3>
            <p className="text-sm text-[#5C5A54] leading-[1.65]">{desc}</p>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default Features;
