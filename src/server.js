/** @format */

import express from "express";
// import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";

const server = express();

const port = process.env.PORT;

server.use(cors());
server.use(express.json());

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
