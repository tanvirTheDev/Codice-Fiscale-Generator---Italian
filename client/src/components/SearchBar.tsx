import type { FormEvent, KeyboardEvent } from "react";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: (e?: FormEvent) => void;
  placeholder?: string;
  buttonText?: string;
  isLoading?: boolean;
  className?: string;
}

export default function SearchBar({
  query,
  setQuery,
  onSearch,
  placeholder = "Search city or postal code",
  buttonText = "Search",
  isLoading = false,
  className = "",
}: SearchBarProps) {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <form onSubmit={onSearch} className={`flex gap-2 ${className}`}>
      <input
        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Searching..." : buttonText}
      </button>
    </form>
  );
}
