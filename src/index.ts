import express, { Express } from "express";
import { config } from "dotenv";
import { sendHtmlFile } from "./utils/sendHtmlFile";
const app: Express = express();
config();
import { dbConfig } from "./dbConfig";
app.use(express.static("public"));
app.get("/:backHalf", sendHtmlFile("backHalf.html"));
app.get("/", sendHtmlFile("home.html"));

const port = process.env.PORT || 8000;

dbConfig().then(() => {
  app.listen(port, () => {
    console.log(`Server started on ${port}`);
  });
});
