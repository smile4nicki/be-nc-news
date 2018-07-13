const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.Promise = Promise;
const bodyParser = require("body-parser");
const apiRouter = require("./routes/api");
const { DB_URL } = require("./config");

app.use(bodyParser.json());
app.use("/api", apiRouter);

mongoose.connect(DB_URL).then(() => {
  console.log("You are connected to the Mongo Database!");
});

//ERR status 404 page not found
app.use("/*", (req, res, next) => {
  next({ status: 404, message: "Page not found" });
});

//ERR status 400 bad request
app.use((err, req, res, next) => {
  err.status
    ? res.status(err.status).send({ message: err.message })
    : next(err);
});
app.use((err, req, res, next) => {
  if (err.name === "CastError") {
    res.status(400).send(`Bad request : "${err.value}" is an invalid ID!`);
  } else if (err.name === "ValidationError") {
    res.status(400).send(`Bad request : required field is missing!`);
  } else if (err.name === "TypeError") {
    res.status(400).send(`Bad request : ${err.errors.name.path} is required!`);
  } else {
    next(err);
  }
});

//ERR status 500 internal server error
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Internal Server Error" });
});

module.exports = app;
