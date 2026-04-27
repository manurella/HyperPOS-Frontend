const Controls = ({ clear, onSubmitInvoice }) => (
  <div className="flex justify-end gap-3 mt-4">
    <button
      className="pos-btn-secondary"
      onClick={clear}
      type="button"
    >
      Clear
    </button>
    <button
      className="pos-btn-primary"
      onClick={onSubmitInvoice}
      type="button"
    >
      Submit Return Invoice
    </button>
  </div>
);

export default Controls;
