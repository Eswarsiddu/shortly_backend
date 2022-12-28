import { Request, Response } from "express";
import { join } from "path";
function sendHtmlFile(...paths: string[]) {
  return (req: Request, res: Response) => {
    res.sendFile(join(__dirname, "..", "public", ...paths));
  };
}

export { sendHtmlFile };
