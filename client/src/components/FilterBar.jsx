import { ArrowUpDown, CalendarDays, ThumbsUp } from "lucide-react";

export default function SortBar({ value, onChange }) {
  return (
    <div className="flex items-center gap-1 bg-slate-100 rounded-md p-0.5 text-sm font-medium">
      <button
        type="button"
        onClick={() => onChange("date")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
          value === "date"
            ? "bg-white text-slate-800 shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        <CalendarDays className="w-3.5 h-3.5" />
        Date
      </button>
      <button
        type="button"
        onClick={() => onChange("upvotes")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
          value === "upvotes"
            ? "bg-white text-slate-800 shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        <ThumbsUp className="w-3.5 h-3.5" />
        Top
      </button>
    </div>
  );
}