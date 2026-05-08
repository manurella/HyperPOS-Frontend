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
  <section className="bg-[#F5F4EF] py-24">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">

      <div className="text-center mb-14">
        <span className="inline-block bg-[#E6F0E1] text-[#4F7A3F] text-xs font-semibold px-3 py-1.5 rounded-full border border-[rgba(79,122,63,0.2)] mb-4">
          Built for Every Business
        </span>
        <h2 className="font-sans text-3xl sm:text-4xl font-bold text-[#1A1915] mb-4 tracking-[-0.02em]">
          The right tool for your industry
        </h2>
        <p className="text-[#8C8A82] text-lg max-w-2xl mx-auto">
          From small boutiques to bustling restaurants, HyperPOS adapts to
          how your business works, not the other way around.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {INDUSTRIES.map(({ icon, title, desc }) => (
          <div key={title}
            className="bg-white border border-[#E8E5DC] rounded-[14px] p-7 hover:border-[#D4D0C4] hover:shadow-md transition-all duration-200"
            style={{ boxShadow: '0 1px 3px rgba(26,25,21,0.06), 0 4px 12px rgba(26,25,21,0.04)' }}>
            <div className="w-11 h-11 rounded-lg bg-[#E6F0E1] flex items-center justify-center text-[#4F7A3F] mb-5">
              {icon}
            </div>
            <h3 className="text-base font-bold text-[#1A1915] mb-2">{title}</h3>
            <p className="text-[#8C8A82] text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default Section;
