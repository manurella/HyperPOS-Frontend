import { useEffect } from "react";

const SummaryFooter = ({ cartItems, cash, setCash, change, setChange }) => {
  const grandTotal = cartItems?.reduce((sum, item) => {
    const total = item?.unitPrice * item?.quantity * (1 - (item?.discount || 0) / 100);
    return sum + (total > 0 ? total : 0);
  }, 0);

  useEffect(() => {
    setChange(parseFloat(cash) - grandTotal || 0);
  }, [cash, grandTotal, setChange]);

  return (
    <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-5">
      <div className="flex justify-between items-center text-lg font-bold text-zinc-900 mb-5 pb-4 border-b border-zinc-100">
        <span>Grand Total</span>
        <span className="text-blue-600">Rs. {(grandTotal || 0).toFixed(2)}</span>
      </div>
      <div className="flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Cash</label>
          <input
            type="number"
            value={cash || ""}
            onChange={e => setCash(e.target.value)}
            className="pos-input w-32"
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Change</label>
          <div className="px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-700 font-medium w-32 text-center text-sm">
            Rs. {(change || 0).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryFooter;
