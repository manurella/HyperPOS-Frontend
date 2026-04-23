
/**
 * Professional summary card for dashboard KPIs.
 * @param {Object} props
 * @param {string} props.title
 * @param {string|number} props.value
 * @param {string} props.subtitle
 * @param {string} props.accentColor - Tailwind color class for the top border (e.g. 'bg-indigo-500')
 * @param {React.ReactNode} props.icon
 * @param {boolean} props.isLoading
 */
function SummaryCard({ title, value, subtitle, accentColor = "bg-indigo-500", icon, isLoading = false }) {

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-card overflow-hidden transition-shadow duration-200 hover:shadow-card-hover group">

      {/* Colored top accent bar */}
      <div className={`h-1 w-full ${accentColor}`} />

      <div className="px-5 py-4">

        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
          {icon && (
            <span className="text-slate-300 group-hover:text-slate-400 transition-colors">{icon}</span>
          )}
        </div>

        {isLoading ? (
          <>
            <div className="h-8 w-32 bg-slate-100 animate-pulse rounded-md mb-2" />
            <div className="h-3 w-20 bg-slate-100 animate-pulse rounded" />
          </>
        ) : (
          <>
            <p className="text-2xl font-bold text-slate-800 tracking-tight mb-1">
              {value}
            </p>
            <p className="text-xs text-slate-400">{subtitle}</p>
          </>
        )}

      </div>
    </div>
  );
}

export default SummaryCard;
