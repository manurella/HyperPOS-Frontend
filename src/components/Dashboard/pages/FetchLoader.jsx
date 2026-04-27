
/**
 * Clean table-level loading skeleton.
 */
const FetchLoader = () => (
  <div className="flex flex-col items-center justify-center py-14 gap-4">
    <div className="w-10 h-10 rounded-full border-2 border-zinc-200 border-t-blue-500 animate-spin" />
    <span className="text-sm font-medium text-zinc-500 tracking-wide">Fetching data...</span>
  </div>
);

export default FetchLoader;
