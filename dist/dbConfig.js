"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const mongoose_1 = require("mongoose");
(0, mongoose_1.set)("strictQuery", true);
async function dbConfig() {
    try {
        await (0, mongoose_1.connect)(process.env.MONGO_URL, {
            dbName: process.env.DB_NAME,
        });
        console.log("db configured");
    }
    catch (e) {
        console.log("error in connecting db", e);
        process.exit();
    }
}
exports.dbConfig = dbConfig;
