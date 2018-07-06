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
      article === null
        ? next({ status: 404, message: `Page not found for ${article_id}` })
        : res.status(200).send({ article });
    })
    .catch(next);
};

const getCommentsByArticleId = (req, res, next) => {
  let { article_id } = req.params;
  Comment.find({ belongs_to: `${article_id}` })
    .then(comment => {
      return res.status(200).send({ comment });
    })
    .catch(next);
};

const addCommentsByArticleId = (req, res, next) => {
  let { article_id } = req.params;
  const newComment = new Comment({ ...req.body, belongs_to: article_id });
  console.log(newComment);
  return newComment
    .save()
    .then(comment => {
      return res
        .status(201)
        .send({ comment, message: `Just added this topic` });
    })
    .catch(next);
};

const voteArticleById = (req, res, next) => {
  let { article_id } = req.params;
  let { vote } = req.query;
  let increment = vote === "up" ? 1 : -1;
  Article.findByIdAndUpdate(
    article_id,
    { $inc: { votes: increment } },
    { new: true }
  )
    .then(article => {
      return res.status(200).send({ article });
    })
    .catch(next);
};

module.exports = {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
  addCommentsByArticleId,
  voteArticleById
};
