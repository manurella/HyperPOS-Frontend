import { useState, useEffect } from "react";
import { Eye, SlidersHorizontal, X } from "lucide-react";
import { getGRNData } from "../data/grnData";
import FetchLoader from './FetchLoader';

function ModalShell({ title, onClose, children, footer }) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-floating w-full max-w-lg overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-800">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"><X size={18} /></button>
        </div>
        <div className="max-h-[65vh] overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}

function InfoSection({ title, children }) {
  return (
    <div className="mb-5">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 pb-1 border-b border-slate-100">{title}</h3>
      <div className="grid grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function InfoRow({ label, children, full }) {
  return (
    <div className={`flex flex-col gap-1 ${full ? "col-span-2" : ""}`}>
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</span>
      <div className="text-sm text-slate-700">{children}</div>
    </div>
  );
}

function ViewModal({ grn, onClose }) {
  const fmt = (d) => d ? new Date(d).toLocaleString() : "—";
  return (
    <ModalShell title="GRN Details" onClose={onClose} footer={<button onClick={onClose} className="pos-btn-primary">Close</button>}>
      <InfoSection title="Basic">
        <InfoRow label="GRN ID">{grn.id}</InfoRow>
        <InfoRow label="Supplier ID">{grn.supplierId}</InfoRow>
      </InfoSection>
      <InfoSection title="Financial">
        <InfoRow label="Total Amount" full><span className="text-emerald-600 font-bold text-base">Rs {grn.total.toLocaleString()}</span></InfoRow>
      </InfoSection>
      <InfoSection title="Timestamps">
        <InfoRow label="Created">{fmt(grn.createdAt)}</InfoRow>
        <InfoRow label="Updated">{fmt(grn.updatedAt)}</InfoRow>
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
    <ModalShell title="Filter GRNs" onClose={onClose}
      footer={<><button onClick={reset} className="pos-btn-secondary">Reset</button><button onClick={() => { onApply({ supplierId, minTotal, maxTotal, startDate, endDate }); onClose(); }} className="pos-btn-primary">Apply</button></>}>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2"><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Supplier ID</label>
          <select value={supplierId} onChange={e => setSupplierId(e.target.value)} className="pos-input">
            <option value="">All</option>{supplierList.map(id => <option key={id} value={id}>{id}</option>)}
          </select>
        </div>
        <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Min Total</label><input type="number" value={minTotal} onChange={e => setMinTotal(e.target.value)} className="pos-input" placeholder="0" /></div>
        <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Max Total</label><input type="number" value={maxTotal} onChange={e => setMaxTotal(e.target.value)} className="pos-input" placeholder="Any" /></div>
        <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Start Date</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="pos-input" /></div>
        <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">End Date</label><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="pos-input" /></div>
      </div>
    </ModalShell>
  );
}

function GRNPage() {
  const [selectedGRN,     setSelectedGRN]     = useState(null);
  const [searchTerm,      setSearchTerm]      = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters,         setFilters]         = useState({});
  const [grnData,         setGRNData]         = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [error,           setError]           = useState(null);
  const [isFetching,      setIsFetching]      = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true); setIsFetching(true);
        const data = await getGRNData();
        setGRNData(data || []);
      } catch (err) { setError("Failed to fetch GRN data"); console.error(err); }
      finally { setLoading(false); setTimeout(() => setIsFetching(false), 1500); }
    })();
  }, []);

  const supplierList = [...new Set(grnData.map(g => g.supplierId))];
  const fmt = (d) => d ? new Date(d).toLocaleDateString() : "—";

  const filteredData = grnData.filter(g => {
    const q = searchTerm.toLowerCase();
    const s = [g.id?.toString(), g.supplierId?.toString(), g.total?.toString()].some(f => (f || "").toLowerCase().includes(q));
    const mS = !filters.supplierId || g.supplierId?.toString() === filters.supplierId;
    const mT = (!filters.minTotal || g.total >= +filters.minTotal) && (!filters.maxTotal || g.total <= +filters.maxTotal);
    let mD = true;
    if (filters.startDate || filters.endDate) {
      const d = g.updatedAt ? new Date(g.updatedAt) : null;
      if (!d) mD = false;
      else {
        if (filters.startDate) { const sd = new Date(filters.startDate); sd.setHours(0,0,0,0); if (d < sd) mD = false; }
        if (filters.endDate)   { const ed = new Date(filters.endDate);   ed.setHours(23,59,59,999); if (d > ed) mD = false; }
      }
    }
    return s && mS && mT && mD;
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Goods Received Notes</h1>
        <p className="text-sm text-slate-500 mt-0.5">{grnData.length} total GRNs</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="text" placeholder="Search GRNs…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pos-input sm:max-w-xs" />
        <button onClick={() => setShowFilterModal(true)} className="pos-btn-secondary flex items-center gap-2"><SlidersHorizontal size={15} /> Filters</button>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-card overflow-hidden">
        {isFetching ? <FetchLoader /> : loading ? <div className="p-8 text-center text-slate-500">Loading…</div> : error ? <div className="p-8 text-center text-red-500">{error}</div> : (
          <div className="overflow-x-auto">
            <table className="pos-table">
              <thead><tr><th>GRN ID</th><th>Supplier ID</th><th>Total</th><th className="hidden md:table-cell">Date</th><th className="text-center">View</th></tr></thead>
              <tbody>
                {filteredData.length > 0 ? filteredData.map(g => (
                  <tr key={g.id}>
                    <td className="font-medium text-slate-500 text-xs">{g.id}</td>
                    <td className="text-slate-700">{g.supplierId}</td>
                    <td className="font-semibold text-emerald-600">Rs {g.total.toLocaleString()}</td>
                    <td className="hidden md:table-cell text-slate-500">{fmt(g.updatedAt)}</td>
                    <td className="text-center"><button onClick={() => setSelectedGRN(g)} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors" aria-label="View"><Eye size={16} /></button></td>
                  </tr>
                )) : <tr><td colSpan="5" className="py-12 text-center text-slate-400">No GRNs found</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selectedGRN    && <ViewModal grn={selectedGRN} onClose={() => setSelectedGRN(null)} />}
      {showFilterModal && <FilterModal supplierList={supplierList} currentFilters={filters} onClose={() => setShowFilterModal(false)} onApply={setFilters} />}
    </div>
  );
}

export default GRNPage;
