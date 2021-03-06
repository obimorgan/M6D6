/** @format */
import express from "express";
import BlogModel from "./schema.js";
import createHttpError from "http-errors";
import q2m from "query-to-mongo";

const blogsRouter = express.Router();

blogsRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const queryToMongo = q2m(req.query);
      const { blogs, total } = await BlogModel.blogsAuthors(queryToMongo);
      res.send({
        // links: queryToMongo.links("/blogs", total),
        // pageTotal: Math.ceil(total / queryToMongo.options.limit),
        total,
        blogs,
      });
      // res.status(200).send(blogs);
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
      const blog = await BlogModel.findById(blogId).populate({
        path: "author",
        select: "first_name last_name",
      });
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
  .delete(async (req, res, next) => {
    console.log("hello");
    try {
      const blogId = req.params.blogId;
      const deleteBlog = await BlogModel.findByIdAndDelete(blogId, {
        new: true,
      });
      console.log(deleteBlog);
      if (deleteBlog) {
        res.status(204).send(deleteBlog);
      } else {
        next(createHttpError(400, "SyntaxError"));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default blogsRouter;
