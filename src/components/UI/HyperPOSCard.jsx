import React from 'react';

const HyperPOSCard = ({ children, title, action, className = '', elevated = false }) => {
  const shadow = elevated
    ? '0 4px 16px rgba(26,25,21,0.10), 0 12px 40px rgba(26,25,21,0.08)'
    : '0 1px 3px rgba(26,25,21,0.06), 0 4px 12px rgba(26,25,21,0.04)';

  return (
    <div
      className={`bg-white border border-[#E8E5DC] rounded-[14px] overflow-hidden ${className}`}
      style={{ boxShadow: shadow }}
    >
      {title && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E5DC]">
          <h3 className="text-[15px] font-semibold text-[#1A1915]">{title}</h3>
          {action && <div>{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default HyperPOSCard;
