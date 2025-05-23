import cors from "cors";
import express from "express";
import { generateFiscalCode } from "../utils/generateFiscalCode";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/generate", (req, res) => {
  const { firstName, lastName, gender, dob, place } = req.body;
  const code = generateFiscalCode({ firstName, lastName, gender, dob, place });
  res.json({ code });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
