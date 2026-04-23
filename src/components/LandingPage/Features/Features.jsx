import { Globe, Package, Users, BarChart2, Lock, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: <Globe size={22} />,
    title: "Access Anywhere",
    desc: "Browser-based, fully responsive. Works on any device — desktop, tablet, or mobile.",
    color: "bg-indigo-50 text-indigo-500",
  },
  {
    icon: <Package size={22} />,
    title: "Real-Time Inventory",
    desc: "Stock updates instantly with every sale or purchase. Never sell what you don't have.",
    color: "bg-sky-50 text-sky-500",
  },
  {
    icon: <Users size={22} />,
    title: "Customer Profiles",
    desc: "Build detailed customer records, track purchase history, and run loyalty programs.",
    color: "bg-emerald-50 text-emerald-500",
  },
  {
    icon: <BarChart2 size={22} />,
    title: "Advanced Analytics",
    desc: "Revenue trends, top products, supplier insights — all visualized in the dashboard.",
    color: "bg-violet-50 text-violet-500",
  },
  {
    icon: <Lock size={22} />,
    title: "Role-Based Access",
    desc: "Assign Admin or Cashier roles with fine-grained permission control.",
    color: "bg-rose-50 text-rose-500",
  },
  {
    icon: <Zap size={22} />,
    title: "Fast Checkout",
    desc: "Barcode scanning, smart product search, and instant payment processing.",
    color: "bg-amber-50 text-amber-500",
  },
];

const Features = () => (
  <section className="bg-white py-24">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">

      <div className="text-center mb-14">
        <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-100 mb-4">
          Everything You Need
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
          Packed with powerful features
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          HyperPOS gives you all the tools to run a modern business, with
          zero complexity and a beautiful interface.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map(({ icon, title, desc, color }) => (
          <div key={title}
            className="border border-slate-100 rounded-2xl p-6 hover:border-indigo-100 hover:shadow-sm transition-all duration-200 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
              {icon}
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default Features;
