
const GradientButton = ( { children , onClick , className = "" } ) => {

  return (
    <button 
      onClick={onClick}
      className={`inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-colors bg-blue-600 rounded shadow-sm hover:bg-blue-700 ${className}`}
    >
      { children }
    </button>
  );

};

export default GradientButton;
