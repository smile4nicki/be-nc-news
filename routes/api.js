const apiRouter = require("express").Router();
const { article, commnet, topicRouter, user } = require("../routes/index");

apiRouter.get("/", (req, res) => {
  res.send("This is the API page");
});

apiRouter.use("/topics", topicRouter);
// apiRouter.use("/articles", articleRouter);
// apiRouter.use("/comments", commentRouter);
// apiRouter.use("users", userRouter);

module.exports = apiRouter;
