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
      topic === null
        ? next({ status: 404, message: `Page not found for${topic_id}` })
        : res.status(200).send({ topic });
    })
    .catch(next);
};

const getArticlesByTopicId = (req, res, next) => {
  let { topic_id } = req.params;
  Article.find({ belongs_to: `${topic_id}` })
    .populate("belongs_to", "slug")
    .populate("created_by", "username")
    .then(article => {
      return res.status(200).send({ article });
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
      return res.status(201).send({
        article,
        message: "Just added this topic"
      });
    })
    .catch(next);
};

/*Get articles by topic
//This method gets articles by topic when the slug is input into the url instead of the topic ID
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
*/

module.exports = {
  getAllTopics,
  getTopicById,
  getArticlesByTopicId,
  addArticlesByTopicId
};
