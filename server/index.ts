import cors from "cors";
import express, { Request, Response } from "express";
import postalData from "./data/postalCodes.json";
import { generateFiscalCode } from "./utils/generateFiscalCode";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/generate", (req: Request, res: Response) => {
  const { firstName, lastName, gender, dob, place, provincia } = req.body;

  const result = generateFiscalCode({
    firstName,
    lastName,
    gender,
    dob,
    place,
    provincia,
  });

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  res.json({ code: result.code });
});

app.get("/api/postal-code", (req: Request, res: Response) => {
  const query = (req.query.query as string)?.toLowerCase();
  if (!query) return res.status(400).json({ error: "Query is required" });

  const result = postalData.filter(
    (entry) =>
      entry.city.toLowerCase().includes(query) ||
      entry.postalCode.includes(query)
  );

  res.json(result);
});

app.get("/api/city/:cityName", (req: Request, res: Response) => {
  const cityName = req.params.cityName.toLowerCase();
  const city = postalData.find(
    (entry) => entry.city.toLowerCase() === cityName
  );
  if (!city) {
    return res.status(404).json({ error: "City not found" });
  }
  res.json(city);
});

app.get("/", (req: Request, res: Response) => res.send("ok"));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
