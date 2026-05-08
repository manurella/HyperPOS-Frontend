import { useState, useEffect } from "react";
import { Eye, SlidersHorizontal, X, Search } from "lucide-react";
import { getProductData } from "../data/productData";
import FetchLoader from './FetchLoader';
import { getCategories } from "../../../API/APICategory";
import { billUrl } from "../../../API/APILinks";

/* -- Shared helpers ------------------------------------------- */
function ModalShell({ title, onClose, children, footer }) {
  return (
    <div className="fixed inset-0 bg-[rgba(26,25,21,0.45)] backdrop-blur-[4px] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[16px] w-full max-w-lg overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(26,25,21,0.18)' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E5DC]">
          <h2 className="text-[15px] font-semibold text-[#1A1915]">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#8C8A82] hover:text-[#1A1915] hover:bg-[#EEECE5] transition-colors">
            <X size={17} />
          </button>
        </div>
        <div className="max-h-[65vh] overflow-y-auto px-6 py-5">{children}</div>
        {footer && (
          <div className="px-6 py-4 bg-[#FAFAF7] border-t border-[#E8E5DC] flex justify-end gap-3">{footer}</div>
        )}
      </div>
    </div>
  );
}

function InfoSection({ title, children }) {
  return (
    <div className="mb-5">
      <h3 className="text-[10px] font-bold text-[#8C8A82] uppercase tracking-[0.09em] mb-3 pb-1.5 border-b border-[#E8E5DC]">{title}</h3>
      <div className="grid grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function InfoRow({ label, children, full }) {
  return (
    <div className={`flex flex-col gap-1 ${full ? "col-span-2" : ""}`}>
      <span className="text-[10.5px] font-semibold text-[#8C8A82] uppercase tracking-wide">{label}</span>
      <div className="text-[13px] text-[#1A1915]">{children}</div>
    </div>
  );
}

/* -- ViewModal ------------------------------------------------ */
function ViewModal({ product, onClose }) {
  return (
    <ModalShell
      title="Product Details"
      onClose={onClose}
      footer={<button onClick={onClose} className="btn-primary">Close</button>}
    >
      <div className="flex flex-col items-center mb-5 gap-3">
        {product.image ? (
          <img src={`${billUrl}/${product.image}`} alt={product.name} className="max-h-32 rounded-[10px] object-contain border border-[#E8E5DC]" />
        ) : (
          <div className="w-20 h-20 rounded-[10px] bg-[#FAFAF7] border border-[#E8E5DC] flex items-center justify-center text-3xl">📦</div>
        )}
        <div className="text-center">
          <p className="text-[17px] font-bold text-[#1A1915]">{product.name}</p>
          <span className={product.isActive ? "badge-success mt-1 inline-flex" : "badge-danger mt-1 inline-flex"}>
            {product.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <InfoSection title="Basic Information">
        <InfoRow label="Product ID">{product.id}</InfoRow>
        <InfoRow label="Barcode"><span className="font-mono">{product.barcode || "-"}</span></InfoRow>
        <InfoRow label="Category">{product.categoryId}</InfoRow>
        <InfoRow label="Unit">{product.unit}</InfoRow>
      </InfoSection>

      <InfoSection title="Pricing">
        <InfoRow label="Base Price"><span className="text-[#3D7A5C] font-semibold">Rs {product.price?.toLocaleString()}</span></InfoRow>
        <InfoRow label="Discount"><span className="text-[#B5860D]">{product.discount}%</span></InfoRow>
        <InfoRow label="Final Price" full>
          <span className="text-[18px] font-bold text-[#3D7A5C]">
            Rs {(product.price * (1 - product.discount / 100)).toLocaleString()}
          </span>
        </InfoRow>
      </InfoSection>

      {product.description && (
        <InfoSection title="Description">
          <InfoRow label="" full>
            <p className="text-[#5C5A54] leading-relaxed">{product.description}</p>
          </InfoRow>
        </InfoSection>
      )}
    </ModalShell>
  );
}

/* -- FilterModal ---------------------------------------------- */
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

  const ic = "input";
  const lc = "input-label";

  return (
    <ModalShell
      title="Filter Products"
      onClose={onClose}
      footer={
        <>
          <button onClick={handleReset} className="btn-secondary">Reset</button>
          <button onClick={handleApply} className="btn-primary">Apply Filters</button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className={lc}>Name</label><input value={name} onChange={e => setName(e.target.value)} className={ic} placeholder="Filter by name" /></div>
          <div><label className={lc}>Barcode</label><input value={barcode} onChange={e => setBarcode(e.target.value)} className={ic} placeholder="Filter by barcode" /></div>
          <div>
            <label className={lc}>Category</label>
            <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className={ic}>
              <option value="">All</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className={lc}>Unit</label>
            <select value={unit} onChange={e => setUnit(e.target.value)} className={ic}>
              <option value="">All</option>
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className={lc}>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className={ic}>
              <option value="">All</option><option value="active">Active</option><option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-[#8C8A82] uppercase tracking-[0.09em] mb-2 pb-1 border-b border-[#E8E5DC]">Price Range</p>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lc}>Min Price</label><input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} className={ic} placeholder="0" /></div>
            <div><label className={lc}>Max Price</label><input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className={ic} placeholder="Any" /></div>
            <div><label className={lc}>Min Discount %</label><input type="number" value={minDiscount} onChange={e => setMinDiscount(e.target.value)} className={ic} placeholder="0" /></div>
            <div><label className={lc}>Max Discount %</label><input type="number" value={maxDiscount} onChange={e => setMaxDiscount(e.target.value)} className={ic} placeholder="100" /></div>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

/* -- ProductPage ---------------------------------------------- */
function ProductPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm,      setSearchTerm]      = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters,         setFilters]         = useState({});
  const [productData,     setProductData]     = useState([]);
  const [categories,      setCategories]      = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [error,           setError]           = useState(null);
  const [isFetching,      setIsFetching]      = useState(true);

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

      {/* Header */}
      <div>
        <h1 className="font-sans text-[28px] font-bold text-[#1A1915] tracking-[-0.02em]">Product Management</h1>
        <p className="text-[13px] text-[#8C8A82] mt-0.5">{productData.length} total products</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative sm:max-w-xs w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8A82]" />
          <input
            type="text" placeholder="Search products…"
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            className="input pl-9 w-full"
          />
        </div>
        <button onClick={() => setShowFilterModal(true)} className="btn-secondary flex items-center gap-2">
          <SlidersHorizontal size={15} /> Filters
          {Object.values(filters).filter(Boolean).length > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#4F7A3F] text-white text-[10px] font-bold flex items-center justify-center">
              {Object.values(filters).filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {/* Table card */}
      <div className="bg-white border border-[#E8E5DC] rounded-[14px] overflow-hidden"
        style={{ boxShadow: '0 1px 3px rgba(26,25,21,0.06), 0 4px 12px rgba(26,25,21,0.04)' }}>
        {isFetching ? <FetchLoader />
          : loading ? <div className="p-8 text-center text-[#8C8A82]">Loading…</div>
          : error   ? <div className="p-8 text-center text-[#C0392B]">{error}</div>
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
                      <td className="font-mono text-[12px] text-[#8C8A82]">{p.id}</td>
                      <td className="font-semibold text-[#1A1915]">{p.name}</td>
                      <td className="hidden sm:table-cell text-[#5C5A54]">{getCategoryName(p.categoryId)}</td>
                      <td className="hidden md:table-cell">
                        <div className="flex flex-col">
                          <span className="text-[#3D7A5C] font-semibold">Rs {p.price?.toLocaleString()}</span>
                          {p.discount > 0 && <span className="text-[11px] text-[#B5860D]">-{p.discount}%</span>}
                        </div>
                      </td>
                      <td className="hidden lg:table-cell">
                        <span className={p.isActive ? "badge-success" : "badge-danger"}>
                          {p.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => setSelectedProduct(p)}
                          className="p-2 rounded-[7px] text-[#8C8A82] hover:text-[#4F7A3F] hover:bg-[#E6F0E1] transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="py-16 text-center text-[#5C5A54]">
                        <div className="flex flex-col items-center gap-2">
                          <div className="text-[#D4D0C4] text-4xl">📦</div>
                          <p className="font-semibold">No products found</p>
                          <p className="text-[13px] text-[#8C8A82]">Try adjusting your filters.</p>
                        </div>
                      </td>
                    </tr>
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
