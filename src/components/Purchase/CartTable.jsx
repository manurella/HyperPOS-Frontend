import React from "react";

const CartTable = ({ cartItems, onRemove, onQuantityChange }) => {
  const calculateTotal = (cost, quantity, discount) => {
    const total = cost * quantity * (1 - discount / 100);
    return total > 0 ? total : 0;
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5">
      <h3 className="pos-section-title mb-4">Cart Items</h3>
      <div className="overflow-x-auto">
        <table className="pos-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Cost</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Discount</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => {
                const itemTotal = calculateTotal(
                  item.unitCost,
                  item.quantity,
                  item.discount
                );
                return (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td className="font-medium">{item.name}</td>
                    <td>Rs. {Number(item.unitCost).toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          onQuantityChange(
                            item.id,
                            parseInt(e.target.value, 10) || 1
                          )
                        }
                        className="w-16 px-2 py-1 border border-zinc-200 rounded-lg bg-blue-50/20 text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td>{item.unit}</td>
                    <td>{item.discount}%</td>
                    <td className="font-semibold text-zinc-900">
                      Rs. {Number(itemTotal).toFixed(2)}
                    </td>
                    <td>
                      <button
                        onClick={() => onRemove(item.productId)}
                        className="p-1.5 rounded-lg text-zinc-700/40 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Remove"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-8 text-zinc-700/40">
                  No items in cart. Add products above.
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
