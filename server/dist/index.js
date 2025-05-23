"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const postalCodes_json_1 = __importDefault(require("./data/postalCodes.json"));
const generateFiscalCode_1 = require("./utils/generateFiscalCode");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/api/generate", (req, res) => {
    const { firstName, lastName, gender, dob, place } = req.body;
    const code = (0, generateFiscalCode_1.generateFiscalCode)({ firstName, lastName, gender, dob, place });
    res.json({ code });
});
app.get("/api/postal-code", (req, res) => {
    var _a;
    const query = (_a = req.query.query) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (!query)
        return res.status(400).json({ error: "Query is required" });
    const result = postalCodes_json_1.default.filter((entry) => entry.city.toLowerCase().includes(query) ||
        entry.postalCode.includes(query));
    res.json(result);
});
app.get("/", (req, res) => res.send("ok"));
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
