import { useState, useEffect } from "react";
import { Eye, SlidersHorizontal, X } from "lucide-react";
import { getCustomerData } from "../data/customerData";
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

function ViewModal({ customer, onClose }) {
  const fmt = (d) => d ? new Date(d).toLocaleString() : "—";
  return (
    <ModalShell title="Customer Details" onClose={onClose} footer={<button onClick={onClose} className="pos-btn-primary">Close</button>}>
      <InfoSection title="Basic">
        <InfoRow label="ID">{customer.id}</InfoRow>
        <InfoRow label="Status"><span className={customer.isActive ? "pos-badge-success" : "pos-badge-danger"}>{customer.isActive ? "Active" : "Inactive"}</span></InfoRow>
        <InfoRow label="Name" full>{customer.name}</InfoRow>
      </InfoSection>
      <InfoSection title="Contact">
        <InfoRow label="Email" full>{customer.email || "—"}</InfoRow>
        <InfoRow label="Phone">{customer.phone || "—"}</InfoRow>
        <InfoRow label="Address" full>{customer.address || "—"}</InfoRow>
      </InfoSection>
      <InfoSection title="Timestamps">
        <InfoRow label="Created">{fmt(customer.createdAt)}</InfoRow>
        <InfoRow label="Updated">{fmt(customer.updatedAt)}</InfoRow>
      </InfoSection>
    </ModalShell>
  );
}

function FilterModal({ onClose, onApply, currentFilters }) {
  const [name,    setName]    = useState(currentFilters.name    || "");
  const [email,   setEmail]   = useState(currentFilters.email   || "");
  const [phone,   setPhone]   = useState(currentFilters.phone   || "");
  const [address, setAddress] = useState(currentFilters.address || "");
  const [status,  setStatus]  = useState(currentFilters.status  || "");
  const reset = () => { setName(""); setEmail(""); setPhone(""); setAddress(""); setStatus(""); };
  return (
    <ModalShell title="Filter Customers" onClose={onClose} footer={<><button onClick={reset} className="pos-btn-secondary">Reset</button><button onClick={() => { onApply({ name, email, phone, address, status }); onClose(); }} className="pos-btn-primary">Apply</button></>}>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2"><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Name</label><input value={name} onChange={e => setName(e.target.value)} className="pos-input" placeholder="Search name…" /></div>
        <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Email</label><input value={email} onChange={e => setEmail(e.target.value)} className="pos-input" placeholder="Search email…" /></div>
        <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Phone</label><input value={phone} onChange={e => setPhone(e.target.value)} className="pos-input" placeholder="Search phone…" /></div>
        <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)} className="pos-input">
            <option value="">All</option><option value="active">Active</option><option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </ModalShell>
  );
}

function CustomerPage() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm,       setSearchTerm]       = useState("");
  const [showFilterModal,  setShowFilterModal]  = useState(false);
  const [filters,          setFilters]          = useState({});
  const [customerData,     setCustomerData]     = useState([]);
  const [loading,          setLoading]          = useState(true);
  const [error,            setError]            = useState(null);
  const [isFetching,       setIsFetching]       = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true); setIsFetching(true);
        const data = await getCustomerData();
        setCustomerData(data || []);
      } catch (err) { setError("Failed to fetch customer data"); console.error(err); }
      finally { setLoading(false); setTimeout(() => setIsFetching(false), 1500); }
    })();
  }, []);

  const filteredData = customerData.filter(c => {
    const q = searchTerm.toLowerCase();
    const s = [c.id?.toString(), c.name, c.email, c.phone, c.address].some(f => (f || "").toLowerCase().includes(q));
    const mN = !filters.name    || (c.name    || "").toLowerCase().includes(filters.name.toLowerCase());
    const mE = !filters.email   || (c.email   || "").toLowerCase().includes(filters.email.toLowerCase());
    const mP = !filters.phone   || (c.phone   || "").includes(filters.phone);
    const mA = !filters.address || (c.address || "").toLowerCase().includes(filters.address.toLowerCase());
    const mS = !filters.status  || (filters.status === "active" ? c.isActive : !c.isActive);
    return s && mN && mE && mP && mA && mS;
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Customer Management</h1>
        <p className="text-sm text-slate-500 mt-0.5">{customerData.length} total customers</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="text" placeholder="Search customers…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pos-input sm:max-w-xs" />
        <button onClick={() => setShowFilterModal(true)} className="pos-btn-secondary flex items-center gap-2"><SlidersHorizontal size={15} /> Filters</button>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-card overflow-hidden">
        {isFetching ? <FetchLoader /> : loading ? <div className="p-8 text-center text-slate-500">Loading…</div> : error ? <div className="p-8 text-center text-red-500">{error}</div> : (
          <div className="overflow-x-auto">
            <table className="pos-table">
              <thead><tr><th>ID</th><th>Name</th><th className="hidden sm:table-cell">Email</th><th className="hidden md:table-cell">Phone</th><th className="hidden lg:table-cell">Status</th><th className="text-center">View</th></tr></thead>
              <tbody>
                {filteredData.length > 0 ? filteredData.map(c => (
                  <tr key={c.id}>
                    <td className="font-medium text-slate-500 text-xs">{c.id}</td>
                    <td className="font-medium text-slate-800">{c.name}</td>
                    <td className="hidden sm:table-cell text-slate-500">{c.email || "—"}</td>
                    <td className="hidden md:table-cell text-slate-500">{c.phone || "—"}</td>
                    <td className="hidden lg:table-cell"><span className={c.isActive ? "pos-badge-success" : "pos-badge-danger"}>{c.isActive ? "Active" : "Inactive"}</span></td>
                    <td className="text-center"><button onClick={() => setSelectedCustomer(c)} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors" aria-label="View"><Eye size={16} /></button></td>
                  </tr>
                )) : <tr><td colSpan="6" className="py-12 text-center text-slate-400">No customers found</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selectedCustomer && <ViewModal customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />}
      {showFilterModal && <FilterModal currentFilters={filters} onClose={() => setShowFilterModal(false)} onApply={setFilters} />}
    </div>
  );
}

export default CustomerPage;