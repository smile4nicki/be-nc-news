const topicRouter = require("express").Router();
const { getAllTopics } = require("../controllers/index");

topicRouter.route("/").get(getAllTopics);
// topicRouter.route("/:topic_id").get;

module.exports = { topicRouter };
