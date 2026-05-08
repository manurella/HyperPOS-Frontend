import React from 'react';

function RecentPurchases({ grnData }) {
  const recentPurchases = React.useMemo(() => {
    try {
      const validGrnData = Array.isArray(grnData) ? [...grnData] : [];
      return validGrnData
        .filter(grn => {
          if (!grn) return false;
          const dateString = grn.updatedAt || grn.createdAt;
          if (!dateString) return false;
          const date = new Date(dateString);
          return !isNaN(date.getTime());
        })
        .sort((a, b) => {
          const dateA = new Date(a.updatedAt || a.createdAt);
          const dateB = new Date(b.updatedAt || b.createdAt);
          return dateB - dateA;
        })
        .slice(0, 5);
    } catch (error) {
      console.error("Error processing GRN data:", error);
      return [];
    }
  }, [grnData]);

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "—";
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "—";
    }
  };

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || isNaN(Number(amount))) return "—";
    try {
      const numAmount = Number(amount);
      return numAmount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } catch (error) {
      console.error("Error formatting currency:", error);
      return "—";
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-lg border border-[#E8E5DC] bg-white">
        <table className="min-w-full text-xs sm:text-sm text-left">
          <thead className="bg-[#EEECE5]/30 border-b border-[#E8E5DC]">
            <tr>
              <th className="p-3 font-semibold text-[#1A1915]/80">GRN ID</th>
              <th className="p-3 font-semibold text-[#1A1915]/80">Supplier ID</th>
              <th className="p-3 font-semibold text-[#1A1915]/80 hidden sm:table-cell">Date</th>
              <th className="p-3 font-semibold text-[#1A1915]/80 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentPurchases.length > 0 ? (
              recentPurchases.map((grn) => (
                <tr 
                  key={grn.id || Math.random().toString(36).substr(2, 9)} 
                  className="hover:bg-[#EEECE5]/30 transition-colors"
                >
                  <td className="p-3 font-medium text-[#1A1915]">{grn.id || "—"}</td>
                  <td className="p-3 text-[#1A1915]/80">{grn.supplierId || "—"}</td>
                  <td className="p-3 text-[#5C5A54] hidden sm:table-cell">
                    {formatDate(grn.createdAt || grn.updatedAt)}
                  </td>
                  <td className="p-3 text-right font-semibold text-[#1A1915]">
                    Rs {formatCurrency(grn.total)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-6 text-center text-[#8C8A82]">
                  No purchases found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentPurchases;
