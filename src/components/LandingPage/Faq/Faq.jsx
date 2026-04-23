import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  { q: "What is HyperPOS?",             a: "HyperPOS is a fast, modern point-of-sale system designed to help businesses manage sales, inventory, and customers — all from one sleek dashboard." },
  { q: "Is HyperPOS easy to use?",      a: "Absolutely. Whether you're a first-time user or a seasoned store owner, you can start selling in minutes without any training." },
  { q: "Can I track inventory?",        a: "Yes. HyperPOS automatically updates your inventory with every sale and alerts you when stock is running low — so you're always in control." },
  { q: "Does it work on mobile?",       a: "Yes, HyperPOS works seamlessly on desktops, tablets, and smartphones. All you need is a browser — no downloads needed." },
  { q: "How do I get started?",         a: "Sign up, add your products, and start selling. The setup takes under five minutes with our guided onboarding." },
  { q: "Is my data secure?",            a: "All data is encrypted in transit and at rest. Role-based access ensures only authorized team members can view sensitive information." },
];

const Faq = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-14">
          <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-100 mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Frequently asked <span className="text-indigo-600">questions</span>
          </h2>
          <p className="text-slate-500">Everything you need to know about HyperPOS.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-indigo-200 transition-colors">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-sm font-semibold text-slate-800">{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 flex-shrink-0 ml-4 transition-transform duration-200 ${open === i ? "rotate-180 text-indigo-500" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Faq;
