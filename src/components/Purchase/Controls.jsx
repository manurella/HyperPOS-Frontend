const Controls = ({ onNewGrn, onSubmitGrn, grn }) => (
  <div className="bg-white border border-zinc-200 rounded-xl p-5 flex justify-between items-center gap-3">
    <button
      className={`pos-btn-secondary flex items-center gap-2${!grn?.id ? " animate-pulse" : ""}`}
      onClick={onNewGrn}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      New GRN
    </button>
    <button
      className="pos-btn-primary flex items-center gap-2"
      onClick={() => onSubmitGrn()}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      Submit GRN
    </button>
  </div>
);

export default Controls;

