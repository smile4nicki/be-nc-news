const seedDB = require("./seed");
const mongoose = require("mongoose");
const rawData = require("./devData");
const { DB_URL } = require("../config");

mongoose
  .connect(DB_URL)
  .then(() => {
    return seedDB(rawData);
  })
  .then(() => {
    console.log(`the database has been seeded!`);
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .then(() => {
    console.log(`successfully disconnected from ${DB_URL}...`);
  });
// .catch(console.log);
