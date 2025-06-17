import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllCity from "./AllCity";
import type { PostalEntry } from "./PostalCodeSearch";
import PostalCodeSearch from "./PostalCodeSearch";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const itemsPerPage = 10;

export default function PostalSearch() {
  const [results, setResults] = useState<PostalEntry[]>([]);
  const [, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

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
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Postal Code Search
          </h2>
          <PostalCodeSearch
            onResultsChange={setResults}
            onLoadingChange={setIsLoading}
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
