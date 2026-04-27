import { useEffect } from "react";
import { CreditCard, Smartphone, Banknote } from "lucide-react";

const PAYMENT_METHODS = [
  { value: "CASH",           label: "Cash",      icon: <Banknote size={15} /> },
  { value: "CARD",           label: "Card",      icon: <CreditCard size={15} /> },
  { value: "MOBILE_BANKING", label: "M-Banking", icon: <Smartphone size={15} /> },
];

const SummaryFooter = ({
  cartItems, cash, setCash, change, setChange, paymentMethod, setPaymentMethod,
}) => {
  const grandTotal = cartItems.reduce((sum, item) => {
    const t = item.unitPrice * item.quantity * (1 - (item.discount || 0) / 100);
    return sum + Math.max(t, 0);
  }, 0);

  useEffect(() => {
    setChange(parseFloat(cash) - grandTotal || 0);
  }, [cash, grandTotal]);

  return (
    <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-5">
      <h3 className="pos-section-title mb-5">Payment Summary</h3>

      <div className="space-y-5">

        {/* Grand total */}
        <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-xl px-5 py-4">
          <span className="text-sm font-semibold text-zinc-600">Grand Total</span>
          <span className="text-2xl font-bold text-blue-700">Rs {grandTotal.toFixed(2)}</span>
        </div>

        {/* Cash + Change */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">
              Cash Received
            </label>
            <input
              type="number" min="0"
              value={Number(cash || 0)}
              onChange={e => setCash(e.target.value)}
              className="pos-input"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">
              Change
            </label>
            <div className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-bold transition-all ${
              (change || 0) < 0
                ? "border-red-200 bg-red-50 text-red-600"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}>
              Rs {(change || 0).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Payment method */}
        <div>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">
            Payment Method
          </label>
          <div className="flex gap-2">
            {PAYMENT_METHODS.map(({ value, label, icon }) => (
              <button
                key={value} type="button"
                onClick={() => setPaymentMethod(value)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                  paymentMethod === value
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
                }`}
              >
                {icon} {label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SummaryFooter;
