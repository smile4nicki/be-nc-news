const apiRouter = require("express").Router();
const { topicRouter } = require("./topic");
const { userRouter } = require("./user");
const { commentRouter } = require("./comment");
const { articleRouter } = require("./article");
const path = require("path");

apiRouter.get("/", (req, res) => {
  res.sendFile(path.join("/public/index.html"));
});

apiRouter.use("/topics", topicRouter);
apiRouter.use("/articles", articleRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/users", userRouter);

module.exports = apiRouter;
