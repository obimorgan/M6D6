/** @format */

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const blogSchema = new Schema(
  {
    category: { types: String, required: true },
    title: { types: String, required: true },
    cover: { types: String, required: true },
    readTime: {
      value: { type: Number, required: true },
      unit: { type: String, default: "min" },
    },
    author: {
      name: { types: String, required: true },
      avatar: { types: String, required: true },
    },
    content: { type: String },
  },
  {
    timestamps: true,
  }
);

export default model("Blog", blogSchema);
