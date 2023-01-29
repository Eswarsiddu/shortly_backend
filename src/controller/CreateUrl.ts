import { urlModel } from "./../Schema/UrlSchema";
import { Request, Response } from "express";

export async function createUrl(req: Request, res: Response) {
  console.log(req.body);
  try {
    await urlModel.create({ ...req.body, createDate: new Date().getTime() });
    // console.log("added url", { time: new Date().getTime() });
    res.send({ msg: "successful add" });
  } catch ({ code }) {
    // console.log("error", Object.keys(e));
    // console.error(e.errors);
    // const code = e.code;
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
}
