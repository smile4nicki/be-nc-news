const topicRouter = require("express").Router();
const { getAllTopics, getTopicById } = require("../controllers/topic");

topicRouter.route("/").get(getAllTopics);
topicRouter.route("/:topic_id").get(getTopicById);
// topicRouter.route("/:topic_id/articles").get(getArticlesByTopic);

module.exports = { topicRouter };
