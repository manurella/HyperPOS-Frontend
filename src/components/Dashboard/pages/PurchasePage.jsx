import { useState, useEffect } from "react";
import { Eye, SlidersHorizontal, X } from "lucide-react";
import { getPurchaseData } from "../data/purchaseData";
import FetchLoader from './FetchLoader';

function ModalShell({ title, onClose, children, footer }) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-floating w-full max-w-lg overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100/10">
          <h2 className="text-base font-semibold text-zinc-900">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-700/80 hover:bg-zinc-100 transition-colors"><X size={18} /></button>
        </div>
        <div className="max-h-[65vh] overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="px-6 py-4 bg-zinc-100/30 border-t border-zinc-100/10 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}

function InfoSection({ title, children }) {
  return (
    <div className="mb-5">
      <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-wider mb-3 pb-1 border-b border-zinc-100/10">{title}</h3>
      <div className="grid grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function InfoRow({ label, children, full }) {
  return (
    <div className={`flex flex-col gap-1 ${full ? "col-span-2" : ""}`}>
      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">{label}</span>
      <div className="text-sm text-zinc-700">{children}</div>
    </div>
  );
}

function ViewModal({ purchase, onClose }) {
  const fmt = (d) => d ? new Date(d).toLocaleString() : "N/A";
  return (
    <ModalShell title="Purchase Details" onClose={onClose} footer={<button onClick={onClose} className="pos-btn-primary">Close</button>}>
      <InfoSection title="Purchase Info">
        <InfoRow label="Purchase ID">{purchase.grn.id}</InfoRow>
        <InfoRow label="Supplier ID">{purchase.grn.supplierId}</InfoRow>
        <InfoRow label="Date" full>{fmt(purchase.grn.updatedAt)}</InfoRow>
      </InfoSection>
      <InfoSection title="Financial">
        <InfoRow label="Total" full><span className="text-emerald-600 font-bold text-base">Rs {purchase.grn.total.toLocaleString()}</span></InfoRow>
      </InfoSection>
      <InfoSection title={`Items (${purchase.items.length})`}>
        {purchase.items.map(item => (
          <div key={item.id} className="col-span-2 bg-zinc-100/30 border border-zinc-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-blue-600">Item #{item.id}</span>
              <span className="text-xs bg-zinc-50 text-blue-700 px-2 py-0.5 rounded-full border border-zinc-100">Product #{item.productId}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-zinc-700/80">
              <span>Qty: <b>{item.quantity}</b></span>
              <span>Unit Cost: <b>Rs {item.unitCost?.toLocaleString()}</b></span>
              <span>Discount: <b>{item.discount}%</b></span>
              <span>Amount: <b className="text-emerald-600">Rs {item.amount?.toLocaleString()}</b></span>
            </div>
          </div>
        ))}
      </InfoSection>
    </ModalShell>
  );
}

function FilterModal({ onClose, onApply, supplierList, currentFilters }) {
  const [supplierId, setSupplierId] = useState(currentFilters.supplierId || "");
  const [minTotal,   setMinTotal]   = useState(currentFilters.minTotal   || "");
  const [maxTotal,   setMaxTotal]   = useState(currentFilters.maxTotal   || "");
  const [startDate,  setStartDate]  = useState(currentFilters.startDate  || "");
  const [endDate,    setEndDate]    = useState(currentFilters.endDate    || "");
  const reset = () => { setSupplierId(""); setMinTotal(""); setMaxTotal(""); setStartDate(""); setEndDate(""); };
  return (
    <ModalShell title="Filter Purchases" onClose={onClose}
      footer={<><button onClick={reset} className="pos-btn-secondary">Reset</button><button onClick={() => { onApply({ supplierId, minTotal, maxTotal, startDate, endDate }); onClose(); }} className="pos-btn-primary">Apply</button></>}>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2"><label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">Supplier ID</label>
          <select value={supplierId} onChange={e => setSupplierId(e.target.value)} className="pos-input">
            <option value="">All</option>{supplierList.map(id => <option key={id} value={id}>{id}</option>)}
          </select>
        </div>
        <div><label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">Min Total</label><input type="number" value={minTotal} onChange={e => setMinTotal(e.target.value)} className="pos-input" placeholder="0" /></div>
        <div><label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">Max Total</label><input type="number" value={maxTotal} onChange={e => setMaxTotal(e.target.value)} className="pos-input" placeholder="Any" /></div>
        <div><label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">Start Date</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="pos-input" /></div>
        <div><label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">End Date</label><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="pos-input" /></div>
      </div>
    </ModalShell>
  );
}

function PurchasePage() {
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [searchTerm,       setSearchTerm]       = useState("");
  const [showFilterModal,  setShowFilterModal]  = useState(false);
  const [filters,          setFilters]          = useState({});
  const [purchaseData,     setPurchaseData]     = useState([]);
  const [loading,          setLoading]          = useState(true);
  const [error,            setError]            = useState(null);
  const [isFetching,       setIsFetching]       = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true); setIsFetching(true);
        const data = await getPurchaseData();
        setPurchaseData(data || []);
      } catch (err) { setError("Failed to fetch purchase data"); console.error(err); }
      finally { setLoading(false); setTimeout(() => setIsFetching(false), 1500); }
    })();
  }, []);

  const supplierList = [...new Set(purchaseData.filter(p => p?.grn?.supplierId).map(p => p.grn.supplierId))];
  const fmt = (d) => d ? new Date(d).toLocaleDateString() : "�";

  const filteredData = purchaseData.filter(p => {
    if (!p?.grn) return false;
    const q = searchTerm.toLowerCase();
    const s = [p.grn.id?.toString(), p.grn.supplierId?.toString(), p.grn.total?.toString()].some(f => (f || "").toLowerCase().includes(q));
    const mS = !filters.supplierId || p.grn.supplierId?.toString() === filters.supplierId;
    const mT = (!filters.minTotal || p.grn.total >= +filters.minTotal) && (!filters.maxTotal || p.grn.total <= +filters.maxTotal);
    const mD = (!filters.startDate || !p.grn.updatedAt || new Date(p.grn.updatedAt) >= new Date(filters.startDate)) &&
               (!filters.endDate   || !p.grn.updatedAt || new Date(p.grn.updatedAt) <= new Date(filters.endDate + "T23:59:59"));
    return s && mS && mT && mD;
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">Purchase Management</h1>
        <p className="text-sm text-zinc-600 mt-0.5">{purchaseData.length} total purchases</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="text" placeholder="Search purchases" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pos-input sm:max-w-xs" />
        <button onClick={() => setShowFilterModal(true)} className="pos-btn-secondary flex items-center gap-2"><SlidersHorizontal size={15} /> Filters</button>
      </div>
      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
        {isFetching ? <FetchLoader /> : loading ? <div className="p-8 text-center text-zinc-600">Loading�</div> : error ? <div className="p-8 text-center text-red-500">{error}</div> : (
          <div className="overflow-x-auto">
            <table className="pos-table">
              <thead><tr><th>Purchase ID</th><th>Supplier ID</th><th>Total</th><th className="hidden md:table-cell">Items</th><th className="hidden lg:table-cell">Date</th><th className="text-center">View</th></tr></thead>
              <tbody>
                {filteredData.length > 0 ? filteredData.map(p => (
                  <tr key={p.grn.id}>
                    <td className="font-medium text-zinc-600 text-xs">{p.grn.id}</td>
                    <td className="text-zinc-700">{p.grn.supplierId}</td>
                    <td className="font-semibold text-emerald-600">Rs {p.grn.total.toLocaleString()}</td>
                    <td className="hidden md:table-cell text-zinc-600">{p.items.length}</td>
                    <td className="hidden lg:table-cell text-zinc-600">{fmt(p.grn.updatedAt)}</td>
                    <td className="text-center"><button onClick={() => setSelectedPurchase(p)} className="p-1.5 rounded-lg text-zinc-500 hover:text-blue-600 hover:bg-zinc-50 transition-colors" aria-label="View"><Eye size={16} /></button></td>
                  </tr>
                )) : <tr><td colSpan="6" className="py-12 text-center text-zinc-500">No purchases found</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selectedPurchase  && <ViewModal purchase={selectedPurchase} onClose={() => setSelectedPurchase(null)} />}
      {showFilterModal   && <FilterModal supplierList={supplierList} currentFilters={filters} onClose={() => setShowFilterModal(false)} onApply={setFilters} />}
    </div>
  );
}

export default PurchasePage;
