import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

function DateRangeSelector({ onRangeChange, initialStartDate, initialEndDate }) {
  const [startDate, setStartDate] = useState(initialStartDate || "");
  const [endDate, setEndDate] = useState(initialEndDate || "");
  const [activePreset, setActivePreset] = useState(null);

  useEffect(() => {
    if (initialStartDate !== startDate || initialEndDate !== endDate) {
      setActivePreset(null);
    }
  }, [initialStartDate, initialEndDate, startDate, endDate]);

  const handleApply = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (start > end) {
        const temp = startDate;
        setStartDate(endDate);
        setEndDate(temp);
        onRangeChange({ startDate: endDate, endDate: temp });
      } else {
        onRangeChange({ startDate, endDate });
      }
    }
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setActivePreset(null);
    onRangeChange({ startDate: "", endDate: "" });
  };

  const setPresetRange = (days, presetName) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
  
    const formattedEndDate = end.toISOString().split('T')[0];
    const formattedStartDate = start.toISOString().split('T')[0];
  
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
    setActivePreset(presetName);
    onRangeChange({ startDate: formattedStartDate, endDate: formattedEndDate });
  };

  const setThisMonth = () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
  
    const formattedEndDate = today.toISOString().split('T')[0];
    const formattedStartDate = start.toISOString().split('T')[0];
  
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
    setActivePreset('thisMonth');
    onRangeChange({ startDate: formattedStartDate, endDate: formattedEndDate });
  };

  const setLastMonth = () => {
    const today = new Date();
    const lastMonth = today.getMonth() - 1;
    const year = lastMonth < 0 ? today.getFullYear() - 1 : today.getFullYear();
    const month = lastMonth < 0 ? 11 : lastMonth;
  
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
  
    const formattedEndDate = end.toISOString().split('T')[0];
    const formattedStartDate = start.toISOString().split('T')[0];
  
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
    setActivePreset('lastMonth');
    onRangeChange({ startDate: formattedStartDate, endDate: formattedEndDate });
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-4 sm:p-5 flex flex-col items-center sm:items-end w-full sm:w-auto">
      
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        {/* From Date */}
        <div className="relative w-full sm:w-auto">
          <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="date" 
            className="pos-input pl-9 text-sm py-2"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setActivePreset(null);
            }}
            max={endDate || undefined}
          />
        </div>
      
        <span className="text-zinc-500 text-sm hidden sm:block">to</span>
      
        {/* To Date */}
        <div className="relative w-full sm:w-auto">
          <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="date" 
            className="pos-input pl-9 text-sm py-2"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setActivePreset(null);
            }}
            min={startDate || undefined}
          />
        </div>
      
        {/* Actions */}
        <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
          <button 
            onClick={handleApply}
            disabled={!startDate || !endDate}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              (!startDate || !endDate) 
                ? 'bg-zinc-100 text-zinc-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Apply
          </button>
          <button 
            onClick={handleReset}
            className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-zinc-100 border border-zinc-200 text-zinc-600 hover:bg-zinc-200 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap justify-center sm:justify-end gap-2 mt-3 w-full">
        {[
          { label: '7 Days', onClick: () => setPresetRange(7, 'last7Days'), id: 'last7Days' },
          { label: '30 Days', onClick: () => setPresetRange(30, 'last30Days'), id: 'last30Days' },
          { label: 'This Month', onClick: setThisMonth, id: 'thisMonth' },
          { label: 'Last Month', onClick: setLastMonth, id: 'lastMonth' }
        ].map((preset) => (
          <button 
            key={preset.id}
            onClick={preset.onClick}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activePreset === preset.id 
                ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                : 'bg-zinc-100 text-zinc-600 border border-zinc-200 hover:bg-zinc-200'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>
      
    </div>
  );
}

export default DateRangeSelector;
