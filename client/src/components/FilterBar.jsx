import { Search, CalendarDays, ThumbsUp } from "lucide-react";

export default function FilterBar({ sortValue, onSortChange, searchValue, onSearchChange }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Search input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search reviews..."
          className="block pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 w-44"
        />
      </div>

      {/* Sort pill toggle */}
      <div className="flex items-center gap-1 bg-slate-100 rounded-md p-0.5 text-sm font-medium">
        <button
          type="button"
          onClick={() => onSortChange("date")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
            sortValue === "date"
              ? "bg-white text-slate-800 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <CalendarDays className="w-3.5 h-3.5" />
          Date
        </button>
        <button
          type="button"
          onClick={() => onSortChange("upvotes")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
            sortValue === "upvotes"
              ? "bg-white text-slate-800 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          Top
        </button>
      </div>
    </div>
  );
}