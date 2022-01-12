/** @format */
import express from "express";
import BlogModel from "./schema.js";
import createHttpError from "http-errors";

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
        // throw createHttpError(400, "SyntaxError");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

blogsRouter
  .route("/:blogId/comments")

  //GET /blogs/:id/comments => returns all the comments for the specified blog post
  .get(async (req, res, next) => {
    try {
      const blogs = await BlogModel.findById(req.params.blogId);
      if (blogs) {
        res.status(200).send(blogs.comments);
      } else {
        next(
          createHttpError(404, `Blog with id ${req.params.blogId} not found!`)
        );
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

blogsRouter
  .route("/:blogId")

  //POST /blogs/:id => adds a new comment for the specified blog post
  .post(async (req, res, next) => {
    try {
      const blogId = req.params.blogId;
      const targetBlog = await BlogModel.findByIdAndUpdate(
        blogId,
        { $push: { comments: req.body } },
        { new: true }
      );
      res.send(targetBlog);
    } catch (error) {
      next(error);
    }
    // }
    // try {
    //   const blog = await BlogModel.findById(req.body.toObject());
    //   if (blog) {
    //     const addComment = await BlogModel.findByIdAndUpdate(
    //       req.params.blogId,
    //       { $push: { comments: commentToAdd } },
    //       { new: true }
    //     );
    //     if (addComment) {
    //       res.send(addComment);
    //     }
    //   } else {
    //     next(
    //       createHttpError(404, `Blog with id ${req.params.blogId} not found!`)
    //     );
    //   }
    // } catch (error) {
    //   console.log(error);
    //   next(error);
    // }
  });

blogsRouter
  .route("/:blogId/comments/:commentsId")

  //  GET /blogs/:id/comments/:commentId=> returns a single comment for the specified blog
  .get(async (req, res, next) => {
    try {
      const blogId = req.params.blogId;
      const commentsId = req.params.commentsId;

      const blog = await BlogModel.findById(blogId);

      if (blog) {
        const targetComments = blog.comments.find(
          (comment) => comment._id.toString() === commentsId
        );
        res.status(201).send(targetComments);
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
      const commentsId = req.params.commentsId;
      const blogId = req.params.blogId;
      const blog = await BlogModel.findById(blogId);
      if (blog) {
        const targetComment = blog.comments.findIndex(
          ({ _id }) => _id.toString() === commentsId
        );
        if (targetComment !== -1) {
          blog.comments[targetComment] = {
            ...blog.comments[targetComment].toObject(),
            ...req.body,
          };
        }
      } else {
        next(
          createHttpError(
            404,
            `Comments with id ${req.params.blogId} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  })

  //DELETE /blogs/:id/comment/:commentId=> delete the comment belonging to the specified blog post
  .delete(async (req, res, next) => {
    try {
      const deleteComment = await BlogModel.findByIdAndUpdate(
        req.params.blogId,
        { pull: { comments: { _id: req.params.commentsId } } },
        { new: true }
      );
      if (deleteComment) {
        res.status(204).send(deleteComment);
      } else {
        next(
          createHttpError(
            404,
            `Blog with this id: ${req.params.blogId} is not found`
          )
        );
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default blogsRouter;
