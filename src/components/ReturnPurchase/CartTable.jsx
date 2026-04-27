const CartTable = ({ cartItems, onQuantityChange, productList }) => {
    const calculateTotal = (price, quantity, discount) => {
        const total = price * quantity * (1 - discount / 100);
        return total > 0 ? total : 0;
    };

    return (
        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto max-h-[50vh]">
                <table className="w-full text-sm text-left">
                    <thead className="bg-blue-50/20 text-zinc-700/80 sticky top-0 border-b border-zinc-200">
                        <tr>
                            <th className="px-4 py-3 font-semibold text-center">#</th>
                            <th className="px-4 py-3 font-semibold">Product Name</th>
                            <th className="px-4 py-3 font-semibold text-center">Unit</th>
                            <th className="px-4 py-3 font-semibold text-center">Quantity</th>
                            <th className="px-4 py-3 font-semibold text-center">Discount</th>
                            <th className="px-4 py-3 font-semibold text-right">Cost</th>
                            <th className="px-4 py-3 font-semibold text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-zinc-700">
                        {cartItems?.length > 0 ?
                            cartItems.map((item, index) => {
                                const itemTotall = calculateTotal(
                                    item?.unitCost,
                                    item?.quantity,
                                    item?.discount
                                );
                                return (
                                    <tr key={index} className="hover:bg-blue-50/20 transition-colors">
                                        <td className="px-4 py-3 text-center">{index + 1}</td>
                                        <td className="px-4 py-3 font-medium text-zinc-900">
                                            {productList?.find((product) => product.id === item?.productId)?.name || "N/A"}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {productList?.find((product) => product.id === item?.productId)?.unit}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                min="0"
                                                onChange={(e) =>
                                                    onQuantityChange(
                                                        item?.id,
                                                        parseInt(e.target.value, 10) || 0
                                                    )
                                                }
                                                className="w-20 px-2 py-1 border border-zinc-200 rounded-md text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center">{item?.discount}%</td>
                                        <td className="px-4 py-3 text-right">Rs. {Number(item?.unitCost).toFixed(2)}</td>
                                        <td className="px-4 py-3 text-right font-medium">Rs. {Number(itemTotall).toFixed(2)}</td>
                                    </tr>
                                );
                            })
                            : (
                                <tr>
                                    <td className="px-4 py-8 text-center text-zinc-700/40" colSpan="7">
                                        No items in the GRN return
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CartTable;
