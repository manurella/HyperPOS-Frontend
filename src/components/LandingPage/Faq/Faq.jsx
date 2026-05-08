import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  { q: "What is HyperPOS?",        a: "HyperPOS is a fast, modern point-of-sale system designed to help businesses manage sales, inventory, and customers from one beautiful dashboard." },
  { q: "Is HyperPOS easy to use?", a: "Absolutely. Whether you're a first-time user or a seasoned store owner, you can start selling in minutes without any training." },
  { q: "Can I track inventory?",   a: "Yes. HyperPOS automatically updates your inventory with every sale and alerts you when stock is running low so you're always in control." },
  { q: "Does it work on mobile?",  a: "Yes, HyperPOS works seamlessly on desktops, tablets, and smartphones. All you need is a browser — no downloads needed." },
  { q: "How do I get started?",    a: "Sign up, add your products, and start selling. The setup takes under five minutes with our guided onboarding." },
  { q: "Is my data secure?",       a: "All data is encrypted in transit. Role-based access ensures only authorized team members can view sensitive information." },
];

const Faq = () => {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="bg-[#F5F4EF] py-24">
      <div className="max-w-[720px] mx-auto px-6">

        <div className="text-center mb-12">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#8C8A82] mb-3">FAQ</p>
          <h2 className="font-sans text-[32px] font-bold text-[#1A1915] mb-3">Common questions.</h2>
          <p className="text-[15px] text-[#5C5A54]">Everything you need to know about HyperPOS.</p>
        </div>

        <div className="divide-y divide-[#E8E5DC]">
          {FAQS.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="text-[15px] font-semibold text-[#1A1915]">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-[#8C8A82] flex-shrink-0 ml-4 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${open === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="text-[14px] text-[#5C5A54] leading-[1.7] pb-5">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Faq;
