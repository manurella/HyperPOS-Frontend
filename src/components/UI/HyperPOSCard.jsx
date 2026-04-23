
import React from 'react';

/**
 * Clean professional card component.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content.
 * @param {string} props.title - Optional card title.
 * @param {string} props.className - Additional classes.
 */
const HyperPOSCard = ({ children, title, className = '' }) => {

  return (

    <div className={`bg-white border border-slate-200 rounded-xl shadow-card overflow-hidden ${className}`}>

      { title && (
        <div className="border-b border-slate-100 px-5 py-4">
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
            { title }
          </h3>
        </div>
      ) }

      <div>
        { children }
      </div>

    </div>

  );

};

export default HyperPOSCard;