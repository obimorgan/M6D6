/** @format */
import express from "express";
import BlogModel from "./schema.js";
import createHttpError from "http-errors";

const blogsRouter = express.Router();

blogsRouter
  .route("/blogId/comments")

  //GET /blogs/:id/comments => returns all the comments for the specified blog post
  .get(async (req, res, next) => {
    try {
      const blogs = await BlogModel.find();
      res.status(200).send(blogs);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

blogsRouter
  .route("/blogId")

  //POST /blogs/:id => adds a new comment for the specified blog post
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
  .route("/:blogId/comments/:commentsId")

  //  GET /blogs/:id/comments/:commentId=> returns a single comment for the specified blog
  .get(async (req, res, next) => {
    try {
      const blogId = req.params.blogId;
      const blog = await BlogModel.findById(blogId);
      if (blog) {
        res.status(201).send(blog);
      } else {
        next(
          createHttpError(404, "Blog with this id:", blogId, "is not found")
        );
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  })

  //PUT /blogs/:id/comment/:commentId => edit the comment belonging to the specified blog pos
  .put(async (req, res, next) => {
    try {
      const blogId = req.params.blogId;
      const editBlog = await BlogModel.findByIdAndUpdate(blogId, req.body, {
        new: true,
      });
      console.log(editBlog);
      if (editBlog) {
        res.status(201).send(editBlog);
      } else {
        next(
          createHttpError(404, "Blog with this id:", blogId, "is not found")
        );
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  })

  //DELETE /blogs/:id/comment/:commentId=> delete the comment belonging to the specified blog post
  .delete(async (req, res, next) => {
    console.log("hello");
    try {
      const blogId = req.params.blogId;
      const deleteBlog = await BlogModel.findByIdAndDelete(blogId);
      console.log(deleteBlog);
      if (deleteBlog) {
        res.status(204).send(deleteBlog);
      } else {
        // throw createHttpError(400, "SyntaxError");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default blogsRouter;
