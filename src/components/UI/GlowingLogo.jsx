
import React from 'react';

const GlowingLogo = ({ 
  alt = 'HyperPOS', 
  className = ''
}) => {
  return (
    <h1 className={`text-[#4F7A3F] font-bold text-2xl font-sans ${className}`}>
      {alt}
    </h1>
  );
};

export default GlowingLogo;
