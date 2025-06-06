import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../../src/assets/logo-codiceitalia-com_895x150.jpg";
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

interface CityData {
  city: string;
  province: string;
  postalCode: string;
  postalRange?: [string, string];
  oldCode?: string;
  mayor?: string;
  mayorImg?: string;
  municipalityUrl?: string;
  population?: string;
  prefix?: string;
  crest?: string;
}

const itemsPerPage = 10; // Define items per page for pagination

export default function CityDetail() {
  const { cityName } = useParams<{ cityName: string }>();
  // const navigate = useNavigate();
  const [city, setCity] = useState<CityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [streetResults, setStreetResults] = useState<PostalEntry[]>([]);
  const [streetLoading, setStreetLoading] = useState(false);
  const [currentStreetPage, setCurrentStreetPage] = useState(1); // State for street search pagination

  useEffect(() => {
    if (!cityName) {
      setError("No city name provided");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    const fetchCityData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:5000"
          }/api/city/${encodeURIComponent(cityName)}`
        );
        setCity(response.data);
      } catch (err) {
        console.error("Error fetching city data:", err);
        setError("City not found");
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [cityName]);

  // Pagination logic for street search results
  const currentStreetItems = useMemo(() => {
    const startIndex = (currentStreetPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return streetResults.slice(startIndex, endIndex);
  }, [streetResults, currentStreetPage]);

  const totalStreetPages = useMemo(() => {
    return Math.ceil(streetResults.length / itemsPerPage);
  }, [streetResults]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !city) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-lg text-red-600">{error || "City not found"}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-center border-b-[1px] border-[#ddd] bg-white">
        <img
          src={logo}
          className="w-[220px] sm:w-[320px] md:w-[365px] h-auto max-h-[60px] pb-2 object-contain"
          alt="Logo"
        />
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-green-700 mb-2">
          ZIP code {city.city}
        </h1>
        <hr className="border-green-300 mb-6" />
        <div className="flex flex-col items-center mb-6">
          {city.crest && (
            <img
              src={city.crest}
              alt="Crest"
              className="w-24 h-24 object-contain mb-4"
            />
          )}
          <PostalCodeSearch
            onResultsChange={(results) => {
              // Reset page on new search
              setStreetResults(results);
              setCurrentStreetPage(1);
            }}
            onLoadingChange={setStreetLoading}
            placeholder="street, square, ..."
            buttonText="Search Street"
            className="w-full max-w-md"
            isLoading={streetLoading}
          />
        </div>
        <div className="text-center text-gray-700 mb-4">
          {city.postalRange ? (
            <>
              The street postal codes are between{" "}
              <span className="font-semibold">{city.postalRange[0]}</span> and{" "}
              <span className="font-semibold">{city.postalRange[1]}</span>
              <br />
              <span className="text-gray-500 text-sm">
                Generic code{" "}
                <span className="font-semibold">{city.oldCode}</span> no longer
                in use
              </span>
            </>
          ) : (
            <>
              Postal code:{" "}
              <span className="font-semibold">{city.postalCode}</span>
            </>
          )}
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-300 p-4 mb-6">
          <span className="font-semibold text-blue-700">Tip :</span> Enter only{" "}
          <span className="font-semibold">part of the address</span>.<br />
          Ex. search{" "}
          <span className="text-blue-600 underline cursor-pointer">
            Mazzini
          </span>{" "}
          for "Via Giuseppe Mazzini".
        </div>

        {/* Display street search results in a table */}
        {streetResults.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
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
                  {currentStreetItems.map((entry, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{entry.address || "-"}</TableCell>
                      <TableCell>{entry.postalCode}</TableCell>
                      <TableCell>{entry.city || "-"}</TableCell>
                      <TableCell>{entry.region || "-"}</TableCell>
                      <TableCell>{entry.prefix || "-"}</TableCell>
                      <TableCell>{entry.belfiore || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination for street search results */}
            {totalStreetPages > 1 && (
              <div className="flex items-center justify-end space-x-2 py-4">
                <button
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                  onClick={() =>
                    setCurrentStreetPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentStreetPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentStreetPage} of {totalStreetPages}
                </span>
                <button
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                  onClick={() =>
                    setCurrentStreetPage((prev) =>
                      Math.min(prev + 1, totalStreetPages)
                    )
                  }
                  disabled={currentStreetPage === totalStreetPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-4 border mb-2">
          {city.mayorImg && (
            <img
              src={city.mayorImg}
              alt="Mayor"
              className="w-14 h-14 rounded-full object-cover border"
            />
          )}
          <div className="flex-1">
            <div className="font-semibold">{city.mayor}</div>
            <div className="text-xs text-gray-500">Mayor</div>
          </div>
          <div className="flex flex-col gap-1 text-xs">
            {city.municipalityUrl && (
              <a
                href={city.municipalityUrl}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Municipality of {city.city}
              </a>
            )}
            {city.population && (
              <div>
                Population{" "}
                <span className="font-semibold">{city.population}</span>{" "}
                inhabitants.
              </div>
            )}
            {city.prefix && (
              <div>
                Prefix <span className="font-semibold">{city.prefix}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
