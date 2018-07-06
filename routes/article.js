const articleRouter = require("express").Router();
const {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
  addCommentsByArticleId,
  voteArticleById
} = require("../controllers/article");

articleRouter.route("/").get(getAllArticles);
articleRouter
  .route("/:article_id")
  .get(getArticleById)
  .put(voteArticleById);
articleRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(addCommentsByArticleId);

module.exports = { articleRouter };
