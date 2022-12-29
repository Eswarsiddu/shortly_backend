"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendHtmlFile = void 0;
const path_1 = require("path");
function sendHtmlFile(...paths) {
    return (req, res) => {
        res.sendFile((0, path_1.join)(__dirname, "..", "..", "public", ...paths));
    };
}
exports.sendHtmlFile = sendHtmlFile;
