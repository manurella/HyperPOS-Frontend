
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
      <div className={`${spinnerClass} rounded-full border-primary-100/20 border-t-primary-600 animate-spin`} />

      {/* Text + progress bar */}
      <div className="flex flex-col items-center gap-2">
        <span className={`${textClass} font-medium text-primary-800/60`}>{text}</span>
        <div className="h-1 w-40 bg-primary-100/50 rounded-full overflow-hidden">
          <div className="h-full bg-primary-500 rounded-full animate-progress-indeterminate" />
        </div>
      </div>

    </div>

  );

};

export default HyperPOSLoader;
