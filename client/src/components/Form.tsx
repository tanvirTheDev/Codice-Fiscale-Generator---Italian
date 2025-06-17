import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useState } from "react";

// Common Italian cities for autocomplete
const COMMON_CITIES = [
  "ROMA",
  "MILANO",
  "NAPOLI",
  "TORINO",
  "PALERMO",
  "GENOVA",
  "BOLOGNA",
  "FIRENZE",
  "BARI",
  "CATANIA",
];

export default function TaxCodeCalculator() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    gender: "M",
    place: "",
    provincia: "",
    day: "01",
    month: "01",
    year: "1980",
  });

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setError("");

    // Handle place suggestions
    if (name === "place") {
      const normalizedValue = value.toUpperCase();
      if (normalizedValue.length > 0) {
        const filtered = COMMON_CITIES.filter((city) =>
          city.startsWith(normalizedValue)
        );
        setSuggestions(filtered);
      } else {
        setSuggestions([]);
      }
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setData({ ...data, [name]: value });
    setError("");
  };

  const handleSuggestionClick = (city: string) => {
    setData((prev) => ({ ...prev, place: city }));
    setSuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate required fields
    if (
      !data.firstName.trim() ||
      !data.lastName.trim() ||
      !data.place.trim() ||
      !data.provincia.trim()
    ) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    // Validate provincia format
    if (!/^[A-Za-z]{2}$/.test(data.provincia)) {
      setError("Province must be a 2-letter code");
      setIsLoading(false);
      return;
    }

    const dob = `${data.year}-${data.month}-${data.day}`;
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      dob,
      place: data.place,
      provincia: data.provincia.toUpperCase(),
    };
    // https://codice-fiscale-backend.onrender.com
    try {
      const res = await axios.post(
        "https://codice-fiscale-backend.onrender.com/api/generate",
        payload
      );
      setCode(res.data.code);
    } catch (error: any) {
      setError(
        error.response?.data?.error || "Failed to generate codice fiscale"
      );
      setCode("");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to get days in a month
  function getDaysInMonth(month: string, year: string) {
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);
    // Month is 1-based (1=Jan, 2=Feb, ...)
    return new Array(new Date(y, m, 0).getDate())
      .fill(0)
      .map((_, i) => String(i + 1).padStart(2, "0"));
  }

  const days = getDaysInMonth(data.month, data.year);
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const years = Array.from({ length: 125 }, (_, i) => String(2024 - i));

  return (
    <div className="h-full md:h-auto md:min-h-[600px] lg:min-h-screen bg-white">
      <div className="flex justify-start py-4 sm:py-6 md:py-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl px-2 sm:px-4 md:px-0"
        >
          <div className="flex justify-center">
            <div className="w-full">
              <div className="overflow-hidden border-4 border-white">
                {/* Header */}
                <div className="text-black px-2 sm:px-8 mt-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <div className="text-black flex-1 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-4xl font-bold tracking-wide">
                      Calcolo Codice Fiscale
                    </h1>
                    <p className="text-black text-sm sm:text-lg mt-1 font-medium">
                      Calcola il codice fiscale online
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="p-2 sm:p-6 md:p-8 bg-white space-y-4 sm:space-y-6">
                  {/* Last Name */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <Label
                      htmlFor="lastName"
                      className="text-[#000000] font-bold text-base sm:text-lg sm:min-w-[140px] sm:text-right"
                    >
                      COGNOME
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={data.lastName}
                      onChange={handleInputChange}
                      className="flex-1 h-10 sm:h-12 border-2 border-gray-300 rounded-lg focus:border-lime-500 text-base sm:text-lg"
                      required
                    />
                  </div>

                  {/* First Name and Gender */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <Label
                      htmlFor="firstName"
                      className="text-[#000000] font-bold text-base sm:text-lg sm:min-w-[140px] sm:text-right"
                    >
                      NOME
                    </Label>
                    <div className="flex-1 flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <Input
                        id="firstName"
                        name="firstName"
                        value={data.firstName}
                        onChange={handleInputChange}
                        className="flex-1 h-10 sm:h-12 border-2 border-gray-300 rounded-lg focus:border-lime-500 text-base sm:text-lg"
                        required
                      />
                      <div className="flex items-center gap-2 sm:gap-4">
                        <Label
                          htmlFor="gender"
                          className="text-[#000000] font-bold text-base sm:text-lg whitespace-nowrap"
                        >
                          SESSO
                        </Label>
                        <Select
                          value={data.gender}
                          onValueChange={(value) =>
                            handleSelectChange("gender", value)
                          }
                        >
                          <SelectTrigger className="w-16 sm:w-20 h-10 sm:h-12 border-2 border-gray-300 rounded-lg focus:border-[#000000] text-base sm:text-lg font-semibold">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="M">M</SelectItem>
                            <SelectItem value="F">F</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Place of Birth */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <Label
                      htmlFor="place"
                      className="text-[#000000] font-bold text-base sm:text-lg sm:min-w-[140px] sm:text-right leading-tight"
                    >
                      LUOGO DI
                      <br />
                      NASCITA
                    </Label>
                    <div className="flex-1 relative">
                      <Input
                        id="place"
                        name="place"
                        value={data.place}
                        onChange={handleInputChange}
                        className="w-full h-10 sm:h-12 border-2 border-gray-300 rounded-lg focus:border-lime-500 text-base sm:text-lg"
                        required
                        autoComplete="off"
                      />
                      {suggestions.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                          {suggestions.map((city, index) => (
                            <div
                              key={index}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-base sm:text-lg"
                              onClick={() => handleSuggestionClick(city)}
                            >
                              {city}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Province and Date of Birth */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <Label
                      htmlFor="provincia"
                      className="text-[#000000] font-bold text-base sm:text-lg sm:min-w-[140px] sm:text-right leading-tight"
                    >
                      PROVINCIA
                      <br />
                      (SIGLA)
                    </Label>
                    <div className="flex-1 flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <Input
                        id="provincia"
                        name="provincia"
                        maxLength={2}
                        value={data.provincia}
                        onChange={handleInputChange}
                        className="w-20 sm:w-24 h-10 sm:h-12 border-2 border-gray-300 rounded-lg focus:border-lime-500 text-base sm:text-lg text-center font-semibold"
                        required
                        pattern="[A-Za-z]{2}"
                        title="Two letter province code"
                      />
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                        <Label className="text-[#000000] font-bold text-base sm:text-lg whitespace-nowrap leading-tight">
                          DATA DI
                          <br />
                          NASCITA
                        </Label>
                        <div className="flex gap-2 sm:gap-3">
                          <Select
                            defaultValue={data.day}
                            onValueChange={(value) =>
                              handleSelectChange("day", value)
                            }
                          >
                            <SelectTrigger className="w-16 sm:w-20 h-10 sm:h-12 border-2 border-gray-300 rounded-lg focus:border-lime-500 text-base sm:text-lg font-semibold">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="max-h-52 overflow-y-auto">
                              {days.map((d) => (
                                <SelectItem key={d} value={d}>
                                  {d}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select
                            defaultValue={data.month}
                            onValueChange={(value) =>
                              handleSelectChange("month", value)
                            }
                          >
                            <SelectTrigger className="w-16 sm:w-20 h-10 sm:h-12 border-2 border-gray-300 rounded-lg focus:border-lime-500 text-base sm:text-lg font-semibold">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="max-h-52 overflow-y-auto">
                              {months.map((m) => (
                                <SelectItem key={m} value={m}>
                                  {m}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select
                            defaultValue={data.year}
                            onValueChange={(value) =>
                              handleSelectChange("year", value)
                            }
                          >
                            <SelectTrigger className="w-20 sm:w-24 h-10 sm:h-12 border-2 border-gray-300 rounded-lg focus:border-lime-500 text-base sm:text-lg font-semibold">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="max-h-52 overflow-y-auto">
                              {years.map((y) => (
                                <SelectItem key={y} value={y}>
                                  {y}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-4 sm:mt-6 px-2 sm:px-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#DDC092] hover:bg-[#666666] text-white font-bold py-4 sm:py-6 text-lg sm:text-xl rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl transform transition-all duration-200 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Generando..." : "Calcola il Codice Fiscale"}
                </Button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 sm:mt-6 bg-red-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center shadow-md sm:shadow-lg border-2 border-red-300 mx-2 sm:mx-4">
                  <p className="text-lg sm:text-xl font-semibold text-red-700">
                    {error}
                  </p>
                </div>
              )}

              {/* Result */}
              {code && (
                <div className="mt-4 sm:mt-6 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 text-center shadow-md sm:shadow-lg border-2 border-green-300 mx-2 sm:mx-4">
                  <p className="text-lg sm:text-xl font-semibold text-green-700">
                    Codice Fiscale Generato:{" "}
                    <span className="font-bold">{code}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
