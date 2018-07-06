const commentRouter = require("express").Router();
const {
  getAllComments,
  getCommentById,
  voteCommentById,
  deleteCommentById
} = require("../controllers/comment");

commentRouter.route("/").get(getAllComments);
commentRouter
  .route("/:comment_id")
  .get(getCommentById)
  .put(voteCommentById)
  .delete(deleteCommentById);

module.exports = { commentRouter };
