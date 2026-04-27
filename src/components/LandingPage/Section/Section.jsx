import { Store, Coffee, ShoppingBag } from "lucide-react";

const INDUSTRIES = [
  {
    icon: <Store size={24} />,
    title: "Retail",
    desc: "Full inventory management, barcode scanning, and multi-product POS for any retail store.",
  },
  {
    icon: <Coffee size={24} />,
    title: "Cafes & Restaurants",
    desc: "Fast order processing, customer profiles, and real-time reporting to keep your tables turning.",
  },
  {
    icon: <ShoppingBag size={24} />,
    title: "Boutiques",
    desc: "Product variants, discount management, and customer loyalty tracking in one clean interface.",
  },
];

const Section = () => (
  <section className="bg-zinc-50 py-24">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">

      <div className="text-center mb-14">
        <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-100 mb-4">
          Built for Every Business
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-4">
          The right tool for your industry
        </h2>
        <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
          From small boutiques to bustling restaurants, HyperPOS adapts to
          how your business works, not the other way around.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {INDUSTRIES.map(({ icon, title, desc }) => (
          <div key={title}
            className="bg-white border border-zinc-100 rounded-xl p-7 hover:border-zinc-200 hover:shadow-sm transition-all duration-200">
            <div className="w-11 h-11 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600 mb-5">
              {icon}
            </div>
            <h3 className="text-base font-bold text-zinc-900 mb-2">{title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default Section;
