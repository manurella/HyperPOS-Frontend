import { useState, useEffect } from "react";
import { getProductStock } from "../../API/APIProducts";

const ProductSearch = ({ onAdd, grn, setProductList }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [barcode, setBarcode] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unitCost, setUnitCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      const response = await getProductStock();
      setProducts(response);
      setProductList(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching product stock:", error);
    }
  };

  useEffect(() => {
    if (barcode) {
      const found = products?.find((p) => p?.barcode === barcode.trim());
      if (found) {
        setSelectedProductId(found?.id.toString());
        setSearchTerm(found?.name);
        setUnitCost(found?.cost);
      }
    }
  }, [barcode]);

  useEffect(() => {
    const filtered = products?.filter((p) =>
      p?.name.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setSuggestions(filtered);
  }, [searchTerm]);

  const selectedProduct = products?.find(
    (p) => p?.id === parseInt(selectedProductId)
  );

  const unit = selectedProduct?.unit || "";
  const amount = (unitCost * quantity * (1 - discount / 100)).toFixed(2);

  const handleAdd = () => {
    console.log("Selected Product:", selectedProduct);

    if (selectedProduct && quantity > 0) {
      onAdd({
        GRNId: grn?.id,
        productId: selectedProduct?.id,
        name: selectedProduct?.name,
        unitCost,
        unit: selectedProduct?.unit,
        quantity,
        discount,
        amount: parseFloat(amount),
      });

      setSearchTerm("");
      setSelectedProductId("");
      setQuantity(1);
      setBarcode("");
    }
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5">
      <h3 className="pos-section-title mb-4">Add Item</h3>
      <div className="space-y-4">
        {/* Search & Barcode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
          <div>
            <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
              Search by Name
            </label>
            <input
              type="text"
              placeholder="Type product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pos-input"
            />
            {suggestions.length > 0 && searchTerm && (
              <ul className="absolute z-20 left-0 right-1/2 bg-white border border-zinc-200 rounded-xl shadow-lg mt-1 max-h-44 overflow-y-auto">
                {suggestions.map((product) => (
                  <li
                    key={product?.id}
                    className="cursor-pointer hover:bg-blue-50 px-3 py-2 flex justify-between text-sm text-zinc-700"
                    onClick={() => {
                      setSelectedProductId(product?.id);
                      setSearchTerm(product?.name);
                      setBarcode(product?.barcode);
                      setUnitCost(product?.cost);
                    }}
                  >
                    <span className="font-medium">{product?.name}</span>
                    <span className="text-zinc-700/40">Stock: {product?.stock}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
              Barcode
            </label>
            <input
              type="text"
              placeholder="Scan or enter barcode..."
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              className="pos-input"
            />
          </div>
        </div>

        {/* Product Info chips */}
        {selectedProduct && (
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-50/20 border border-zinc-200 rounded-lg px-3 py-2 text-xs font-medium text-zinc-700/80">
              Unit: <span className="text-zinc-900 font-semibold">{unit}</span>
            </span>
            <span className="bg-blue-50/20 border border-zinc-200 rounded-lg px-3 py-2 text-xs font-medium text-zinc-700/80">
              Cost: <span className="text-zinc-900 font-semibold">Rs. {unitCost?.toFixed(2)}</span>
            </span>
            <span className="bg-blue-50/20 border border-zinc-200 rounded-lg px-3 py-2 text-xs font-medium text-zinc-700/80">
              Discount: <span className="text-zinc-900 font-semibold">{discount}%</span>
            </span>
            <span className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-xs font-medium text-blue-600">
              Total: <span className="font-semibold">Rs. {amount}</span>
            </span>
          </div>
        )}

        {/* Controls row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
              Select Item
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => {
                setSelectedProductId(e.target.value);
                setUnitCost(
                  products.find((p) => p.id === parseInt(e.target.value))
                    ?.cost || 0
                );
              }}
              className="pos-input"
            >
              <option value="">Select Item</option>
              {products.map((product) => (
                <option key={product?.id} value={product?.id}>
                  {product?.name} | ({product?.stock})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
              Qty
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="pos-input"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
              &nbsp;
            </label>
            <button className="pos-btn-primary w-full flex items-center justify-center gap-2" onClick={handleAdd}>
              Add to Cart
            </button>
          </div>
        </div>

        {/* Cost & Discount row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
              Unit Cost (Rs.)
            </label>
            <input
              type="number"
              min="1"
              value={unitCost}
              onChange={(e) => setUnitCost(parseInt(e.target.value))}
              className="pos-input"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
              Discount (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(parseInt(e.target.value))}
              className="pos-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
