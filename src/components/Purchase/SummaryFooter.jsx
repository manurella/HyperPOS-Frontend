import React, { useEffect } from "react";

const SummaryFooter = ({
  cartItems,
  cash,
  setCash,
  change,
  setChange,
}) => {
  const grandTotal = cartItems.reduce((sum, item) => {
    const total = item.unitCost * item.quantity - (item.discount || 0);
    return sum + (total > 0 ? total : 0);
  }, 0);

  useEffect(() => {
    const parsedCash = parseFloat(cash);
    setChange(parsedCash - grandTotal || 0);
    console.log("Change:", change);
  }, [cash, grandTotal]);

  const handleCashChange = (e) => {
    setCash(e.target.value);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <h3 className="pos-section-title mb-4">Payment Summary</h3>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-slate-500 font-medium">Grand Total:</span>
          <span className="text-2xl font-bold text-slate-800">Rs. {grandTotal.toFixed(2)}</span>
        </div>
        <div className="flex gap-4 flex-wrap">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Cash Paid (Rs.)
            </label>
            <input
              type="number"
              value={Number(cash || 0)}
              onChange={handleCashChange}
              className="pos-input w-36"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Change (Rs.)
            </label>
            <input
              type="text"
              readOnly
              value={(change || 0).toFixed(2)}
              className="pos-input w-36 bg-slate-50 text-slate-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SummaryFooter;
