
/**
 * @param {Object} props
 * @param {string} props.label - Input label.
 * @param {string} props.type - Input type (text, password, etc.).
 * @param {string} props.value - Input value.
 * @param {function} props.onChange - Change handler.
 * @param {string} props.placeholder - Input placeholder.
 * @param {string} props.className - Additional classes to apply.
 * @param {Object} props.props - Additional props to pass to the input element.
 */
const HyperPOSInput = ( { 

  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  ...props

} ) => {

  return (

    <div className = { `mb-4 ${ className }` }>
      
      { label && (
        <label className = "block mb-1.5 text-xs font-semibold text-primary-800/60 uppercase tracking-wide">
          { label }
        </label>
      ) }
      
      <div className = "relative">
        
        <input
          type = { type }
          value = { value }
          onChange = { onChange }
          placeholder = { placeholder }
          className = "w-full bg-white border border-primary-100/20 text-primary-900 px-3.5 py-2.5 rounded-xl transition-all duration-200 focus:outline-none focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/5"
          { ...props }
        />
        
      </div>
      
    </div>

  );
  
};

export default HyperPOSInput;
