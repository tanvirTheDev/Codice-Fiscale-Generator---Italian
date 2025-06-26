import axios from "axios";
import { useState } from "react";
import SearchBar from "./SearchBar";

export interface PostalEntry {
  city: string;
  province: string;
  postalCode: string;
  address?: string;
  region?: string;
  prefix?: string;
  belfiore?: string;
}

interface PostalCodeSearchProps {
  onResultsChange: (results: PostalEntry[]) => void;
  onLoadingChange: (isLoading: boolean) => void;
  placeholder?: string;
  buttonText?: string;
  className?: string;
  isLoading?: boolean;
}

export default function PostalCodeSearch({
  onResultsChange,
  onLoadingChange,
  placeholder = "Search city or postal code",
  buttonText = "Search",
  className = "",
}: PostalCodeSearchProps) {
  const [query, setQuery] = useState("");

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!query.trim()) return;

    onLoadingChange(true);
    // ${
    //   import.meta.env.VITE_API_URL || "http://localhost:5000"
    // }
    try {
      const res = await axios.get(
        `https://codice-fiscale-backend.onrender.com/api/postal-code?query=${query}`
      );
      onResultsChange(res.data);
    } catch (err) {
      console.error(err);
      alert("Error searching");
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <SearchBar
      query={query}
      setQuery={setQuery}
      onSearch={handleSearch}
      placeholder={placeholder}
      buttonText={buttonText}
      className={className}
    />
  );
}
