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

// , getArticlesByTopic
// const getArticlesByTopic = (req, res, next) => {
//   const { topic_id } = req.params;
//   Article.find({ belongs_to: `${topic_id}` })
//     .populate("created_by", "name")
//     .then(article => {
//       return res.status.send(200).send(article);
//     });
// };

module.exports = { getAllTopics, getTopicById };
