
/**
 * Clean professional inline loader.
 * @param {Object} props
 * @param {'sm'|'md'|'lg'} props.size
 * @param {string} props.text
 * @param {string} props.className
 */
const HyperPOSLoader = ({ size = 'md', text = 'Loading data...', className = '' }) => {

  const spinnerSizes = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-2',
    lg: 'w-16 h-16 border-[3px]',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const spinnerClass = spinnerSizes[size] || spinnerSizes.md;
  const textClass   = textSizes[size]   || textSizes.md;

  return (

    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>

      {/* Spinner */}
      <div className={`${spinnerClass} rounded-full border-slate-200 border-t-indigo-600 animate-spin`} />

      {/* Text + progress bar */}
      <div className="flex flex-col items-center gap-2">
        <span className={`${textClass} font-medium text-slate-500`}>{text}</span>
        <div className="h-1 w-40 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 rounded-full animate-progress-indeterminate" />
        </div>
      </div>

    </div>

  );

};

export default HyperPOSLoader;