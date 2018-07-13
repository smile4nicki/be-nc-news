const apiRouter = require("express").Router();
const { topicRouter } = require("./topic");
const { userRouter } = require("./user");
const { commentRouter } = require("./comment");
const { articleRouter } = require("./article");

apiRouter.get("/", (req, res) => {
  res.render("pages/index.html");
});

apiRouter.use("/topics", topicRouter);
apiRouter.use("/articles", articleRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/users", userRouter);

module.exports = apiRouter;
