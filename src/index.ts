import { urlModel } from "./Schema/UrlSchema";
import path, { join } from "path";
import express, { json, Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config({ path: join(__dirname, "..", ".env") });
const app = express();
import { dbConfig } from "./dbConfig";
import cors from "cors";
import { createUrl } from "./controller/CreateUrl";
import { showUrls } from "./controller/ShowUrls";
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://192.168.29.68:5173",
      "http://192.168.29.98:5173",
      "https://eswarsiddu.github.io",
    ],
    methods: ["POST", "GET"],
  })
);
app.use(express.static("public"));
app.use(json());
app.get("/urls", showUrls);
app.post("/create", createUrl);
app.get("/:backHalf", async (req: Request, res: Response) => {
  const { backHalf } = req.params;
  const { r } = req.query;
  const data = await urlModel.findOne({ backHalf });
  if (data) res.redirect(data.destinationUrl);
  else res.sendFile(path.join(__dirname, "..", "public", "notFound.html"));
  if (data) {
    if (r && r == "qr") {
      data.scans++;
    } else {
      data.hits++;
    }
    data.save();
  }
});

const port = process.env.PORT || 8000;

dbConfig().then(() => {
  app.listen(port, () => {
    console.log(`Server started on ${port}`);
  });
});
