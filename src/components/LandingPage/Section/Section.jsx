import { Store, Coffee, ShoppingBag } from "lucide-react";

const INDUSTRIES = [
  {
    icon: <Store size={28} />,
    title: "Retail",
    desc: "Full inventory management, barcode scanning, and multi-product POS for any retail store.",
  },
  {
    icon: <Coffee size={28} />,
    title: "Cafés & Restaurants",
    desc: "Fast order processing, customer profiles, and real-time reporting to keep your tables turning.",
  },
  {
    icon: <ShoppingBag size={28} />,
    title: "Boutiques",
    desc: "Product variants, discount management, and customer loyalty tracking in one clean interface.",
  },
];

const Section = () => (
  <section className="bg-slate-50 py-24">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">

      <div className="text-center mb-14">
        <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-100 mb-4">
          Built for Every Business
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
          The right tool for your industry
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          From small boutiques to bustling restaurants, HyperPOS adapts to
          how your business works — not the other way around.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {INDUSTRIES.map(({ icon, title, desc }) => (
          <div key={title}
            className="bg-white border border-slate-200 rounded-2xl p-7 hover:border-indigo-200 hover:shadow-md transition-all duration-200 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-5 group-hover:bg-indigo-100 transition-colors">
              {icon}
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default Section;
