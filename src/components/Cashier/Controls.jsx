import { FilePlus, CheckCircle } from "lucide-react";

const Controls = ({ onNewInvoice, onSubmitInvoice, invoice }) => (
  <div className="flex items-center justify-between gap-4 pt-1">

    <button
      onClick={onNewInvoice}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-150 ${
        invoice?.id
          ? "bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50"
          : "bg-indigo-50 border-indigo-300 text-indigo-600 animate-pulse"
      }`}
    >
      <FilePlus size={16} />
      New Invoice
    </button>

    <button
      onClick={onSubmitInvoice}
      className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors duration-150"
    >
      <CheckCircle size={16} />
      Submit Invoice
    </button>

  </div>
);

export default Controls;
