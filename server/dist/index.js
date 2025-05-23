"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const generateFiscalCode_1 = require("./utils/generateFiscalCode");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/api/generate", (req, res) => {
    const { firstName, lastName, gender, dob, place } = req.body;
    const code = (0, generateFiscalCode_1.generateFiscalCode)({ firstName, lastName, gender, dob, place });
    res.json({ code });
});
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
