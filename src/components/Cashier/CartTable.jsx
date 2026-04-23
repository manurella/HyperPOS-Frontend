import { ShoppingCart, Trash2 } from "lucide-react";

const CartTable = ({ cartItems, onRemove, onQuantityChange }) => {
  const calcTotal = (price, qty, disc) => Math.max(price * qty * (1 - disc / 100), 0);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 className="pos-section-title">Cart</h3>
        <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
          {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="pos-table">
          <thead>
            <tr>
              <th className="w-10">#</th>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Qty</th>
              <th className="hidden sm:table-cell">Unit</th>
              <th className="hidden sm:table-cell">Discount</th>
              <th>Total</th>
              <th className="text-center">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item, idx) => {
                const total = calcTotal(item.unitPrice, item.quantity, item.discount);
                return (
                  <tr key={idx}>
                    <td className="text-center text-slate-400 text-xs font-bold">{idx + 1}</td>
                    <td className="font-medium text-slate-800">{item.name}</td>
                    <td className="text-slate-600">Rs {Number(item.unitPrice).toFixed(2)}</td>
                    <td>
                      <input
                        type="number" min="1" value={item.quantity}
                        onChange={e => onQuantityChange(item.id, parseInt(e.target.value, 10) || 1)}
                        className="w-16 px-2 py-1 text-center text-sm border border-slate-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 outline-none bg-white transition"
                      />
                    </td>
                    <td className="hidden sm:table-cell text-slate-500">{item.unit}</td>
                    <td className="hidden sm:table-cell">
                      <span className="pos-badge-warning">{item.discount}%</span>
                    </td>
                    <td className="font-semibold text-emerald-600">Rs {total.toFixed(2)}</td>
                    <td className="text-center">
                      <button
                        onClick={() => onRemove(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        aria-label="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <ShoppingCart size={28} className="text-slate-300" />
                    <span className="text-sm">Cart is empty — add a product above</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartTable;
