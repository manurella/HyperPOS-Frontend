import { useState, useEffect } from "react";
import { Eye, SlidersHorizontal, X } from "lucide-react";
import { getProductData } from "../data/productData";
import FetchLoader from './FetchLoader';
import { getCategories } from "../../../API/APICategory";
import { billUrl } from "../../../API/APILinks";

/* ── Shared helpers (same pattern across all pages) ─────────── */
function ModalShell({ title, onClose, children, footer }) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-floating w-full max-w-lg overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-800">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[65vh] overflow-y-auto px-6 py-5">{children}</div>
        {footer && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">{footer}</div>
        )}
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

/* ── ViewModal ──────────────────────────────────────────────── */
function ViewModal({ product, onClose }) {
  return (
    <ModalShell
      title="Product Details"
      onClose={onClose}
      footer={<button onClick={onClose} className="pos-btn-primary">Close</button>}
    >
      {/* Image & name */}
      <div className="flex flex-col items-center mb-5 gap-3">
        {product.image ? (
          <img src={`${billUrl}/${product.image}`} alt={product.name} className="max-h-40 rounded-xl object-contain border border-slate-100 shadow-sm" />
        ) : (
          <div className="w-24 h-24 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300 text-3xl">📦</div>
        )}
        <div className="text-center">
          <p className="text-base font-bold text-slate-800">{product.name}</p>
          <span className={product.isActive ? "pos-badge-success" : "pos-badge-danger"}>
            {product.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <InfoSection title="Basic Information">
        <InfoRow label="Product ID">{product.id}</InfoRow>
        <InfoRow label="Barcode"><span className="font-mono">{product.barcode || "—"}</span></InfoRow>
        <InfoRow label="Category">{product.categoryId}</InfoRow>
        <InfoRow label="Unit">{product.unit}</InfoRow>
      </InfoSection>

      <InfoSection title="Pricing">
        <InfoRow label="Base Price">Rs {product.price.toLocaleString()}</InfoRow>
        <InfoRow label="Discount">{product.discount}%</InfoRow>
        <InfoRow label="Final Price" full>
          <span className="text-emerald-600 font-bold text-base">
            Rs {(product.price * (1 - product.discount / 100)).toLocaleString()}
          </span>
        </InfoRow>
      </InfoSection>

      {product.description && (
        <InfoSection title="Description">
          <InfoRow label="" full>
            <p className="text-slate-600 leading-relaxed">{product.description}</p>
          </InfoRow>
        </InfoSection>
      )}
    </ModalShell>
  );
}

/* ── FilterModal ────────────────────────────────────────────── */
function FilterModal({ onClose, onApply, currentFilters, categories, units }) {
  const [name,        setName]        = useState(currentFilters.name        || "");
  const [barcode,     setBarcode]     = useState(currentFilters.barcode     || "");
  const [categoryId,  setCategoryId]  = useState(currentFilters.categoryId  || "");
  const [unit,        setUnit]        = useState(currentFilters.unit        || "");
  const [minPrice,    setMinPrice]    = useState(currentFilters.minPrice    || "");
  const [maxPrice,    setMaxPrice]    = useState(currentFilters.maxPrice    || "");
  const [minDiscount, setMinDiscount] = useState(currentFilters.minDiscount || "");
  const [maxDiscount, setMaxDiscount] = useState(currentFilters.maxDiscount || "");
  const [status,      setStatus]      = useState(currentFilters.status      || "");

  const handleApply = () => { onApply({ name, barcode, categoryId, unit, minPrice, maxPrice, minDiscount, maxDiscount, status }); onClose(); };
  const handleReset = () => { setName(""); setBarcode(""); setCategoryId(""); setUnit(""); setMinPrice(""); setMaxPrice(""); setMinDiscount(""); setMaxDiscount(""); setStatus(""); };

  return (
    <ModalShell
      title="Filter Products"
      onClose={onClose}
      footer={<><button onClick={handleReset} className="pos-btn-secondary">Reset</button><button onClick={handleApply} className="pos-btn-primary">Apply Filters</button></>}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Name</label><input value={name} onChange={e => setName(e.target.value)} className="pos-input" placeholder="Filter by name" /></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Barcode</label><input value={barcode} onChange={e => setBarcode(e.target.value)} className="pos-input" placeholder="Filter by barcode" /></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Category</label>
            <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="pos-input">
              <option value="">All</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Unit</label>
            <select value={unit} onChange={e => setUnit(e.target.value)} className="pos-input">
              <option value="">All</option>
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="pos-input">
              <option value="">All</option><option value="active">Active</option><option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div><p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 pb-1 border-b border-slate-100">Price Range</p>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Min Price</label><input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="pos-input" placeholder="0" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Max Price</label><input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="pos-input" placeholder="Any" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Min Discount %</label><input type="number" value={minDiscount} onChange={e => setMinDiscount(e.target.value)} className="pos-input" placeholder="0" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Max Discount %</label><input type="number" value={maxDiscount} onChange={e => setMaxDiscount(e.target.value)} className="pos-input" placeholder="100" /></div>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

/* ── ProductPage ────────────────────────────────────────────── */
function ProductPage() {
  const [selectedProduct,  setSelectedProduct]  = useState(null);
  const [searchTerm,       setSearchTerm]       = useState("");
  const [showFilterModal,  setShowFilterModal]  = useState(false);
  const [filters,          setFilters]          = useState({});
  const [productData,      setProductData]      = useState([]);
  const [categories,       setCategories]       = useState([]);
  const [loading,          setLoading]          = useState(true);
  const [error,            setError]            = useState(null);
  const [isFetching,       setIsFetching]       = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true); setIsFetching(true);
        const [data, cats] = await Promise.all([getProductData(), getCategories()]);
        setProductData(data || []);
        setCategories(cats || []);
      } catch (err) {
        setError("Failed to fetch product data");
        console.error(err);
      } finally {
        setLoading(false);
        setTimeout(() => setIsFetching(false), 1500);
      }
    })();
  }, []);

  const units = [...new Set(productData.map(p => p.unit))];

  const getCategoryName = (id) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.name : id;
  };

  const filteredData = productData.filter(p => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = [p.id?.toString(), p.name, p.barcode, p.unit, p.price?.toString(), p.discount?.toString()]
      .some(f => (f || "").toLowerCase().includes(q));
    const matchesName     = !filters.name     || (p.name     || "").toLowerCase().includes(filters.name.toLowerCase());
    const matchesBarcode  = !filters.barcode  || (p.barcode  || "").toLowerCase().includes(filters.barcode.toLowerCase());
    const matchesCategory = !filters.categoryId || p.categoryId?.toString() === filters.categoryId;
    const matchesUnit     = !filters.unit     || p.unit === filters.unit;
    const matchesPrice    = (!filters.minPrice || p.price >= +filters.minPrice) && (!filters.maxPrice || p.price <= +filters.maxPrice);
    const matchesDiscount = (!filters.minDiscount || p.discount >= +filters.minDiscount) && (!filters.maxDiscount || p.discount <= +filters.maxDiscount);
    const matchesStatus   = !filters.status   || (filters.status === "active" ? p.isActive : !p.isActive);
    return matchesSearch && matchesName && matchesBarcode && matchesCategory && matchesUnit && matchesPrice && matchesDiscount && matchesStatus;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Product Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">{productData.length} total products</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input type="text" placeholder="Search products…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pos-input sm:max-w-xs" />
        <button onClick={() => setShowFilterModal(true)} className="pos-btn-secondary flex items-center gap-2">
          <SlidersHorizontal size={15} /> Filters
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-card overflow-hidden">
        {isFetching ? <FetchLoader />
          : loading ? <div className="p-8 text-center text-slate-500">Loading…</div>
          : error   ? <div className="p-8 text-center text-red-500">{error}</div>
          : (
            <div className="overflow-x-auto">
              <table className="pos-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th className="hidden sm:table-cell">Category</th>
                    <th className="hidden md:table-cell">Price</th>
                    <th className="hidden lg:table-cell">Status</th>
                    <th className="text-center">View</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? filteredData.map(p => (
                    <tr key={p.id}>
                      <td className="font-medium text-slate-500 text-xs">{p.id}</td>
                      <td className="font-medium text-slate-800">{p.name}</td>
                      <td className="hidden sm:table-cell text-slate-500">{getCategoryName(p.categoryId)}</td>
                      <td className="hidden md:table-cell">
                        <div className="flex flex-col">
                          <span className="text-emerald-600 font-semibold">Rs {p.price.toLocaleString()}</span>
                          {p.discount > 0 && <span className="text-xs text-amber-500">-{p.discount}%</span>}
                        </div>
                      </td>
                      <td className="hidden lg:table-cell">
                        <span className={p.isActive ? "pos-badge-success" : "pos-badge-danger"}>
                          {p.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="text-center">
                        <button onClick={() => setSelectedProduct(p)} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors" aria-label="View product">
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="6" className="py-12 text-center text-slate-400">No products found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )
        }
      </div>

      {selectedProduct && <ViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      {showFilterModal && <FilterModal categories={categories} units={units} currentFilters={filters} onClose={() => setShowFilterModal(false)} onApply={setFilters} />}
    </div>
  );
}

export default ProductPage;
