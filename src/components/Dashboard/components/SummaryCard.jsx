function SummaryCard({
  title, value, subtitle, trend,
  icon,
  iconColor  = '#4F7A3F',
  iconBgColor= '#E6F0E1',
  accentColor= '#4F7A3F',
  isLoading  = false,
}) {
  return (
    <div
      className="bg-white border border-[#E8E5DC] rounded-[14px] overflow-hidden flex relative"
      style={{ boxShadow: '0 1px 3px rgba(26,25,21,0.06), 0 4px 12px rgba(26,25,21,0.04)' }}
    >
      {/* Left accent bar */}
      <div className="w-[3px] flex-shrink-0 rounded-r" style={{ background: accentColor }} />

      <div className="flex-1 px-5 py-[22px]">
        <div className="flex items-start justify-between mb-2">
          <div className="min-w-0">
            {isLoading ? (
              <>
                <div className="h-7 w-28 bg-[#EEECE5] animate-pulse rounded-md mb-2" />
                <div className="h-3 w-20 bg-[#EEECE5] animate-pulse rounded" />
              </>
            ) : (
              <>
                <p className="text-[26px] font-bold text-[#1A1915] leading-tight">{value}</p>
                <p className="text-[13px] font-medium text-[#5C5A54] mt-0.5">{title}</p>
                {subtitle && <p className="text-[11px] text-[#8C8A82] mt-0.5">{subtitle}</p>}
              </>
            )}
          </div>
          {icon && (
            <div
              className="w-[42px] h-[42px] rounded-[10px] flex items-center justify-center flex-shrink-0 ml-3"
              style={{ background: iconBgColor, color: iconColor }}
            >
              {icon}
            </div>
          )}
        </div>

        {trend && !isLoading && (
          <p className={`text-[11px] font-semibold mt-1 ${trend.startsWith('+') ? 'text-[#3D7A5C]' : 'text-[#C0392B]'}`}>
            {trend}
          </p>
        )}
      </div>
    </div>
  );
}

export default SummaryCard;
