const { Article, Comment } = require("../models/index");

const getAllArticles = (req, res, next) => {
  Article.find()
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  Article.findById(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

const getCommentsByArticleId = (req, res, next) => {
  let { article_id } = req.params;
  Article.find()
    .populate("belongs_to", "slug")
    .populate("created_by", "username")
    .then(comment => {
      return res.status(200).send({ comment });
    })
    .catch(next);
};

module.exports = { getAllArticles, getArticleById, getCommentsByArticleId };
