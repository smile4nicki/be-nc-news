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
    .catch(next);
};

const getArticlesByTopic = (req, res, next) => {
  let { topic } = req.params;
  Article.find()
    .populate("belongs_to", "slug")
    .populate("created_by", "username")
    .then(article => {
      article = article.filter(topics => {
        return (topics.belongs_to.slug = topic);
      });
      return res.status(200).send({ article });
    })
    .catch(next);
};

module.exports = { getAllTopics, getTopicById, getArticlesByTopic };
