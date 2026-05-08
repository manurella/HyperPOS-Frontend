
const GradientButton = ( { children , onClick , className = "" } ) => {

  return (
    <button 
      onClick={onClick}
      className={`inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-colors bg-[#4F7A3F] rounded shadow-sm hover:bg-[#3D6030] ${className}`}
    >
      { children }
    </button>
  );

};

export default GradientButton;
