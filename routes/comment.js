const commentRouter = require("express").Router();
const { getAllComments, getCommentById } = require("../controllers/comment");

commentRouter.route("/").get(getAllComments);
commentRouter.route("/:comment_id").get(getCommentById);

module.exports = { commentRouter };
