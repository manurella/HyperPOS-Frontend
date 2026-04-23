
/**
 * Clean table-level loading skeleton.
 */
const FetchLoader = () => (
  <div className="flex flex-col items-center justify-center py-14 gap-4">
    <div className="w-10 h-10 rounded-full border-2 border-slate-200 border-t-indigo-500 animate-spin" />
    <span className="text-sm font-medium text-slate-400 tracking-wide">Fetching data…</span>
  </div>
);

export default FetchLoader;
