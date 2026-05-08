const spinnerSz = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };

const HyperPOSLoader = ({ size = 'md', text = 'Loading…', className = '' }) => (
  <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
    <svg
      className={`${spinnerSz[size] ?? spinnerSz.md} animate-spin`}
      viewBox="0 0 24 24" fill="none"
    >
      <circle
        className="opacity-20" cx="12" cy="12" r="10"
        stroke="#4F7A3F" strokeWidth="3"
      />
      <path
        className="opacity-90" fill="#4F7A3F"
        d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
      />
    </svg>
    {text && <span className="text-sm text-[#8C8A82]">{text}</span>}
  </div>
);

export const PageLoader = ({ text }) => (
  <div className="flex items-center justify-center min-h-[300px]">
    <HyperPOSLoader size="lg" text={text} />
  </div>
);

export default HyperPOSLoader;
