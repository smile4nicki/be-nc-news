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
    .catch(next);
};

module.exports = { getAllComments, getCommentById };
