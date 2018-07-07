const { Comment } = require("../models/index");

const getAllComments = (req, res, next) => {
  Comment.find()
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

const getCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  Comment.findById(comment_id)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(err => {
      if (err.name === "CastError") {
        next({ status: 404, message: `Page not found for ${comment_id}` });
      } else {
        next(err);
      }
    });
};

const voteCommentById = (req, res, next) => {
  let { comment_id } = req.params;
  let { vote } = req.query;
  let increment = vote === "up" ? 1 : -1;
  Comment.findByIdAndUpdate(
    comment_id,
    { $inc: { votes: increment } },
    { new: true }
  )
    .then(comment => {
      return res.status(200).send({ comment });
    })
    .catch(err => {
      if (err.name === "CastError") {
        return next({
          status: 400,
          message: `Bad request : ${comment_id} is an invalid id!`
        });
      }
    })
    .catch(next);
};

const deleteCommentById = (req, res, next) => {
  let { comment_id } = req.params;
  Comment.findByIdAndRemove(comment_id)
    .then(comment => {
      res.status(200).send({ comment, message: "Comment Deleted!" });
    })
    .catch(next);
};

module.exports = {
  getAllComments,
  getCommentById,
  voteCommentById,
  deleteCommentById
};
