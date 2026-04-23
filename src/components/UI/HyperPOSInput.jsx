
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
        <label className = "block mb-2 text-sm text-slate-700 font-medium">
          { label }
        </label>
      ) }
      
      <div className = "relative">
        
        <input
          type = { type }
          value = { value }
          onChange = { onChange }
          placeholder = { placeholder }
          className = "w-full bg-white border border-slate-300 text-slate-800 p-2 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          { ...props }
        />
        
      </div>
      
    </div>

  );
  
};

export default HyperPOSInput;