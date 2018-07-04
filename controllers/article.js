const { Article } = require("../models/index");

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

module.exports = { getAllArticles, getArticleById };
