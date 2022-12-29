import { Request, Response } from "express";

function backHalfController(req: Request, res: Response) {
  const { backHalf } = req.params;
  res.send(backHalf);
}

export { backHalfController };
