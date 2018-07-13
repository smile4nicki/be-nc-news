const { Topic, Article, Comment } = require("../models/index");

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
      topic === null
        ? next({ status: 404, message: `Page not found for ${topic_id}` })
        : res.status(200).send({ topic });
    })
    .catch(next);
};

const getArticlesByTopicId = (req, res, next) => {
  let { topic_id } = req.params;
  Article.find({ belongs_to: `${topic_id}` })
    .populate("belongs_to", "slug")
    .populate("created_by", "username")
    .lean()
    .then(articles => {
      const countComments = articles.map(article => {
        return Comment.count({ belongs_to: article._id });
      });
      return Promise.all([articles, ...countComments]);
    })
    .then(([articles, ...count]) => {
      articles.forEach((article, index) => {
        article.comments = count[index];
      });
      res.status(200).send({ articles });
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
    .catch(next);
};

module.exports = {
  getAllTopics,
  getTopicById,
  getArticlesByTopicId,
  addArticlesByTopicId
};
