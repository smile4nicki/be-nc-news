const { Topic, Article } = require("../models/index");

const getAllTopics = (req, res, next) => {
  Topic.find()
    .then(topic => {
      res.status(200).send({ topic });
    })
    .catch(next);
};

const getTopicById = (req, res, next) => {
  const { topic_id } = req.params;
  Topic.findById(topic_id)
    .then(topic => {
      res.status(200).send({ topic });
    })
    .catch(err => {
      if (err.name === "CastError") {
        next({ status: 404, message: `Page not found for ${topic_id}` });
      } else {
        next(err);
      }
    });
};

const getArticlesByTopicId = (req, res, next) => {
  let { topic_id } = req.params;
  Article.find({ belongs_to: `${topic_id}` })
    .populate("belongs_to", "slug")
    .populate("created_by", "username")
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      if (err.name === "CastError")
        next({
          status: 400,
          message: `Bad request : dumdumdum is an invalid ID!`
        });
    })
    .catch(next);
};

const addArticlesByTopicId = (req, res, next) => {
  let { topic_id } = req.params;
  const newArticle = new Article({
    ...req.body,
    belongs_to: topic_id
  });
  return newArticle
    .save()
    .then(article => {
      res.status(201).send({
        article,
        message: "Just added this topic"
      });
    })
    .catch(err => {
      if (err.name === "ValidationError") {
        next({
          status: 400,
          message: `Bad request : ${err.errors.body.path} is required!`
        });
      } else {
        next(err);
      }
    });
};
module.exports = {
  getAllTopics,
  getTopicById,
  getArticlesByTopicId,
  addArticlesByTopicId
};
