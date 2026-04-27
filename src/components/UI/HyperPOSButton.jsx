
import React from 'react';

/**
 * Professional button component.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'default'|'primary'|'secondary'|'danger'} props.variant
 * @param {function} props.onClick
 * @param {string} props.className
 */
const HyperPOSButton = ({
  children,
  variant = 'default',
  onClick,
  className = '',
  ...props
}) => {

  const variantStyles = {
    default   : 'bg-white border-primary-100/20 text-primary-800 hover:bg-primary-50/20 hover:border-primary-100/20',
    primary   : 'bg-primary-600 border-primary-600 text-white hover:bg-primary-700 shadow-sm',
    secondary : 'bg-slate-800 border-slate-800 text-white hover:bg-slate-900',
    danger    : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300',
  };

  const variantStyle = variantStyles[variant] || variantStyles.default;

  return (

    <button
      onClick={ onClick }
      className={ `inline-flex items-center gap-2 px-3.5 py-2 border rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${variantStyle} ${className}` }
      { ...props }
    >
      { children }
    </button>

  );

};

export default HyperPOSButton;
