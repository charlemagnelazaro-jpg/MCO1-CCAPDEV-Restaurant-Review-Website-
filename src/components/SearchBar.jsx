import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { restaurants } from "../restaurant";
import { Link } from "react-router-dom";

const restaurantNames = restaurants.map(r => r.name);
restaurantNames.sort();

export default function SearchBar() {
  const [suggestions, setSuggestions] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]); 
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-4 h-4 text-gray-500" />
      </div>
      
      <input
        type="text"
        onClick={() => setSuggestions(restaurantNames)}
        onChange={(e) => {
           const val = e.target.value;
           if (!val) return setSuggestions([]);
           setSuggestions(restaurantNames.filter(r => r.toLowerCase().includes(val.toLowerCase())));
        }}
        className="block w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-md 
                   text-sm placeholder-gray-500
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Search"
        
      />
      
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {suggestions.map((name, index) => (
            <Link key={index} to={`/review/${encodeURIComponent(name)}`} onClick={() => setSuggestions([])}>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                {name}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}