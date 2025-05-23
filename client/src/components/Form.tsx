import axios from "axios";
import { useState } from "react";

export default function Form() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    gender: "M",
    dob: "",
    place: "",
  });
  const [code, setCode] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post(
      "https://codice-fiscale-backend.onrender.com/api/generate",
      data
    );
    setCode(res.data.code);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
        required
      />
      <input type="date" name="dob" onChange={handleChange} required />
      <select name="gender" onChange={handleChange}>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>
      <input
        type="text"
        name="place"
        placeholder="Place of Birth"
        onChange={handleChange}
        required
      />
      <button type="submit">Generate</button>
      {code && (
        <p>
          Codice Fiscale: <strong>{code}</strong>
        </p>
      )}
    </form>
  );
}
