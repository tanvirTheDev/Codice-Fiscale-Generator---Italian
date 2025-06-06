import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../src/assets/logo-codiceitalia-com_895x150.jpg";
import SearchBar from "./SearchBar";

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

export default function CityDetail() {
  const { cityName } = useParams<{ cityName: string }>();
  const navigate = useNavigate();
  const [city, setCity] = useState<CityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [streetQuery, setStreetQuery] = useState("");

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
          `http://localhost:5000/api/city/${encodeURIComponent(cityName)}`
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

  const handleStreetSearch = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    // TODO: Implement street search functionality
    console.log("Searching for street:", streetQuery);
  };

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
          <SearchBar
            query={streetQuery}
            setQuery={setStreetQuery}
            onSearch={handleStreetSearch}
            placeholder="street, square, ..."
            buttonText="Search Street"
            className="w-full max-w-md"
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
