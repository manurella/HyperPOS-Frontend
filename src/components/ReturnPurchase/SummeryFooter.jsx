const SummeryFooter = ({ cartItems, totalAmount }) => {
    const grandTotal = cartItems?.reduce((sum, item) => {
        const total = item?.unitCost * item?.quantity * (1 - (item?.discount || 0) / 100);
        return sum + (total > 0 ? total : 0);
    }, 0);

    return (
        <div className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col sm:flex-row gap-4 justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-zinc-600 uppercase tracking-wide">Original GRN Total:</label>
                <div className="px-4 py-2 bg-blue-50/20 border border-zinc-200 rounded-lg text-zinc-700 font-medium">
                    Rs. {Number(totalAmount || 0).toFixed(2)}
                </div>
            </div>
            <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-zinc-600 uppercase tracking-wide">Return Amount:</label>
                <div className="px-4 py-2 bg-blue-50 border border-zinc-200 rounded-lg text-blue-600 font-bold text-lg">
                    Rs. {(grandTotal || 0)?.toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default SummeryFooter;
