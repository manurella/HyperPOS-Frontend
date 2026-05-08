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
    <div className="bg-white border border-[#E8E5DC] rounded-xl shadow-sm p-5">
      <h3 className="pos-section-title mb-5">Payment Summary</h3>

      <div className="space-y-5">

        {/* Grand total */}
        <div className="flex items-center justify-between bg-[#E6F0E1] border border-[rgba(79,122,63,0.2)] rounded-xl px-5 py-4">
          <span className="text-sm font-semibold text-[#5C5A54]">Grand Total</span>
          <span className="text-2xl font-bold text-[#4F7A3F]">Rs {grandTotal.toFixed(2)}</span>
        </div>

        {/* Cash + Change */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#8C8A82] uppercase tracking-wide mb-1.5">
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
            <label className="block text-xs font-semibold text-[#8C8A82] uppercase tracking-wide mb-1.5">
              Change
            </label>
            <div className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-bold transition-all ${
              (change || 0) < 0
                ? "border-[rgba(192,57,43,0.2)] bg-[#FAEBE9] text-[#C0392B]"
                : "border-emerald-200 bg-[#E2F0EA] text-emerald-700"
            }`}>
              Rs {(change || 0).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Payment method */}
        <div>
          <label className="block text-xs font-semibold text-[#8C8A82] uppercase tracking-wide mb-2">
            Payment Method
          </label>
          <div className="flex gap-2">
            {PAYMENT_METHODS.map(({ value, label, icon }) => (
              <button
                key={value} type="button"
                onClick={() => setPaymentMethod(value)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                  paymentMethod === value
                    ? "bg-[#4F7A3F] border-[#4F7A3F] text-white"
                    : "bg-white border-[#E8E5DC] text-[#5C5A54] hover:border-[#D4D0C4] hover:text-[#1A1915]"
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
