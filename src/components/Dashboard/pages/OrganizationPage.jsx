import { useState, useEffect } from "react";
import { Eye, SlidersHorizontal, Edit, Save, X } from "lucide-react";
import { getOrgData, updateOrgData } from "../data/orgData";
import FetchLoader from './FetchLoader';

/* -- Shared modal shell --------------------------------------- */
function ModalShell({ title, onClose, children, footer, wide }) {
  return (
    <div className="fixed inset-0 bg-[rgba(26,25,21,0.45)] backdrop-blur-[4px] flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-[16px] w-full ${wide ? "max-w-2xl" : "max-w-lg"} overflow-hidden`}>
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

/* -- Editable field -------------------------------------------- */
function EditField({ label, name, value, onChange, type = "text", children }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10.5px] font-bold text-[#8C8A82] uppercase tracking-[0.07em]">{label}</span>
      {children || (
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          className="pos-input py-2"
        />
      )}
    </div>
  );
}

/* -- ViewEditModal --------------------------------------------- */
function ViewEditModal({ organization, onClose, onUpdate }) {
  const [isEditing,    setIsEditing]    = useState(false);
  const [formData,     setFormData]     = useState({ ...organization });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error,        setError]        = useState(null);

  const fmt = (d) => d ? new Date(d).toLocaleString() : "N/A";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "number")   setFormData({ ...formData, [name]: parseInt(value, 10) });
    else if (type === "checkbox") setFormData({ ...formData, [name]: checked });
    else                    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); setError(null);
    try { await onUpdate(organization.id, formData); setIsEditing(false); }
    catch (err) { setError("Failed to update organization. Please try again."); console.error(err); }
    finally { setIsSubmitting(false); }
  };

  const InfoVal = ({ val }) => (
    <span className="text-sm text-[#1A1915] mt-0.5">{val || "�"}</span>
  );

  return (
    <ModalShell
      wide
      title={isEditing ? "Edit Organization" : "Organization Details"}
      onClose={onClose}
      footer={
        isEditing ? (
          <>
            <button type="button" onClick={() => setIsEditing(false)} disabled={isSubmitting} className="pos-btn-secondary flex items-center gap-2"><X size={14} />Cancel</button>
            <button form="org-edit-form" type="submit" disabled={isSubmitting} className="pos-btn-primary flex items-center gap-2">
              {isSubmitting ? "Saving�" : <><Save size={14} />Save Changes</>}
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => setIsEditing(true)} className="pos-btn-secondary flex items-center gap-2"><Edit size={14} />Edit</button>
            <button type="button" onClick={onClose} className="pos-btn-primary">Close</button>
          </>
        )
      }
    >
      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{error}</div>}

      <form id="org-edit-form" onSubmit={handleSubmit}>
        {/* Basic */}
        <div className="mb-5"><h3 className="text-xs font-bold text-[#5C5A54] uppercase tracking-wider mb-3 pb-1 border-b border-[#E8E5DC]">Basic Information</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1"><span className="text-[10.5px] font-bold text-[#8C8A82] uppercase tracking-[0.07em]">ID</span><InfoVal val={organization.id} /></div>
            {isEditing
              ? <EditField label="Name" name="name" value={formData.name} onChange={handleChange} />
              : <div className="flex flex-col gap-1"><span className="text-[10.5px] font-bold text-[#8C8A82] uppercase tracking-[0.07em]">Name</span><InfoVal val={organization.name} /></div>}
          </div>
        </div>

        {/* Contact */}
        <div className="mb-5"><h3 className="text-xs font-bold text-[#5C5A54] uppercase tracking-wider mb-3 pb-1 border-b border-[#E8E5DC]">Contact Information</h3>
          <div className="grid grid-cols-2 gap-3">
            {isEditing ? (
              <>
                <EditField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
                <EditField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
                <EditField label="Website" name="website" type="url" value={formData.website} onChange={handleChange} />
                <div className="col-span-2">
                  <span className="text-[10.5px] font-bold text-[#8C8A82] uppercase tracking-[0.07em] block mb-1">Address</span>
                  <textarea name="address" value={formData.address || ""} onChange={handleChange} rows={2} className="pos-input" />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-1"><span className="text-[10.5px] font-bold text-[#8C8A82] uppercase tracking-[0.07em]">Phone</span><InfoVal val={organization.phone} /></div>
                <div className="flex flex-col gap-1"><span className="text-[10.5px] font-bold text-[#8C8A82] uppercase tracking-[0.07em]">Email</span><InfoVal val={organization.email} /></div>
                <div className="flex flex-col gap-1"><span className="text-[10.5px] font-bold text-[#8C8A82] uppercase tracking-[0.07em]">Website</span><InfoVal val={organization.website} /></div>
                <div className="flex flex-col col-span-2 gap-1"><span className="text-[10.5px] font-bold text-[#8C8A82] uppercase tracking-[0.07em]">Address</span><InfoVal val={organization.address} /></div>
              </>
            )}
          </div>
        </div>

        {/* Additional */}
        <div className="mb-5"><h3 className="text-xs font-bold text-[#5C5A54] uppercase tracking-wider mb-3 pb-1 border-b border-[#E8E5DC]">Additional Details</h3>
          <div className="grid grid-cols-2 gap-3">
            {isEditing ? (
              <>
                <EditField label="Employee Count" name="employeeCount" type="number" value={formData.employeeCount} onChange={handleChange} />
                <div className="flex flex-col gap-2">
                  <span className="text-[10.5px] font-bold text-[#8C8A82] uppercase tracking-[0.07em]">Status</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="isActive" checked={!!formData.isActive} onChange={handleChange} className="w-4 h-4 text-[#4A7FA5] rounded border-[#E8E5DC] focus:ring-blue-500" />
                    <span className="text-sm text-[#1A1915]">Active</span>
                  </label>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-1"><span className="text-[10.5px] font-bold text-[#8C8A82] uppercase tracking-[0.07em]">Employees</span><InfoVal val={organization.employeeCount ?? 0} /></div>
                <div className="flex flex-col gap-1"><span className="text-[10.5px] font-bold text-[#8C8A82] uppercase tracking-[0.07em]">Status</span>
                  <span className={organization.isActive ? "pos-badge-success" : "pos-badge-danger"}>{organization.isActive ? "Active" : "Inactive"}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Timestamps */}
        <div className="mb-2"><h3 className="text-xs font-bold text-[#5C5A54] uppercase tracking-wider mb-3 pb-1 border-b border-[#E8E5DC]">Timestamps</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1"><span className="text-[10.5px] font-bold text-[#8C8A82] uppercase tracking-[0.07em]">Created</span><InfoVal val={fmt(organization.createdAt)} /></div>
            <div className="flex flex-col gap-1"><span className="text-[10.5px] font-bold text-[#8C8A82] uppercase tracking-[0.07em]">Updated</span><InfoVal val={fmt(organization.updatedAt)} /></div>
            <div className="flex flex-col gap-1"><span className="text-[10.5px] font-bold text-[#8C8A82] uppercase tracking-[0.07em]">Created By</span><InfoVal val={organization.createdBy} /></div>
            <div className="flex flex-col gap-1"><span className="text-[10.5px] font-bold text-[#8C8A82] uppercase tracking-[0.07em]">Updated By</span><InfoVal val={organization.updatedBy} /></div>
          </div>
        </div>
      </form>
    </ModalShell>
  );
}

/* -- FilterModal ---------------------------------------------- */
function FilterModal({ onClose, onApply, currentFilters }) {
  const [name,         setName]         = useState(currentFilters.name          || "");
  const [isActive,     setIsActive]     = useState(currentFilters.isActive === undefined ? "" : currentFilters.isActive.toString());
  const [minEmployees, setMinEmployees] = useState(currentFilters.minEmployees  || "");
  const [maxEmployees, setMaxEmployees] = useState(currentFilters.maxEmployees  || "");
  const reset = () => { setName(""); setIsActive(""); setMinEmployees(""); setMaxEmployees(""); };
  return (
    <ModalShell title="Filter Organizations" onClose={onClose}
      footer={<><button onClick={reset} className="pos-btn-secondary">Reset</button><button onClick={() => { onApply({ name, isActive: isActive === "" ? undefined : isActive === "true", minEmployees: minEmployees === "" ? undefined : +minEmployees, maxEmployees: maxEmployees === "" ? undefined : +maxEmployees }); onClose(); }} className="pos-btn-primary">Apply</button></>}>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2"><label className="block text-xs font-semibold text-[#5C5A54] uppercase tracking-wide mb-1.5">Name</label><input value={name} onChange={e => setName(e.target.value)} className="pos-input" placeholder="Search name" /></div>
        <div><label className="block text-xs font-semibold text-[#5C5A54] uppercase tracking-wide mb-1.5">Status</label>
          <select value={isActive} onChange={e => setIsActive(e.target.value)} className="pos-input">
            <option value="">All</option><option value="true">Active</option><option value="false">Inactive</option>
          </select>
        </div>
        <div></div>
        <div><label className="block text-xs font-semibold text-[#5C5A54] uppercase tracking-wide mb-1.5">Min Employees</label><input type="number" value={minEmployees} onChange={e => setMinEmployees(e.target.value)} className="pos-input" min="0" /></div>
        <div><label className="block text-xs font-semibold text-[#5C5A54] uppercase tracking-wide mb-1.5">Max Employees</label><input type="number" value={maxEmployees} onChange={e => setMaxEmployees(e.target.value)} className="pos-input" min="0" /></div>
      </div>
    </ModalShell>
  );
}

/* -- OrganizationPage ----------------------------------------- */
function OrganizationPage() {
  const [organizations,   setOrganizations]   = useState([]);
  const [selectedOrg,     setSelectedOrg]     = useState(null);
  const [searchTerm,      setSearchTerm]      = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters,         setFilters]         = useState({});
  const [loading,         setLoading]         = useState(true);
  const [error,           setError]           = useState(null);
  const [isFetching,      setIsFetching]      = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true); setIsFetching(true);
        const data = await getOrgData();
        setOrganizations(Array.isArray(data) ? data : [data].filter(Boolean));
      } catch (err) { setError("Failed to fetch organization data"); console.error(err); }
      finally { setLoading(false); setTimeout(() => setIsFetching(false), 1500); }
    })();
  }, []);

  const handleUpdateOrg = async (id, updatedData) => {
    try {
      const updatedOrg = await updateOrgData(updatedData);
      setOrganizations(prev => prev.map(o => o.id === id ? updatedOrg : o));
      if (selectedOrg?.id === id) setSelectedOrg(updatedOrg);
      return updatedOrg;
    } catch (err) { console.error(err); throw err; }
  };

  const filteredOrgs = organizations.filter(org => {
    if (!org) return false;
    const q = searchTerm.toLowerCase();
    const s = [org.id?.toString(), org.name, org.email, org.phone, org.address].some(f => (f || "").toLowerCase().includes(q));
    const mN = !filters.name || (org.name || "").toLowerCase().includes(filters.name.toLowerCase());
    const mS = filters.isActive === undefined || org.isActive === filters.isActive;
    const mE = (!filters.minEmployees || org.employeeCount >= filters.minEmployees) && (!filters.maxEmployees || org.employeeCount <= filters.maxEmployees);
    return s && mN && mS && mE;
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-sans text-[28px] font-bold text-[#1A1915] tracking-[-0.02em]">Organizations</h1>
        <p className="text-[13px] text-[#8C8A82] mt-0.5">{organizations.length} total organizations</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="text" placeholder="Search organizations" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pos-input sm:max-w-xs" />
        <button onClick={() => setShowFilterModal(true)} className="pos-btn-secondary flex items-center gap-2"><SlidersHorizontal size={15} /> Filters</button>
      </div>
      <div className="bg-white border border-[#E8E5DC] rounded-[14px] overflow-hidden">
        {isFetching ? <FetchLoader /> : loading ? <div className="p-8 text-center text-[#5C5A54]">Loading�</div> : error ? <div className="p-8 text-center text-[#C0392B]">{error}</div> : (
          <div className="overflow-x-auto">
            <table className="pos-table">
              <thead><tr><th>ID</th><th>Name</th><th className="hidden sm:table-cell">Email</th><th className="hidden md:table-cell">Phone</th><th className="hidden lg:table-cell">Employees</th><th>Status</th><th className="text-center">View</th></tr></thead>
              <tbody>
                {filteredOrgs.length > 0 ? filteredOrgs.map(org => (
                  <tr key={org.id}>
                    <td className="font-medium text-[#5C5A54] text-xs">{org.id}</td>
                    <td className="font-medium text-[#1A1915]">{org.name}</td>
                    <td className="hidden sm:table-cell text-[#5C5A54]">{org.email || "�"}</td>
                    <td className="hidden md:table-cell text-[#5C5A54]">{org.phone || "�"}</td>
                    <td className="hidden lg:table-cell text-[#5C5A54]">{org.employeeCount ?? 0}</td>
                    <td><span className={org.isActive ? "pos-badge-success" : "pos-badge-danger"}>{org.isActive ? "Active" : "Inactive"}</span></td>
                    <td className="text-center"><button onClick={() => setSelectedOrg(org)} className="p-1.5 rounded-lg text-[#8C8A82] hover:text-[#4A7FA5] hover:bg-[#FAFAF7] transition-colors" aria-label="View"><Eye size={16} /></button></td>
                  </tr>
                )) : <tr><td colSpan="7" className="py-12 text-center text-[#8C8A82]">No organizations found</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selectedOrg    && <ViewEditModal organization={selectedOrg} onClose={() => setSelectedOrg(null)} onUpdate={handleUpdateOrg} />}
      {showFilterModal && <FilterModal currentFilters={filters} onClose={() => setShowFilterModal(false)} onApply={setFilters} />}
    </div>
  );
}

export default OrganizationPage;
