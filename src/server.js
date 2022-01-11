/** @format */

import express from "express";
// import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import blogsRouter from "./services/blogs/index.js";
import {
  badRequestHandler,
  notFoundHandler,
  genericErrorHandler,
  syntaxError,
} from "./errorHadlers.js";

const server = express();

const port = process.env.PORT;

server.use(cors());
server.use(express.json());

// server.use(badRequestHandler);
// server.use(notFoundHandler);
// server.use(genericErrorHandler);
// server.use(syntaxError);

server.use("/blogs", blogsRouter);

mongoose.connect(process.env.MONGO_CONNECTION);

mongoose.connection.on("connected", () => {
  console.log("Succesfully connected to mongo");

  server.listen(port, () => {
    console.log("server is runing on port:", port);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
