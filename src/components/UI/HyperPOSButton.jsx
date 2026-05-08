import React from 'react';

const variantMap = {
  primary:      'bg-[#4F7A3F] text-white hover:bg-[#3D6030] font-semibold focus-visible:ring-[#4F7A3F]',
  secondary:    'bg-[#EEECE5] text-[#1A1915] hover:bg-[#E4E1D8] border border-[#E8E5DC] font-medium',
  ghost:        'bg-transparent text-[#5C5A54] hover:bg-[#EEECE5] font-medium',
  danger:       'bg-[#FAEBE9] text-[#C0392B] hover:bg-[#F5D9D6] font-medium',
  'ghost-danger':'bg-transparent text-[#C0392B] hover:bg-[#FAEBE9] font-medium',
  default:      'bg-[#EEECE5] text-[#1A1915] hover:bg-[#E4E1D8] border border-[#E8E5DC] font-medium',
};

const sizeMap = {
  sm: 'text-xs  px-3   py-1.5',
  md: 'text-sm  px-4   py-2.5',
  lg: 'text-[15px] px-5 py-3',
};

const HyperPOSButton = ({
  children,
  variant  = 'default',
  size     = 'md',
  loading  = false,
  onClick,
  className = '',
  disabled,
  ...props
}) => {
  const v = variantMap[variant] ?? variantMap.default;
  const s = sizeMap[size]       ?? sizeMap.md;
  const isDisabled = disabled || loading;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`inline-flex items-center gap-2 rounded-lg transition-all duration-[120ms] cursor-pointer outline-none
        focus-visible:ring-2 focus-visible:ring-offset-1 active:scale-[0.98]
        disabled:opacity-40 disabled:cursor-not-allowed
        ${v} ${s} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
          </svg>
          Loading…
        </>
      ) : children}
    </button>
  );
};

export default HyperPOSButton;
