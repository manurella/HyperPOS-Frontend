
import React from 'react';

const GlowingLogo = ({ 
  alt = 'HyperPOS', 
  className = ''
}) => {
  return (
    <h1 className={`text-blue-600 font-bold text-2xl ${className}`}>
      {alt}
    </h1>
  );
};

export default GlowingLogo;