import { urlModel } from "./../Schema/UrlSchema";
import { Request, Response } from "express";
import { measureTime } from "../tester/MeasureTime";

export async function showUrls(req: Request, res: Response) {
  const { pageNo: _pageNo, size: _size, uid, search } = req.query;
  // console.log({ _pageNo, _size });
  const pageNo = Number(_pageNo);
  const size = Number(_size);
  const skip = (pageNo - 1) * size;
  const regex = new RegExp(search as string);
  const model = search
    ? {
        uid,
        $or: [
          { backHalf: { $regex: regex } },
          { destinationUrl: { $regex: regex } },
          { title: { $regex: regex } },
        ],
      }
    : { uid };
  // const data = await measureTime(
  // async () =>
  const totalDocuments = await urlModel.countDocuments({ uid });
  const data = await urlModel
    .find(model, {
      id: false,
      __v: false,
      uid: false,
    })
    .lean()
    .limit(size)
    .skip(skip)
    .sort({ createDate: -1 });
  //   "find lean"
  // );
  const hasMore = skip + data.length < totalDocuments;
  console.log({ pageNo, skip, hasMore, len: data.length, totalDocuments });
  res.json({ data, hasMore });
}
