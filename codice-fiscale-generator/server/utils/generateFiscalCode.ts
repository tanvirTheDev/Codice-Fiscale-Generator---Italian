interface Input {
  firstName: string;
  lastName: string;
  gender: "M" | "F";
  dob: string; // YYYY-MM-DD
  place: string;
}

export function generateFiscalCode({
  firstName,
  lastName,
  gender,
  dob,
  place,
}: Input): string {
  const vowels = "AEIOU";
  const getCode = (name: string, isFirst = false) => {
    const letters = name
      .replace(/[^A-Z]/gi, "")
      .toUpperCase()
      .split("");
    const consonants = letters.filter((c) => !vowels.includes(c));
    const vowelsOnly = letters.filter((c) => vowels.includes(c));
    let code =
      isFirst && consonants.length > 3
        ? consonants[0] + consonants[2] + consonants[3]
        : consonants.join("");
    code += vowelsOnly.join("");
    return (code + "XXX").substring(0, 3);
  };

  const date = new Date(dob);
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
    gender === "F"
      ? (date.getDate() + 40).toString().padStart(2, "0")
      : date.getDate().toString().padStart(2, "0");

  return `${getCode(lastName)}${getCode(
    firstName,
    true
  )}${year}${month}${day}${place.slice(0, 4).toUpperCase()}`;
}
