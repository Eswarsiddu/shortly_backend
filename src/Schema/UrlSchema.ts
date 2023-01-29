import { Schema, model } from "mongoose";

const urlSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  createDate: {
    type: Number,
    required: true,
  },
  destinationUrl: {
    type: String,
    required: true,
  },
  backHalf: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  hits: {
    type: Number,
    required: true,
    default: 0,
  },
  scans: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const urlModel = model("urls", urlSchema);
