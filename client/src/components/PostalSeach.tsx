import axios from "axios";
import { useState } from "react";

interface PostalEntry {
  city: string;
  province: string;
  postalCode: string;
}

export default function PostalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PostalEntry[]>([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://codice-fiscale-backend.onrender.com/api/postal-code?query=${query}`
      );
      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert("Error searching");
    }
  };

  return (
    <div>
      <h2>Postal Code Search</h2>
      <input
        placeholder="Search city or postal code"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((entry, idx) => (
          <li key={idx}>
            {entry.city} ({entry.province}) - {entry.postalCode}
          </li>
        ))}
      </ul>
    </div>
  );
}
