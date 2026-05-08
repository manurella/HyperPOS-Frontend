const SummeryFooter = ({ cartItems, totalAmount }) => {
    const grandTotal = cartItems?.reduce((sum, item) => {
        const total = item?.unitCost * item?.quantity * (1 - (item?.discount || 0) / 100);
        return sum + (total > 0 ? total : 0);
    }, 0);

    return (
        <div className="bg-white border border-[#E8E5DC] rounded-xl p-5 flex flex-col sm:flex-row gap-4 justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-[#5C5A54] uppercase tracking-wide">Original GRN Total:</label>
                <div className="px-4 py-2 bg-[#FAFAF7] border border-[#E8E5DC] rounded-lg text-[#1A1915] font-medium">
                    Rs. {Number(totalAmount || 0).toFixed(2)}
                </div>
            </div>
            <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-[#5C5A54] uppercase tracking-wide">Return Amount:</label>
                <div className="px-4 py-2 bg-[#E6F0E1] border border-[#E8E5DC] rounded-lg text-[#4F7A3F] font-bold text-lg">
                    Rs. {(grandTotal || 0)?.toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default SummeryFooter;
