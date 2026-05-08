import { useState, useEffect } from "react";
import { Eye, SlidersHorizontal, X } from "lucide-react";
import { getSaleData } from "../data/salesData";
import FetchLoader from './FetchLoader';

function ModalShell({ title, onClose, children, footer }) {
  return (
    <div className="fixed inset-0 bg-[rgba(26,25,21,0.45)] backdrop-blur-[4px] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[16px] w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E5DC]">
          <h2 className="text-[15px] font-semibold text-[#1A1915]">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#8C8A82] hover:text-[#1A1915] hover:bg-[#EEECE5] transition-colors"><X size={18} /></button>
        </div>
        <div className="max-h-[65vh] overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="px-6 py-4 bg-[#FAFAF7] border-t border-[#E8E5DC] flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}

function InfoSection({ title, children }) {
  return (
    <div className="mb-5">
      <h3 className="text-xs font-bold text-[#5C5A54] uppercase tracking-wider mb-3 pb-1 border-b border-[#E8E5DC]">{title}</h3>
      <div className="grid grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function InfoRow({ label, children, full }) {
  return (
    <div className={`flex flex-col gap-1 ${full ? "col-span-2" : ""}`}>
      <span className="text-xs font-semibold text-[#8C8A82] uppercase tracking-wide">{label}</span>
      <div className="text-sm text-[#1A1915]">{children}</div>
    </div>
  );
}

function ViewModal({ sale, onClose }) {
  const fmt = (d) => d ? new Date(d).toLocaleString() : "N/A";
  return (
    <ModalShell title="Sale Details" onClose={onClose} footer={<button onClick={onClose} className="pos-btn-primary">Close</button>}>
      <InfoSection title="Invoice">
        <InfoRow label="Invoice ID">{sale.invoice.id}</InfoRow>
        <InfoRow label="Customer ID">{sale.invoice.customerId}</InfoRow>
        <InfoRow label="Payment">{sale.invoice.paymentMethod}</InfoRow>
        <InfoRow label="Date">{fmt(sale.invoice.updatedAt)}</InfoRow>
      </InfoSection>
      <InfoSection title="Financial">
        <InfoRow label="Total" full><span className="text-[#3D7A5C] font-bold text-base">Rs {sale.invoice.total.toLocaleString()}</span></InfoRow>
      </InfoSection>
      <InfoSection title={`Items (${sale.items.length})`}>
        {sale.items.map(item => (
          <div key={item.id} className="col-span-2 bg-[#EEECE5]/50 border border-[#E8E5DC] rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#4A7FA5]">Item #{item.id}</span>
              <span className="text-xs bg-[#FAFAF7] text-[#5C5A54] px-2 py-0.5 rounded-full border border-[#E8E5DC]">Product #{item.productId}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#1A1915]/80">
              <span>Qty: <b>{item.quantity}</b></span>
              <span>Unit: <b>Rs {item.unitPrice?.toLocaleString()}</b></span>
              <span>Discount: <b>{item.discount}%</b></span>
              <span>Amount: <b className="text-[#3D7A5C]">Rs {item.amount?.toLocaleString()}</b></span>
            </div>
          </div>
        ))}
      </InfoSection>
    </ModalShell>
  );
}

function FilterModal({ onClose, onApply, customerList, paymentMethods, currentFilters }) {
  const [customerId,    setCustomerId]    = useState(currentFilters.customerId    || "");
  const [paymentMethod, setPaymentMethod] = useState(currentFilters.paymentMethod || "");
  const [minTotal,      setMinTotal]      = useState(currentFilters.minTotal      || "");
  const [maxTotal,      setMaxTotal]      = useState(currentFilters.maxTotal      || "");
  const [startDate,     setStartDate]     = useState(currentFilters.startDate     || "");
  const [endDate,       setEndDate]       = useState(currentFilters.endDate       || "");
  const reset = () => { setCustomerId(""); setPaymentMethod(""); setMinTotal(""); setMaxTotal(""); setStartDate(""); setEndDate(""); };
  return (
    <ModalShell title="Filter Sales" onClose={onClose}
      footer={<><button onClick={reset} className="pos-btn-secondary">Reset</button><button onClick={() => { onApply({ customerId, paymentMethod, minTotal, maxTotal, startDate, endDate }); onClose(); }} className="pos-btn-primary">Apply</button></>}>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-xs font-semibold text-[#5C5A54] uppercase tracking-wide mb-1.5">Customer ID</label>
          <select value={customerId} onChange={e => setCustomerId(e.target.value)} className="pos-input">
            <option value="">All</option>{customerList.map(id => <option key={id} value={id}>{id}</option>)}
          </select>
        </div>
        <div><label className="block text-xs font-semibold text-[#5C5A54] uppercase tracking-wide mb-1.5">Payment</label>
          <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="pos-input">
            <option value="">All</option>{paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div><label className="block text-xs font-semibold text-[#5C5A54] uppercase tracking-wide mb-1.5">Min Total</label><input type="number" value={minTotal} onChange={e => setMinTotal(e.target.value)} className="pos-input" placeholder="0" /></div>
        <div><label className="block text-xs font-semibold text-[#5C5A54] uppercase tracking-wide mb-1.5">Max Total</label><input type="number" value={maxTotal} onChange={e => setMaxTotal(e.target.value)} className="pos-input" placeholder="Any" /></div>
        <div><label className="block text-xs font-semibold text-[#5C5A54] uppercase tracking-wide mb-1.5">Start Date</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="pos-input" /></div>
        <div><label className="block text-xs font-semibold text-[#5C5A54] uppercase tracking-wide mb-1.5">End Date</label><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="pos-input" /></div>
      </div>
    </ModalShell>
  );
}

function SalePage() {
  const [selectedSale,    setSelectedSale]    = useState(null);
  const [searchTerm,      setSearchTerm]      = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters,         setFilters]         = useState({});
  const [saleData,        setSaleData]        = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [error,           setError]           = useState(null);
  const [isFetching,      setIsFetching]      = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true); setIsFetching(true);
        const data = await getSaleData();
        setSaleData(data || []);
      } catch (err) { setError("Failed to fetch sale data"); console.error(err); }
      finally { setLoading(false); setTimeout(() => setIsFetching(false), 1500); }
    })();
  }, []);

  const customerList   = [...new Set(saleData.filter(s => s?.invoice?.customerId).map(s => s.invoice.customerId))];
  const paymentMethods = [...new Set(saleData.filter(s => s?.invoice?.paymentMethod).map(s => s.invoice.paymentMethod))];
  const fmt = (d) => d ? new Date(d).toLocaleDateString() : "�";

  const filteredData = saleData.filter(sale => {
    if (!sale?.invoice) return false;
    const q = searchTerm.toLowerCase();
    const s = [sale.invoice.id?.toString(), sale.invoice.customerId?.toString(), sale.invoice.total?.toString(), sale.invoice.paymentMethod].some(f => (f || "").toLowerCase().includes(q));
    const mC = !filters.customerId    || sale.invoice.customerId?.toString() === filters.customerId;
    const mP = !filters.paymentMethod || sale.invoice.paymentMethod === filters.paymentMethod;
    const mT = (!filters.minTotal || sale.invoice.total >= +filters.minTotal) && (!filters.maxTotal || sale.invoice.total <= +filters.maxTotal);
    const mD = (!filters.startDate || !sale.invoice.updatedAt || new Date(sale.invoice.updatedAt) >= new Date(filters.startDate)) &&
               (!filters.endDate   || !sale.invoice.updatedAt || new Date(sale.invoice.updatedAt) <= new Date(filters.endDate + "T23:59:59"));
    return s && mC && mP && mT && mD;
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-sans text-[28px] font-bold text-[#1A1915] tracking-[-0.02em]">Sales Management</h1>
        <p className="text-[13px] text-[#8C8A82] mt-0.5">{saleData.length} total sales</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="text" placeholder="Search sales" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pos-input sm:max-w-xs" />
        <button onClick={() => setShowFilterModal(true)} className="pos-btn-secondary flex items-center gap-2"><SlidersHorizontal size={15} /> Filters</button>
      </div>
      <div className="bg-white border border-[#E8E5DC] rounded-[14px] overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(26,25,21,0.06), 0 4px 12px rgba(26,25,21,0.04)' }}>
        {isFetching ? <FetchLoader /> : loading ? <div className="p-8 text-center text-[#5C5A54]">Loading�</div> : error ? <div className="p-8 text-center text-[#C0392B]">{error}</div> : (
          <div className="overflow-x-auto">
            <table className="pos-table">
              <thead><tr><th>Invoice ID</th><th>Customer ID</th><th>Total</th><th className="hidden sm:table-cell">Payment</th><th className="hidden md:table-cell">Items</th><th className="hidden lg:table-cell">Date</th><th className="text-center">View</th></tr></thead>
              <tbody>
                {filteredData.length > 0 ? filteredData.map(sale => (
                  <tr key={sale.invoice.id}>
                    <td className="font-medium text-[#5C5A54] text-xs">{sale.invoice.id}</td>
                    <td className="text-[#1A1915]">{sale.invoice.customerId}</td>
                    <td className="font-semibold text-[#3D7A5C]">Rs {sale.invoice.total.toLocaleString()}</td>
                    <td className="hidden sm:table-cell text-[#5C5A54]">{sale.invoice.paymentMethod}</td>
                    <td className="hidden md:table-cell text-[#5C5A54]">{sale.items.length}</td>
                    <td className="hidden lg:table-cell text-[#5C5A54]">{fmt(sale.invoice.updatedAt)}</td>
                    <td className="text-center"><button onClick={() => setSelectedSale(sale)} className="p-2 rounded-[7px] text-[#8C8A82] hover:text-[#4F7A3F] hover:bg-[#E6F0E1] transition-colors" aria-label="View"><Eye size={16} /></button></td>
                  </tr>
                )) : <tr><td colSpan="7" className="py-12 text-center text-[#8C8A82]">No sales found</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selectedSale    && <ViewModal sale={selectedSale} onClose={() => setSelectedSale(null)} />}
      {showFilterModal && <FilterModal customerList={customerList} paymentMethods={paymentMethods} currentFilters={filters} onClose={() => setShowFilterModal(false)} onApply={setFilters} />}
    </div>
  );
}

export default SalePage;
