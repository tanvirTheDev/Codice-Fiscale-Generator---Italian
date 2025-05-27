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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dob = `${data.year}-${data.month}-${data.day}`;
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      dob,
      place: data.place,
    };
    try {
      const res = await axios.post(
        "https://codice-fiscale-backend.onrender.com/api/generate",
        payload
      );
      setCode(res.data.code);
    } catch (error) {
      console.error("Failed to generate codice fiscale", error);
    }
  };

  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const years = Array.from({ length: 125 }, (_, i) => String(2024 - i));

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="min-h-screen"
        style={{
          background:
            "linear-gradient(135deg, #a0f0ed 0%, #7dd3fc 25%, #67e8f9 50%, #22d3ee 75%, #06b6d4 100%)",
        }}
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-3xl">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white">
              {/* Header */}
              <div className="bg-gradient-to-r from-lime-500 to-green-500 px-8 py-6 flex items-center gap-6">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-2 shadow-lg">
                  <div className="w-full h-full relative flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-b from-green-600 to-green-700 rounded-full flex items-center justify-center border-2 border-red-500">
                      <div className="text-white text-lg font-bold">⭐</div>
                    </div>
                  </div>
                </div>
                <div className="text-white flex-1">
                  <h1 className="text-4xl font-bold tracking-wide">
                    Calcolo Codice Fiscale
                  </h1>
                  <p className="text-green-100 text-lg mt-1 font-medium">
                    Calcola il codice fiscale online
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="p-8 bg-white space-y-6">
                {/* Last Name */}
                <div className="flex items-center gap-6">
                  <Label
                    htmlFor="lastName"
                    className="text-lime-700 font-bold text-lg min-w-[140px] text-right"
                  >
                    COGNOME
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={data.lastName}
                    onChange={handleInputChange}
                    className="flex-1 h-12 border-2 border-gray-300 rounded-lg focus:border-lime-500 text-lg"
                  />
                </div>

                {/* First Name and Gender */}
                <div className="flex items-center gap-6">
                  <Label
                    htmlFor="firstName"
                    className="text-lime-700 font-bold text-lg min-w-[140px] text-right"
                  >
                    NOME
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={data.firstName}
                    onChange={handleInputChange}
                    className="flex-1 h-12 border-2 border-gray-300 rounded-lg focus:border-lime-500 text-lg"
                  />
                  <Label
                    htmlFor="gender"
                    className="text-lime-700 font-bold text-lg whitespace-nowrap ml-8"
                  >
                    SESSO
                  </Label>
                  <Select
                    defaultValue={data.gender}
                    onValueChange={(value) =>
                      handleSelectChange("gender", value)
                    }
                  >
                    <SelectTrigger className="w-20 h-12 border-2 border-gray-300 rounded-lg focus:border-lime-500 text-lg font-semibold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="F">F</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Place of Birth */}
                <div className="flex items-center gap-6">
                  <Label
                    htmlFor="place"
                    className="text-lime-700 font-bold text-lg min-w-[140px] text-right leading-tight"
                  >
                    LUOGO DI
                    <br />
                    NASCITA
                  </Label>
                  <Input
                    id="place"
                    name="place"
                    value={data.place}
                    onChange={handleInputChange}
                    className="flex-1 h-12 border-2 border-gray-300 rounded-lg focus:border-lime-500 text-lg"
                  />
                </div>

                {/* Province and Date of Birth */}
                <div className="flex items-center gap-6">
                  <Label
                    htmlFor="provincia"
                    className="text-lime-700 font-bold text-lg min-w-[140px] text-right leading-tight"
                  >
                    PROVINCIA
                    <br />
                    (SIGLA)
                  </Label>
                  <Input
                    id="provincia"
                    name="provincia"
                    maxLength={2}
                    value={data.provincia}
                    onChange={handleInputChange}
                    className="w-24 h-12 border-2 border-gray-300 rounded-lg focus:border-lime-500 text-lg text-center font-semibold"
                  />
                  <Label className="text-lime-700 font-bold text-lg whitespace-nowrap ml-12 leading-tight">
                    DATA DI
                    <br />
                    NASCITA
                  </Label>
                  <div className="flex gap-3">
                    <Select
                      defaultValue={data.day}
                      onValueChange={(value) =>
                        handleSelectChange("day", value)
                      }
                    >
                      <SelectTrigger className="w-20 h-12 border-2 border-gray-300 rounded-lg focus:border-lime-500 text-lg font-semibold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
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
                      <SelectTrigger className="w-20 h-12 border-2 border-gray-300 rounded-lg focus:border-lime-500 text-lg font-semibold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
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
                      <SelectTrigger className="w-24 h-12 border-2 border-gray-300 rounded-lg focus:border-lime-500 text-lg font-semibold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
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

            {/* Submit Button */}
            <div className="mt-6">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-bold py-6 text-xl rounded-2xl shadow-xl transform transition-all duration-200 hover:scale-105 hover:shadow-2xl"
              >
                Calcola il Codice Fiscale
              </Button>
            </div>

            {/* Result */}
            {code && (
              <div className="mt-6 bg-white rounded-xl p-4 text-center shadow-lg border-2 border-green-300">
                <p className="text-xl font-semibold text-green-700">
                  Codice Fiscale Generato:{" "}
                  <span className="font-bold">{code}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
