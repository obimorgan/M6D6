/** @format */
import express from "express";
import BlogModel from "./schema.js";

const blogsRouter = express.Router();

blogsRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const blogs = await BlogModel(req.body);
      res.status(200).send(blogs);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newBlog = new BlogModel(req.body);
      const { _id } = await newBlog.save();
      res.status(201).send(newBlog);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default blogsRouter;
