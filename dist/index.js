"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const sendHtmlFile_1 = require("./utils/sendHtmlFile");
const app = (0, express_1.default)();
(0, dotenv_1.config)();
const dbConfig_1 = require("./dbConfig");
app.use(express_1.default.static("public"));
app.get("/:backHalf", (0, sendHtmlFile_1.sendHtmlFile)("backHalf.html"));
app.get("/", (0, sendHtmlFile_1.sendHtmlFile)("home.html"));
const port = process.env.PORT || 8000;
(0, dbConfig_1.dbConfig)().then(() => {
    app.listen(port, () => {
        console.log(`Server started on ${port}`);
    });
});
