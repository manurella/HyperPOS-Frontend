import { FilePlus, CheckCircle } from "lucide-react";

const Controls = ({ onNewInvoice, onSubmitInvoice, invoice }) => (
  <div className="flex items-center justify-end gap-3 pt-1">

    <button
      onClick={onNewInvoice}
      className={`pos-btn-secondary ${!invoice?.id ? "animate-pulse ring-2 ring-primary-500 ring-offset-1" : ""}`}
    >
      <FilePlus size={16} />
      New Invoice
    </button>

    <button
      onClick={onSubmitInvoice}
      className="pos-btn-primary"
    >
      <CheckCircle size={16} />
      Submit Invoice
    </button>

  </div>
);

export default Controls;
