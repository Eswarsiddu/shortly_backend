const urlModel = require("./UrlSchema");
const path = require("path");
const express = require("express");
require("dotenv").config();
const app = express();
const { dbConfig } = require("./dbConfig");
const cors = require("cors");
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://192.168.29.68:5173",
      "http://192.168.29.98:5173",
      "https://eswarsiddu.github.io",
      "https://shortly-7b21f.web.app",
    ],
    methods: ["POST", "GET"],
  })
);
app.use(express.static("public"));
app.use(express.json());
app.get("/urls", async (req, res) => {
  const { pageNo: _pageNo, size: _size, uid, search } = req.query;
  const pageNo = Number(_pageNo);
  const size = Number(_size);
  const skip = (pageNo - 1) * size;
  const regex = new RegExp(search);
  const data = await urlModel
    .find(
      search
        ? {
            uid,
            $or: [
              { backHalf: { $regex: regex } },
              { destinationUrl: { $regex: regex } },
              { title: { $regex: regex } },
            ],
          }
        : { uid },
      {
        id: false,
        __v: false,
        uid: false,
      }
    )
    .lean()
    .limit(size)
    .skip(skip)
    .sort({ createDate: -1 });
  res.json({
    data,
    hasMore: skip + data.length < (await urlModel.countDocuments({ uid })),
  });
});
app.post("/create", async (req, res) => {
  try {
    await urlModel.create({ ...req.body, createDate: new Date().getTime() });
    res.send({ msg: "successful add" });
  } catch ({ code }) {
    if (code == 11000) {
      res.status(400).send({
        error: "backHalfError",
      });
    } else {
      res.status(500).send({
        error: "server error",
      });
    }
  }
});
app.get("/:backHalf", async (req, res) => {
  const { backHalf } = req.params;
  const { r } = req.query;
  const data = await urlModel.findOne({ backHalf });
  if (data) res.redirect(data.destinationUrl);
  else res.sendFile(path.join(__dirname, "public", "notFound.html"));
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
