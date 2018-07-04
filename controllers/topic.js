const { Topic } = require("../models/index");

getAllTopics = (req, res, next) => {
  Topic.find()
    .then(topic => {
      res.status(200).send({ topic });
    })
    .catch(next);
};

module.exports = { getAllTopics };
