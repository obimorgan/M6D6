/** @format */
import express from "express";
import AuthorModel from "./schema.js";
import createHttpError from "http-errors";

const authorsRouter = express.Router();

// create users
// link authors to their blogs

authorsRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const authors = await AuthorModel.find();
      res.status(200).send(authors);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })

  .post(async (req, res, next) => {
    try {
      const newauthor = await AuthorModel(req.body).save();
      res.status(201).send(newauthor);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

authorsRouter
  .route("/:authorId")
  .get(async (req, res, next) => {
    try {
      const authorId = req.params.authorId;
      const author = await AuthorModel.findById(authorId);
      if (author) {
        res.status(201).send(author);
      } else {
        next(
          createHttpError(404, "author with this id:", authorId, "is not found")
        );
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const authorId = req.params.authorId;
      const editauthor = await AuthorModel.findByIdAndUpdate(
        authorId,
        req.body,
        {
          new: true,
        }
      );
      console.log(editauthor);
      if (editauthor) {
        res.status(201).send(editauthor);
      } else {
        next(
          createHttpError(404, "author with this id:", authorId, "is not found")
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
      const authorId = req.params.authorId;
      const deleteauthor = await AuthorModel.findByIdAndDelete(authorId, {
        new: true,
      });
      console.log(deleteauthor);
      if (deleteauthor) {
        res.status(204).send(deleteauthor);
      } else {
        next(createHttpError(400, "SyntaxError"));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default authorsRouter;
