import { useState, useEffect, useRef } from "react";
import { Search, Barcode, Plus } from "lucide-react";
import { getProductStock } from "../../API/APIProducts";

const ProductSearch = ({ onAdd, invoice, setProductList }) => {
  const [searchTerm,        setSearchTerm]        = useState("");
  const [barcode,           setBarcode]           = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity,          setQuantity]          = useState(1);
  const [suggestions,       setSuggestions]       = useState([]);
  const [products,          setProducts]          = useState([]);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProductStock();
        setProducts(res);
        setProductList(res);
      } catch (err) { console.error("Error fetching products:", err); }
    })();
  }, []);

  useEffect(() => {
    setSuggestions(searchTerm
      ? products.filter(p => p?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
      : []);
  }, [searchTerm, products]);

  useEffect(() => {
    if (barcode) {
      const found = products.find(p => p?.barcode === barcode.trim());
      if (found) { setSelectedProductId(found.id.toString()); setSearchTerm(found.name); }
    }
  }, [barcode]);

  useEffect(() => {
    const handler = e => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target))
        setSuggestions([]);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedProduct = products.find(p => p?.id === parseInt(selectedProductId));
  const unit     = selectedProduct?.unit || "-";
  const price    = selectedProduct?.price || 0;
  const discount = selectedProduct?.discount || 0;
  const stock    = selectedProduct?.stock ?? "-";
  const amount   = (price * quantity * (1 - discount / 100)).toFixed(2);

  const handleAdd = () => {
    if (selectedProduct && quantity > 0) {
      onAdd({
        invoiceId:  invoice?.id,
        productId:  selectedProduct.id,
        name:       selectedProduct.name,
        unitPrice:  selectedProduct.price,
        costPrice:  selectedProduct.cost,
        unit:       selectedProduct.unit,
        quantity,
        discount:   selectedProduct.discount,
        amount:     parseFloat(amount),
      });
      setSearchTerm(""); setSelectedProductId(""); setQuantity(1);
      setBarcode(""); setSuggestions([]);
    }
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-5">
      <h3 className="pos-section-title mb-4">Add Product</h3>

      <div className="space-y-4">

        {/* Search + Barcode */}
        <div className="flex flex-col sm:flex-row gap-3 relative" ref={suggestionsRef}>
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text" placeholder="Search by name..."
              value={searchTerm} autoComplete="off"
              onChange={e => { setSearchTerm(e.target.value); setSelectedProductId(""); }}
              className="pos-input pl-9"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-zinc-100 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {suggestions.map(p => (
                  <li key={p.id}
                    onClick={() => { setSelectedProductId(p.id.toString()); setSearchTerm(p.name); setBarcode(p.barcode || ""); setSuggestions([]); }}
                    className="flex items-center justify-between px-3 py-2.5 hover:bg-zinc-50 cursor-pointer text-sm text-zinc-700 transition-colors border-b border-zinc-50 last:border-0">
                    <span className="font-medium">{p.name}</span>
                    <span className="text-xs text-zinc-400 ml-4">Stock: {p.stock}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative sm:w-52">
            <Barcode size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text" placeholder="Scan barcode..."
              value={barcode}
              onChange={e => setBarcode(e.target.value)}
              className="pos-input pl-9"
            />
          </div>
        </div>

        {/* Product detail chips */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: "Unit",     value: unit },
            { label: "Price",    value: `Rs ${price.toFixed(2)}` },
            { label: "Discount", value: `${discount}%` },
            { label: "Stock",    value: stock },
            { label: "Amount",   value: `Rs ${amount}`, highlight: true },
          ].map(({ label, value, highlight }) => (
            <div key={label} className={`rounded-lg px-3 py-2 border ${highlight ? "bg-blue-50 border-blue-100" : "bg-zinc-50 border-zinc-100"}`}>
              <p className={`text-xs font-semibold uppercase tracking-wide mb-0.5 ${highlight ? "text-blue-500" : "text-zinc-400"}`}>{label}</p>
              <p className={`text-sm font-semibold ${highlight ? "text-blue-700" : "text-zinc-700"}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Product select + Qty + Add */}
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">Product</label>
            <select
              value={selectedProductId}
              onChange={e => setSelectedProductId(e.target.value)}
              className="pos-input"
            >
              <option value="">Select product...</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name} (Stock: {p.stock})</option>
              ))}
            </select>
          </div>

          <div className="sm:w-28">
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">Quantity</label>
            <input
              type="number" min="1" value={quantity}
              onChange={e => setQuantity(parseInt(e.target.value) || 1)}
              className="pos-input text-center"
            />
          </div>

          <button onClick={handleAdd} type="button" className="pos-btn-primary">
            <Plus size={16} />
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductSearch;
