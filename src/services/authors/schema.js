/** @format */

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const authorsSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    country: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("author", authorsSchema);
