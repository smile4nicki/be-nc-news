const topicRouter = require("express").Router();
const {
  getAllTopics,
  getTopicById,
  getArticlesByTopic
} = require("../controllers/topic");

topicRouter.route("/").get(getAllTopics);
topicRouter.route("/:topic_id").get(getTopicById);
topicRouter.route("/:topic/articles").get(getArticlesByTopic);

module.exports = { topicRouter };
