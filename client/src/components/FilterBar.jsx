import { Search } from "lucide-react";

export default function ReviewFilter({ onChange }) {
  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-4 h-4 text-gray-500" />
      </div>
      <input
        type="text"
        onChange={onChange}
        placeholder="Search reviews..."
        className="block w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}