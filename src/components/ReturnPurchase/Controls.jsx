const Controls = ({ clear, onSubmitGRN }) => (
    <div className="flex justify-end gap-3 mt-4">
        <button
            onClick={clear}
            className="pos-btn-secondary"
        >
            Clear
        </button>
        <button
            onClick={() => onSubmitGRN()}
            className="pos-btn-primary"
        >
            Submit Return
        </button>
    </div>
);
export default Controls;
