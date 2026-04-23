import { useState, useEffect } from "react";
import { Eye, SlidersHorizontal, X } from "lucide-react";
import { getUserData } from "../data/userData";
import FetchLoader from './FetchLoader';
import { setActive, setRole as setRoleMethod } from "../../../API/APIUser";

/* ── Shared modal shell ─────────────────────────────────────── */
function ModalShell({ title, onClose, children, footer }) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-floating w-full max-w-lg overflow-hidden animate-fade-in">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[65vh] overflow-y-auto px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
            {footer}
          </div>
        )}

      </div>
    </div>
  );
}

/* ── Info row ───────────────────────────────────────────────── */
function InfoRow({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</span>
      <div className="text-sm text-slate-700">{children}</div>
    </div>
  );
}

/* ── Section block ──────────────────────────────────────────── */
function InfoSection({ title, children }) {
  return (
    <div className="mb-5">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 pb-1 border-b border-slate-100">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

/* ── ViewModal ──────────────────────────────────────────────── */
function ViewModal({ user, onClose, refreshData }) {
  const [isActive, setIsActive] = useState(user?.isActive ?? false);
  const [role, setRole]         = useState(user?.role || "USER");
  const [isChanged, setIsChanged] = useState(false);

  const formatDate = (d) => d ? new Date(d).toLocaleString() : "—";

  const handleIsActive = async () => {
    setIsChanged(true);
    try {
      const res = await setActive(user.id, !isActive);
      alert(res.message);
      setIsActive(v => !v);
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
    }
  };

  const handleSetRole = async (e) => {
    const newRole = e.target.value;
    setIsChanged(true);
    try {
      const res = await setRoleMethod(user.id, newRole);
      alert(res.message);
      setRole(newRole);
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
    }
  };

  const handleClose = () => { onClose(); if (isChanged) refreshData(); };

  return (
    <ModalShell
      title="User Details"
      onClose={handleClose}
      footer={
        <button onClick={handleClose} className="pos-btn-primary">
          Done
        </button>
      }
    >
      <InfoSection title="Account">
        <InfoRow label="User ID">{user.id}</InfoRow>
        <InfoRow label="Username">{user.username}</InfoRow>
        <InfoRow label="Status">
          <span className={isActive ? "pos-badge-success" : "pos-badge-danger"}>
            {isActive ? "Active" : "Inactive"}
          </span>
        </InfoRow>
        <InfoRow label="Role">
          <select
            value={role}
            onChange={handleSetRole}
            className="pos-input py-1.5"
          >
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </select>
        </InfoRow>
        <InfoRow label="Toggle Status" className="col-span-2">
          <button
            onClick={handleIsActive}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              isActive
                ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                : "bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            {isActive ? "Deactivate" : "Activate"}
          </button>
        </InfoRow>
      </InfoSection>

      <InfoSection title="Contact">
        <InfoRow label="Email">{user.email || "—"}</InfoRow>
        <InfoRow label="Phone">{user.phone || "—"}</InfoRow>
      </InfoSection>

      <InfoSection title="Timestamps">
        <InfoRow label="Created">{formatDate(user.createdAt)}</InfoRow>
        <InfoRow label="Last Updated">{formatDate(user.updatedAt)}</InfoRow>
      </InfoSection>
    </ModalShell>
  );
}

/* ── FilterModal ────────────────────────────────────────────── */
function FilterModal({ onClose, onApply, currentFilters, roles }) {
  const [username, setUsername] = useState(currentFilters.username || "");
  const [email,    setEmail]    = useState(currentFilters.email    || "");
  const [role,     setRole]     = useState(currentFilters.role     || "");
  const [status,   setStatus]   = useState(currentFilters.status   || "");

  const handleApply = () => { onApply({ username, email, role, status }); onClose(); };
  const handleReset = () => { setUsername(""); setEmail(""); setRole(""); setStatus(""); };

  return (
    <ModalShell
      title="Filter Users"
      onClose={onClose}
      footer={
        <>
          <button onClick={handleReset} className="pos-btn-secondary">Reset</button>
          <button onClick={handleApply} className="pos-btn-primary">Apply Filters</button>
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} className="pos-input" placeholder="Search username…" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} className="pos-input" placeholder="Search email…" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Role</label>
          <select value={role} onChange={e => setRole(e.target.value)} className="pos-input">
            <option value="">All Roles</option>
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)} className="pos-input">
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </ModalShell>
  );
}

/* ── UserPage ───────────────────────────────────────────────── */
function UserPage() {
  const [selectedUser,     setSelectedUser]     = useState(null);
  const [searchTerm,       setSearchTerm]       = useState("");
  const [showFilterModal,  setShowFilterModal]  = useState(false);
  const [filters,          setFilters]          = useState({});
  const [userData,         setUserData]         = useState([]);
  const [loading,          setLoading]          = useState(true);
  const [error,            setError]            = useState(null);
  const [isFetching,       setIsFetching]       = useState(true);

  const formatDate = (d) => d ? new Date(d).toLocaleDateString() : "—";

  const fetchData = async () => {
    try {
      setLoading(true); setIsFetching(true);
      const data = await getUserData();
      setUserData(data || []);
    } catch (err) {
      setError("Failed to fetch user data");
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => setIsFetching(false), 1500);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const roles = [...new Set(userData.map(u => u.role))];

  const filteredData = userData.filter(u => {
    if (!u) return false;
    const q = searchTerm.toLowerCase();
    const matchesSearch = [u.id?.toString(), u.username, u.email, u.role]
      .some(f => (f || "").toLowerCase().includes(q));
    const matchesUsername = !filters.username || (u.username || "").toLowerCase().includes(filters.username.toLowerCase());
    const matchesEmail    = !filters.email    || (u.email    || "").toLowerCase().includes(filters.email.toLowerCase());
    const matchesRole     = !filters.role     || u.role === filters.role;
    const matchesStatus   = !filters.status   || (filters.status === "active" ? u.isActive : !u.isActive);
    return matchesSearch && matchesUsername && matchesEmail && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-5">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">User Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">{userData.length} total users</p>
        </div>
      </div>

      {/* Search & filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search users…"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="pos-input sm:max-w-xs"
        />
        <button
          onClick={() => setShowFilterModal(true)}
          className="pos-btn-secondary flex items-center gap-2"
        >
          <SlidersHorizontal size={15} />
          Filters
        </button>
      </div>

      {/* Table card */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-card overflow-hidden">
        {isFetching ? (
          <FetchLoader />
        ) : loading ? (
          <div className="p-8 text-center text-slate-500">Loading…</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="pos-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th className="hidden sm:table-cell">Email</th>
                  <th className="hidden md:table-cell">Role</th>
                  <th>Status</th>
                  <th className="hidden lg:table-cell">Created</th>
                  <th className="text-center">View</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? filteredData.map(u => (
                  <tr key={u.id}>
                    <td className="font-medium text-slate-500 text-xs">{u.id}</td>
                    <td className="font-medium text-slate-800">{u.username}</td>
                    <td className="hidden sm:table-cell text-slate-500">{u.email || "—"}</td>
                    <td className="hidden md:table-cell">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {u.role}
                      </span>
                    </td>
                    <td>
                      <span className={u.isActive ? "pos-badge-success" : "pos-badge-danger"}>
                        {u.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell text-slate-500">{formatDate(u.createdAt)}</td>
                    <td className="text-center">
                      <button
                        onClick={() => setSelectedUser(u)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        aria-label="View user"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-slate-400">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedUser && (
        <ViewModal user={selectedUser} onClose={() => setSelectedUser(null)} refreshData={fetchData} />
      )}
      {showFilterModal && (
        <FilterModal
          roles={roles}
          currentFilters={filters}
          onClose={() => setShowFilterModal(false)}
          onApply={setFilters}
        />
      )}

    </div>
  );
}

export default UserPage;
