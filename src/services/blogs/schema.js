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
    category: {
      type: String,
      required: true,
      enum: ["Travel", "Health", "IT"],
    },
    title: { type: String, required: true },
    cover: { type: String, required: true },
    readTime: {
      value: { type: Number, required: true },
      unit: { type: String, default: "min" },
    },
    author: [
      {
        type: Schema.Types.ObjectId,
        ref: "Author",
      },
    ],
    content: { type: String, required: true },
    comments: [commentsSchema],
  },
  {
    timestamps: true,
  }
);

blogSchema.static("blogsAuthors", async function (query) {
  // Cant use arrow function!!
  const total = await this.countDocuments(query.criteria);
  const blogs = await this.find(query.criteria)
    .limit(query.options.limit || 6)
    .skip(query.options.skip || 0)
    .sort(query.options.sort)
    .populate({ path: "author", select: "first_name last_name" });

  return { total, blogs };
});

export default model("Blog", blogSchema);
