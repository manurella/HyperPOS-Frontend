import { useState, useEffect } from "react";
import Select from "react-select";
import { Receipt } from "lucide-react";

const selectStyles = {
  control: (base, state) => ({
    ...base,
    background: "#ffffff",
    borderColor: state.isFocused ? "#3b82f6" : "#e4e4e7",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(59,130,246,0.1)" : "none",
    borderRadius: "0.5rem",
    minHeight: 40,
    fontSize: "0.875rem",
    "&:hover": { borderColor: "#a1a1aa" },
  }),
  singleValue: (base) => ({ ...base, color: "#18181b" }),
  menu: (base) => ({
    ...base, background: "#ffffff", borderRadius: "0.5rem",
    border: "1px solid #e4e4e7",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)", zIndex: 20,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#f4f4f5" : "#ffffff",
    color: "#18181b",
    cursor: "pointer", fontSize: "0.875rem",
  }),
  placeholder: (base) => ({ ...base, color: "#a1a1aa", fontSize: "0.875rem" }),
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
    <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center">

      {/* Invoice ID */}
      <div className="flex-1 min-w-0">
        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">
          Invoice ID
        </label>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center flex-shrink-0">
            <Receipt size={15} className="text-zinc-500" />
          </div>
          <input
            type="text"
            value={invoice?.id || "-"}
            readOnly
            className="flex-1 px-3 py-2 rounded-lg border border-zinc-100 bg-zinc-50 text-sm font-semibold text-zinc-700 outline-none cursor-default"
          />
        </div>
      </div>

      {/* Customer selector */}
      <div className="flex-1 min-w-0 w-full">
        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">
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
