interface Input {
  firstName: string;
  lastName: string;
  gender: "M" | "F";
  dob: string; // YYYY-MM-DD
  place: string;
  provincia: string;
}

interface ValidationError {
  field: string;
  message: string;
}

// Common Italian city codes
const CITY_CODES: { [key: string]: string } = {
  ROMA: "H501",
  MILANO: "F205",
  NAPOLI: "F839",
  TORINO: "L219",
  PALERMO: "G273",
  GENOVA: "D969",
  BOLOGNA: "A944",
  FIRENZE: "D612",
  BARI: "A662",
  CATANIA: "C351",
  // Add more cities as needed
};

export function validateInput(input: Input): ValidationError | null {
  // Validate first name
  if (!input.firstName.trim()) {
    return { field: "firstName", message: "First name is required" };
  }
  if (!/^[A-Za-z\s]+$/.test(input.firstName)) {
    return {
      field: "firstName",
      message: "First name should only contain letters",
    };
  }

  // Validate last name
  if (!input.lastName.trim()) {
    return { field: "lastName", message: "Last name is required" };
  }
  if (!/^[A-Za-z\s]+$/.test(input.lastName)) {
    return {
      field: "lastName",
      message: "Last name should only contain letters",
    };
  }

  // Validate gender
  if (!["M", "F"].includes(input.gender)) {
    return { field: "gender", message: "Invalid gender" };
  }

  // Validate date of birth
  if (!input.dob) {
    return { field: "dob", message: "Date of birth is required" };
  }
  const dobDate = new Date(input.dob);
  if (isNaN(dobDate.getTime())) {
    return { field: "dob", message: "Invalid date of birth" };
  }
  const today = new Date();
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 125); // Maximum age of 125 years
  if (dobDate > today || dobDate < minDate) {
    return {
      field: "dob",
      message: "Date of birth must be between today and 125 years ago",
    };
  }

  // Validate place of birth
  if (!input.place.trim()) {
    return { field: "place", message: "Place of birth is required" };
  }
  if (!/^[A-Za-z\s]+$/.test(input.place)) {
    return {
      field: "place",
      message: "Place of birth should only contain letters",
    };
  }

  // Validate province
  if (!input.provincia.trim()) {
    return { field: "provincia", message: "Province is required" };
  }
  if (!/^[A-Z]{2}$/.test(input.provincia.toUpperCase())) {
    return { field: "provincia", message: "Province must be a 2-letter code" };
  }

  return null;
}

function getConsonantsAndVowels(name: string): {
  consonants: string[];
  vowels: string[];
} {
  const vowels = "AEIOU";
  const letters = name
    .replace(/[^A-Z]/gi, "")
    .toUpperCase()
    .split("");
  return {
    consonants: letters.filter((c) => !vowels.includes(c)),
    vowels: letters.filter((c) => vowels.includes(c)),
  };
}

function getControlCharacter(code: string): string {
  const evenValues: { [key: string]: number } = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
    K: 10,
    L: 11,
    M: 12,
    N: 13,
    O: 14,
    P: 15,
    Q: 16,
    R: 17,
    S: 18,
    T: 19,
    U: 20,
    V: 21,
    W: 22,
    X: 23,
    Y: 24,
    Z: 25,
  };

  const oddValues: { [key: string]: number } = {
    "0": 1,
    "1": 0,
    "2": 5,
    "3": 7,
    "4": 9,
    "5": 13,
    "6": 15,
    "7": 17,
    "8": 19,
    "9": 21,
    A: 1,
    B: 0,
    C: 5,
    D: 7,
    E: 9,
    F: 13,
    G: 15,
    H: 17,
    I: 19,
    J: 21,
    K: 2,
    L: 4,
    M: 18,
    N: 20,
    O: 11,
    P: 3,
    Q: 6,
    R: 8,
    S: 12,
    T: 14,
    U: 16,
    V: 10,
    W: 22,
    X: 25,
    Y: 24,
    Z: 23,
  };

  const controlValues = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let sum = 0;
  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    sum += i % 2 === 0 ? oddValues[char] : evenValues[char];
  }

  return controlValues[sum % 26];
}

function getPlaceCode(place: string, provincia: string): string {
  const normalizedPlace = place.toUpperCase().trim();

  // Check if we have the city code in our mapping
  if (CITY_CODES[normalizedPlace]) {
    return CITY_CODES[normalizedPlace];
  }

  // For foreign cities, use the first 4 characters of the city name
  // This is a simplified approach - in reality, foreign cities have specific codes
  return normalizedPlace.replace(/[^A-Z]/gi, "").slice(0, 4);
}

export function generateFiscalCode(input: Input): {
  code: string;
  error?: string;
} {
  // Validate input
  const validationError = validateInput(input);
  if (validationError) {
    return { code: "", error: validationError.message };
  }

  try {
    // Process surname
    const { consonants: surnameConsonants, vowels: surnameVowels } =
      getConsonantsAndVowels(input.lastName);
    let surnameCode = surnameConsonants.join("");
    surnameCode += surnameVowels.join("");
    surnameCode = (surnameCode + "XXX").substring(0, 3);

    // Process first name
    const { consonants: nameConsonants, vowels: nameVowels } =
      getConsonantsAndVowels(input.firstName);
    let nameCode = "";
    if (nameConsonants.length > 3) {
      nameCode = nameConsonants[0] + nameConsonants[2] + nameConsonants[3];
    } else {
      nameCode = nameConsonants.join("");
      nameCode += nameVowels.join("");
      nameCode = (nameCode + "XXX").substring(0, 3);
    }

    // Process date of birth
    const date = new Date(input.dob);
    const year = date.getFullYear().toString().slice(-2);
    const monthCodes = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "H",
      "L",
      "M",
      "P",
      "R",
      "S",
      "T",
    ];
    const month = monthCodes[date.getMonth()];
    const day =
      input.gender === "F"
        ? (date.getDate() + 40).toString().padStart(2, "0")
        : date.getDate().toString().padStart(2, "0");

    // Process place of birth using official codes
    const placeCode = getPlaceCode(input.place, input.provincia);

    // Generate the first 15 characters
    const partialCode = `${surnameCode}${nameCode}${year}${month}${day}${placeCode}`;

    // Add control character
    const controlChar = getControlCharacter(partialCode);
    const fiscalCode = partialCode + controlChar;

    return { code: fiscalCode };
  } catch (error) {
    return {
      code: "",
      error: "An error occurred while generating the fiscal code",
    };
  }
}
