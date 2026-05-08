const FetchLoader = () => (
  <div className="flex flex-col items-center justify-center py-14 gap-3">
    <svg className="w-8 h-8 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="#4F7A3F" strokeWidth="3" />
      <path className="opacity-90" fill="#4F7A3F" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z" />
    </svg>
    <span className="text-sm text-[#8C8A82]">Fetching data…</span>
  </div>
);

export default FetchLoader;
