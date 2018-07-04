const articleRouter = require("express").Router();
const { getAllArticles, getArticleById } = require("../controllers/article");

articleRouter.route("/").get(getAllArticles);
articleRouter.route("/:article_id").get(getArticleById);

module.exports = { articleRouter };
