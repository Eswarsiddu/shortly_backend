"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UrlSchema_1 = require("./Schema/UrlSchema");
const path_1 = __importStar(require("path"));
const express_1 = __importStar(require("express"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: (0, path_1.join)(__dirname, "..", ".env") });
const app = (0, express_1.default)();
const dbConfig_1 = require("./dbConfig");
const cors_1 = __importDefault(require("cors"));
const CreateUrl_1 = require("./controller/CreateUrl");
const ShowUrls_1 = require("./controller/ShowUrls");
app.use((0, cors_1.default)({
    origin: [
        "http://127.0.0.1:5173",
        "http://192.168.29.68:5173",
        "http://192.168.29.98:5173",
        "https://eswarsiddu.github.io",
    ],
    methods: ["POST", "GET"],
}));
app.use(express_1.default.static("public"));
app.use((0, express_1.json)());
app.get("/urls", ShowUrls_1.showUrls);
app.post("/create", CreateUrl_1.createUrl);
app.get("/:backHalf", async (req, res) => {
    const { backHalf } = req.params;
    const { r } = req.query;
    const data = await UrlSchema_1.urlModel.findOne({ backHalf });
    if (data)
        res.redirect(data.destinationUrl);
    else
        res.sendFile(path_1.default.join(__dirname, "..", "public", "notFound.html"));
    if (data) {
        if (r && r == "qr") {
            data.scans++;
        }
        else {
            data.hits++;
        }
        data.save();
    }
});
const port = process.env.PORT || 8000;
(0, dbConfig_1.dbConfig)().then(() => {
    app.listen(port, () => {
        console.log(`Server started on ${port}`);
    });
});
