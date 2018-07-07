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
    .catch(err => {
      if (err.name === "CastError") {
        next({ status: 404, message: `Page not found for ${article_id}` });
      } else {
        next(err);
      }
    });
};

const getCommentsByArticleId = (req, res, next) => {
  let { article_id } = req.params;
  Comment.find({ belongs_to: `${article_id}` })
    .then(comment => {
      return res.status(200).send({ comment });
    })
    .catch(err => {
      console.log(err.errors.body);
      next({
        status: 400,
        message: `Bad request : dumdumdum is an invalid id!`
      }).catch(next);
    });
};

const addCommentsByArticleId = (req, res, next) => {
  let { article_id } = req.params;
  const newComment = new Comment({ ...req.body, belongs_to: article_id });
  return newComment
    .save()
    .then(comment => {
      return res
        .status(201)
        .send({ comment, message: `Just added this comment` });
    })
    .catch(err => {
      if (err.name === "ValidationError") {
        next({
          status: 400,
          message: `Bad request : ${err.errors.body.path} is required!`
        });
      } else {
        next(err);
      }
    });
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
      res.status(200).send({ article });
    })
    .catch(err => {
      if (err.name === "CatchError") {
        next({
          status: 400,
          message: `Bad request : ${article_id} is an invalid id!`
        });
      }
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
