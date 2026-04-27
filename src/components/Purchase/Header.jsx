import React, { useState, useEffect } from "react";
import Select from "react-select";

const Header = ({ grn, suppliers, setSupplier }) => {
  const [selectedSupplier, setSelectedSupplier] = useState(1);

  useEffect(() => {
    if (grn) {
      setSelectedSupplier(grn.supplierId);
    }
  }, [grn]);

  const supplierOptions = suppliers.map((supplier) => ({
    label: `${supplier?.name} (ID: ${supplier?.id})`,
    value: supplier?.id,
  }));

  const handleSupplierChange = (selectedOption) => {
    setSelectedSupplier(selectedOption);
    setSupplier(selectedOption.value);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5">
      <h3 className="pos-section-title mb-4">Purchase / GRN</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
            GRN ID
          </label>
          <input
            type="text"
            value={grn?.id || ""}
            readOnly
            className="pos-input bg-blue-50/20"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wide mb-1.5">
            Supplier
          </label>
          <Select
            options={supplierOptions}
            value={
              selectedSupplier
                ? supplierOptions.find((c) => c.value === selectedSupplier)
                : null
            }
            onChange={handleSupplierChange}
            placeholder="Select Supplier"
            isSearchable
            getOptionLabel={(e) => e.label}
            getOptionValue={(e) => e.value}
            classNamePrefix="react-select"
            styles={{
              control: (base) => ({
                ...base,
                borderColor: "#e2e8f0",
                borderRadius: "0.5rem",
                minHeight: "2.5rem",
                boxShadow: "none",
                "&:hover": { borderColor: "#a855f7" },
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
