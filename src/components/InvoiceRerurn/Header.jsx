import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const Header = ({ invoice, selectInvoice }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      selectInvoice(searchValue.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <h3 className="pos-section-title mb-4">Invoice Return</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        {/* Search */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            Search Invoice by ID
          </label>
          <div className="flex">
            <input
              type="number"
              name="search"
              placeholder="Enter invoice ID..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pos-input rounded-r-none"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="pos-btn-primary rounded-l-none px-4 flex items-center justify-center"
              tabIndex={-1}
            >
              <IoSearchSharp className="text-lg" />
            </button>
          </div>
        </div>
        {/* Invoice ID */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            Invoice ID
          </label>
          <input
            type="text"
            value={invoice?.id || ""}
            readOnly
            className="pos-input bg-slate-50"
          />
        </div>
        {/* Customer ID */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            Customer ID
          </label>
          <input
            type="text"
            value={invoice?.customerId || ""}
            readOnly
            className="pos-input bg-slate-50"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
