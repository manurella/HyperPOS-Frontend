
function SummaryCard({ title, value, subtitle, accentColor = "bg-blue-500", icon, isLoading = false, iconColor = "text-blue-600", iconBgColor = "bg-blue-100" }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
      <div className={`h-1 w-full ${accentColor}`} />
      <div className="px-5 py-4">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{title}</span>
          {icon && <span className={`${iconColor} ${iconBgColor} p-2.5 rounded-lg flex items-center justify-center w-10 h-10`}>{icon}</span>}
        </div>
        {isLoading ? (
          <>
            <div className="h-8 w-32 bg-zinc-100 animate-pulse rounded-md mb-2" />
            <div className="h-3 w-20 bg-zinc-100 animate-pulse rounded" />
          </>
        ) : (
          <>
            <p className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-1">{value}</p>
            <p className="text-xs text-zinc-400">{subtitle}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default SummaryCard;
