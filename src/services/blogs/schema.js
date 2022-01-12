/** @format */

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentsSchema = new Schema(
  {
    name: { type: String, required: false },
    comments: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const blogSchema = new Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String, required: true },
    readTime: {
      value: { type: Number, required: true },
      unit: { type: String, default: "min" },
    },
    author: {
      name: { type: String, required: true },
      avatar: { type: String, required: true },
    },
    content: { type: String, required: true },
    comments: [commentsSchema],
  },
  {
    timestamps: true,
  }
);

export default model("Blog", blogSchema);
