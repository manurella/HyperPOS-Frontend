import { useState, useEffect } from "react";
import Select from "react-select";
import { Receipt } from "lucide-react";

const selectStyles = {
  control: (base, state) => ({
    ...base,
    background: "#ffffff",
    borderColor: state.isFocused ? "#4F7A3F" : "#E8E5DC",
    borderWidth: "1.5px",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(79,122,63,0.15)" : "none",
    borderRadius: "8px",
    minHeight: 40,
    fontSize: "0.875rem",
    "&:hover": { borderColor: "#D4D0C4" },
  }),
  singleValue: (base) => ({ ...base, color: "#1A1915" }),
  menu: (base) => ({
    ...base, background: "#ffffff", borderRadius: "10px",
    border: "1.5px solid #E8E5DC",
    boxShadow: "0 4px 16px rgba(26,25,21,0.10)", zIndex: 20,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#FAFAF7" : "#ffffff",
    color: "#1A1915",
    cursor: "pointer", fontSize: "0.875rem",
  }),
  placeholder: (base) => ({ ...base, color: "#8C8A82", fontSize: "0.875rem" }),
};

const Header = ({ invoice, customers, setCustomer }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(1);

  useEffect(() => {
    if (invoice) setSelectedCustomer(invoice.customerId);
  }, [invoice]);

  const customerOptions = customers.map(c => ({
    label: `${c?.name} (ID: ${c?.id})`,
    value: c?.id,
  }));

  const handleCustomerChange = (opt) => {
    setSelectedCustomer(opt.value);
    setCustomer(opt.value);
  };

  return (
    <div className="bg-white border border-[#E8E5DC] rounded-[14px] p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center"
      style={{ boxShadow: '0 1px 3px rgba(26,25,21,0.06), 0 4px 12px rgba(26,25,21,0.04)' }}>

      {/* Invoice ID */}
      <div className="flex-1 min-w-0">
        <label className="block text-xs font-semibold text-[#8C8A82] uppercase tracking-wide mb-1.5">
          Invoice ID
        </label>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#EEECE5] flex items-center justify-center flex-shrink-0">
            <Receipt size={15} className="text-[#8C8A82]" />
          </div>
          <input
            type="text"
            value={invoice?.id || "-"}
            readOnly
            className="flex-1 px-3 py-2 rounded-lg border border-[#E8E5DC] bg-[#FAFAF7] text-sm font-semibold text-[#1A1915] outline-none cursor-default"
          />
        </div>
      </div>

      {/* Customer selector */}
      <div className="flex-1 min-w-0 w-full">
        <label className="block text-xs font-semibold text-[#8C8A82] uppercase tracking-wide mb-1.5">
          Customer
        </label>
        <Select
          options={customerOptions}
          value={customerOptions.find(c => c.value === selectedCustomer) || null}
          onChange={handleCustomerChange}
          placeholder="Select customer..."
          isSearchable
          styles={selectStyles}
        />
      </div>

    </div>
  );
};

export default Header;
