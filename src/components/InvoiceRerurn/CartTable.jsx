const CartTable = ({ cartItems, onQuantityChange, productList }) => {
  const calculateTotal = (price, quantity, discount) => {
    const total = price * quantity * (1 - discount / 100);
    return total > 0 ? total : 0;
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-5">
      <h3 className="pos-section-title mb-4">Return Items</h3>
      <div className="overflow-x-auto">
        <table className="pos-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              <th>Return Qty</th>
              <th>Unit</th>
              <th>Discount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.length > 0 ? (
              cartItems.map((item, index) => {
                const itemTotal = calculateTotal(item?.unitPrice, item?.quantity, item?.discount);
                return (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td className="font-medium">
                      {productList?.find(p => p.id === item?.productId)?.name}
                    </td>
                    <td>Rs. {Number(item?.unitPrice).toFixed(2)}</td>
                    <td>
                      <input
                        type="number" min="0"
                        value={item?.quantity}
                        onChange={e => onQuantityChange(item?.id, parseInt(e.target.value, 10) || 0)}
                        className="w-16 px-2 py-1 border border-zinc-200 rounded-lg bg-white text-center text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-50"
                      />
                    </td>
                    <td>{productList?.find(p => p?.id === item?.productId)?.unit}</td>
                    <td>{item?.discount}%</td>
                    <td className="font-semibold text-zinc-900">
                      Rs. {Number(itemTotal).toFixed(2)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-8 text-zinc-400">
                  Search for an invoice above to load return items.
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
