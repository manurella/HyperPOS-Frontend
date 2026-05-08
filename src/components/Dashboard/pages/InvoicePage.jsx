import { useState, useEffect } from "react";
import { Eye, SlidersHorizontal, X } from "lucide-react";
import { getInvoiceData } from "../data/invoiceData";
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

function ViewModal({ invoice, onClose }) {
  const fmt = (d) => d ? new Date(d).toLocaleString() : "N/A";
  return (
    <ModalShell title="Invoice Details" onClose={onClose} footer={<button onClick={onClose} className="pos-btn-primary">Close</button>}>
      <InfoSection title="Basic">
        <InfoRow label="Invoice ID">{invoice.id}</InfoRow>
        <InfoRow label="Customer ID">{invoice.customerId}</InfoRow>
      </InfoSection>
      <InfoSection title="Financial">
        <InfoRow label="Total" full><span className="text-[#3D7A5C] font-bold text-base">Rs {invoice.total.toLocaleString()}</span></InfoRow>
        <InfoRow label="Payment Method" full>{invoice.paymentMethod || "N/A"}</InfoRow>
      </InfoSection>
      <InfoSection title="Timestamps">
        <InfoRow label="Created">{fmt(invoice.createdAt)}</InfoRow>
        <InfoRow label="Updated">{fmt(invoice.updatedAt)}</InfoRow>
      </InfoSection>
    </ModalShell>
  );
}

function FilterModal({ onClose, onApply, currentFilters, customerList, paymentMethods }) {
  const [customerId,     setCustomerId]     = useState(currentFilters.customerId     || "");
  const [paymentMethod,  setPaymentMethod]  = useState(currentFilters.paymentMethod  || "");
  const [minTotal,       setMinTotal]       = useState(currentFilters.minTotal       || "");
  const [maxTotal,       setMaxTotal]       = useState(currentFilters.maxTotal       || "");
  const [startDate,      setStartDate]      = useState(currentFilters.startDate      || "");
  const [endDate,        setEndDate]        = useState(currentFilters.endDate        || "");
  const reset = () => { setCustomerId(""); setPaymentMethod(""); setMinTotal(""); setMaxTotal(""); setStartDate(""); setEndDate(""); };
  return (
    <ModalShell title="Filter Invoices" onClose={onClose}
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

function InvoicePage() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchTerm,      setSearchTerm]      = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters,         setFilters]         = useState({});
  const [invoiceData,     setInvoiceData]     = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [error,           setError]           = useState(null);
  const [isFetching,      setIsFetching]      = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true); setIsFetching(true);
        const data = await getInvoiceData();
        setInvoiceData(data || []);
      } catch (err) { setError("Failed to fetch invoice data"); console.error(err); }
      finally { setLoading(false); setTimeout(() => setIsFetching(false), 3000); }
    })();
  }, []);

  const customerList   = [...new Set(invoiceData.map(i => i.customerId))];
  const paymentMethods = [...new Set(invoiceData.map(i => i.paymentMethod))];
  const fmt = (d) => d ? new Date(d).toLocaleDateString() : "�";

  const filteredData = invoiceData.filter(inv => {
    const q = searchTerm.toLowerCase();
    const s = [inv.id?.toString(), inv.customerId?.toString(), inv.total?.toString(), inv.paymentMethod].some(f => (f || "").toLowerCase().includes(q));
    const mC = !filters.customerId    || inv.customerId?.toString() === filters.customerId;
    const mP = !filters.paymentMethod || inv.paymentMethod === filters.paymentMethod;
    const mT = (!filters.minTotal || inv.total >= +filters.minTotal) && (!filters.maxTotal || inv.total <= +filters.maxTotal);
    let mD = true;
    if (filters.startDate || filters.endDate) {
      const d = inv.updatedAt ? new Date(inv.updatedAt) : null;
      if (!d) mD = false;
      else {
        if (filters.startDate) { const sd = new Date(filters.startDate); sd.setHours(0,0,0,0); if (d < sd) mD = false; }
        if (filters.endDate)   { const ed = new Date(filters.endDate);   ed.setHours(23,59,59,999); if (d > ed) mD = false; }
      }
    }
    return s && mC && mP && mT && mD;
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-sans text-[28px] font-bold text-[#1A1915] tracking-[-0.02em]">Invoice Management</h1>
        <p className="text-[13px] text-[#8C8A82] mt-0.5">{invoiceData.length} total invoices</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="text" placeholder="Search invoices" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pos-input sm:max-w-xs" />
        <button onClick={() => setShowFilterModal(true)} className="pos-btn-secondary flex items-center gap-2"><SlidersHorizontal size={15} /> Filters</button>
      </div>
      <div className="bg-white border border-[#E8E5DC] rounded-[14px] overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(26,25,21,0.06), 0 4px 12px rgba(26,25,21,0.04)' }}>
        {isFetching ? <FetchLoader /> : loading ? <div className="p-8 text-center text-[#5C5A54]">Loading�</div> : error ? <div className="p-8 text-center text-[#C0392B]">{error}</div> : (
          <div className="overflow-x-auto">
            <table className="pos-table">
              <thead><tr><th>Invoice ID</th><th>Customer ID</th><th>Total</th><th className="hidden sm:table-cell">Payment</th><th className="hidden md:table-cell">Date</th><th className="text-center">View</th></tr></thead>
              <tbody>
                {filteredData.length > 0 ? filteredData.map(inv => (
                  <tr key={inv.id}>
                    <td className="font-medium text-[#5C5A54] text-xs">{inv.id}</td>
                    <td className="text-[#1A1915]">{inv.customerId}</td>
                    <td className="font-semibold text-[#3D7A5C]">Rs {inv.total.toLocaleString()}</td>
                    <td className="hidden sm:table-cell text-[#5C5A54]">{inv.paymentMethod || "�"}</td>
                    <td className="hidden md:table-cell text-[#5C5A54]">{fmt(inv.updatedAt)}</td>
                    <td className="text-center"><button onClick={() => setSelectedInvoice(inv)} className="p-2 rounded-[7px] text-[#8C8A82] hover:text-[#4F7A3F] hover:bg-[#E6F0E1] transition-colors" aria-label="View"><Eye size={16} /></button></td>
                  </tr>
                )) : <tr><td colSpan="6" className="py-12 text-center text-[#8C8A82]">No invoices found</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selectedInvoice  && <ViewModal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />}
      {showFilterModal  && <FilterModal customerList={customerList} paymentMethods={paymentMethods} currentFilters={filters} onClose={() => setShowFilterModal(false)} onApply={setFilters} />}
    </div>
  );
}

export default InvoicePage;
