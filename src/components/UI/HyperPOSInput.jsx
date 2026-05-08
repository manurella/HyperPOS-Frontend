const HyperPOSInput = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  className = '',
  ...props
}) => (
  <div className={`${className}`}>
    {label && (
      <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-[#5C5A54] mb-1.5">
        {label}
      </label>
    )}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3.5 py-[10px] bg-white border-[1.5px] rounded-lg text-sm text-[#1A1915]
        placeholder-[#8C8A82] outline-none transition-all duration-[120ms]
        ${error
          ? 'border-[#C0392B] focus:ring-[3px] focus:ring-[rgba(192,57,43,0.12)]'
          : 'border-[#E8E5DC] focus:border-[#4F7A3F] focus:ring-[3px] focus:ring-[rgba(79,122,63,0.15)]'
        }`}
      {...props}
    />
    {error && (
      <p className="text-[11.5px] text-[#C0392B] mt-1.5">{error}</p>
    )}
  </div>
);

export default HyperPOSInput;
