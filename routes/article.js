const articleRouter = require("express").Router();
const {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId
} = require("../controllers/article");

articleRouter.route("/").get(getAllArticles);
articleRouter.route("/:article_id").get(getArticleById);
articleRouter.route("/:article_id/comments").get(getCommentsByArticleId);

module.exports = { articleRouter };
