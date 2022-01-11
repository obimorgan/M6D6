/** @format */
import express from "express";
import BlogModel from "./schema.js";

const blogsRouter = express.Router();

blogsRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const blogs = await BlogModel.find();
      res.status(200).send(blogs);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newBlog = await BlogModel(req.body).save();
      res.status(201).send(newBlog);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

blogsRouter
  .route("/:blogId")
  .get(async (req, res, next) => {
    try {
      const blogId = req.params.blogId;
      const blog = await BlogModel.findById(blogId);
      res.status(200).send(blog);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const blogId = req.params.blogId;
      const editBlog = await BlogModel.findByIdAndUpdate(blogId, req.body, {
        new: true,
      });
      res.status(201).send(editBlog);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const blogId = req.params.blogId;
      const deleteBlog = await BlogModel.findByIdAndDelete(blogId);
      res.status(204).send(deleteBlog);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
export default blogsRouter;
