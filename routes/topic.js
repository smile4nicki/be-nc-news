const topicRouter = require("express").Router();
const {
  getAllTopics,
  getTopicById,
  getArticlesByTopicId,
  addArticlesByTopicId
} = require("../controllers/topic");

topicRouter.route("/").get(getAllTopics);
topicRouter.route("/:topic_id").get(getTopicById);
topicRouter
  .route("/:topic_id/articles")
  .get(getArticlesByTopicId)
  .post(addArticlesByTopicId);

module.exports = { topicRouter };
