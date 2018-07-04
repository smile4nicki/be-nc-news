const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.Promise = Promise;
const bodyParser = require("body-parser");
const apiRouter = require("./routes/api");

app.use(bodyParser.json());
app.use("/api", apiRouter);

mongoose.connect(DB_URL).then(() => {
  console.log("You are connected to the Mongo Database!");
});
// app.use(bodyParser.urlencoded({ extended: false }));

// app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

// app.get("/", (req, res) => {
//   res.render("pages/index");
// });

app.use("/*", (req, res, next) => {
  next({ status: 404, message: "Page not found" });
});

app.use((err, req, res, next) => {
  if (err.status) res.status(err.status).send({ message: err.message });
  else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Internal Server Error" });
});

module.exports = app;
