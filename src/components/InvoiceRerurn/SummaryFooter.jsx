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
    <div className="bg-white border border-[#E8E5DC] rounded-xl shadow-sm p-5">
      <div className="flex justify-between items-center text-lg font-bold text-[#1A1915] mb-5 pb-4 border-b border-[#E8E5DC]">
        <span>Grand Total</span>
        <span className="text-[#4F7A3F]">Rs. {(grandTotal || 0).toFixed(2)}</span>
      </div>
      <div className="flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-[#8C8A82] uppercase tracking-wide">Cash</label>
          <input
            type="number"
            value={cash || ""}
            onChange={e => setCash(e.target.value)}
            className="pos-input w-32"
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-[#8C8A82] uppercase tracking-wide">Change</label>
          <div className="px-4 py-2 bg-[#FAFAF7] border border-[#E8E5DC] rounded-lg text-[#1A1915] font-medium w-32 text-center text-sm">
            Rs. {(change || 0).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryFooter;
