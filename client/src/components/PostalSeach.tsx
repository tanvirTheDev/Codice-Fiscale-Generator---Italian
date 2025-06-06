import axios from "axios";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../src/assets/logo-codiceitalia-com_895x150.jpg";
import AllCity from "./AllCity";
import SearchBar from "./SearchBar";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface PostalEntry {
  city: string;
  province: string;
  postalCode: string;
  address?: string;
  region?: string;
  prefix?: string;
  belfiore?: string;
}

const itemsPerPage = 10;

export default function PostalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PostalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!query.trim()) return;

    setIsLoading(true);
    setCurrentPage(1); // Reset to first page on new search
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/api/postal-code?query=${query}`
      );
      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert("Error searching");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCityClick = (e: React.MouseEvent, cityName: string) => {
    e.preventDefault();
    navigate(`/city/${encodeURIComponent(cityName)}`);
  };

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return results.slice(startIndex, endIndex);
  }, [results, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(results.length / itemsPerPage);
  }, [results]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <img
            src={logo}
            className="w-[220px] sm:w-[320px] md:w-[365px] h-auto max-h-[60px] object-contain"
            alt="Logo"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Postal Code Search
          </h2>
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Address</TableHead>
                    <TableHead>ZIP CODE</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Pref</TableHead>
                    <TableHead>Belfiore</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((entry, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{entry.address || "-"}</TableCell>
                      <TableCell>{entry.postalCode}</TableCell>
                      <TableCell>
                        <button
                          onClick={(e) => handleCityClick(e, entry.city)}
                          className="font-medium text-blue-700 hover:underline text-left"
                        >
                          {entry.city}
                        </button>
                      </TableCell>
                      <TableCell>{entry.region || "-"}</TableCell>
                      <TableCell>{entry.prefix || "-"}</TableCell>
                      <TableCell>{entry.belfiore || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-end space-x-2 py-4">
                <button
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-8">
          <AllCity />
        </div>
      </div>
    </div>
  );
}
