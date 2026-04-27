import { Globe, Package, Users, BarChart2, Lock, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: <Globe size={20} />,
    title: "Access Anywhere",
    desc: "Browser-based, fully responsive. Works on any device: desktop, tablet, or mobile.",
    color: "bg-blue-50 text-blue-500",
  },
  {
    icon: <Package size={20} />,
    title: "Real-Time Inventory",
    desc: "Stock updates instantly with every sale or purchase. Never sell what you don't have.",
    color: "bg-sky-50 text-sky-500",
  },
  {
    icon: <Users size={20} />,
    title: "Customer Profiles",
    desc: "Build detailed customer records, track purchase history, and run loyalty programs.",
    color: "bg-emerald-50 text-emerald-500",
  },
  {
    icon: <BarChart2 size={20} />,
    title: "Advanced Analytics",
    desc: "Revenue trends, top products, supplier insights, all visualized in the dashboard.",
    color: "bg-violet-50 text-violet-500",
  },
  {
    icon: <Lock size={20} />,
    title: "Role-Based Access",
    desc: "Assign Admin or Cashier roles with fine-grained permission control.",
    color: "bg-rose-50 text-rose-500",
  },
  {
    icon: <Zap size={20} />,
    title: "Fast Checkout",
    desc: "Barcode scanning, smart product search, and instant payment processing.",
    color: "bg-amber-50 text-amber-500",
  },
];

const Features = () => (
  <section className="bg-white py-24">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">

      <div className="text-center mb-14">
        <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-100 mb-4">
          Everything You Need
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-4">
          Packed with powerful features
        </h2>
        <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
          HyperPOS gives you all the tools to run a modern business,
          with zero complexity and a clean interface.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map(({ icon, title, desc, color }) => (
          <div key={title}
            className="border border-zinc-100 rounded-xl p-6 hover:border-zinc-200 hover:shadow-sm transition-all duration-200">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${color}`}>
              {icon}
            </div>
            <h3 className="text-sm font-bold text-zinc-800 mb-2">{title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default Features;
